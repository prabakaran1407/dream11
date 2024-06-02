import Team from '../Models/Team.js';
import Match from '../Models/Match.js';
import { calculatePlayerPoints, generateMatchResult } from '../utils/index.js';
import Result from '../Models/ProcessResult.js';

export const processResult = async (req, res) => {
  try {
    const matchData = await Match.find();
    const teams = await Team.find({}).lean();

    let playerPoints = calculatePlayerPoints(matchData);

    const teamResults = teams.map((team) => {
      const playerDetails = team.players.map((player) => ({
        name: player,
        points: playerPoints[player] || 0,
      }));

      const totalPoints = team.players.reduce((acc, player) => {
        const playerPoint = playerPoints[player] || 0;
        return acc + playerPoint;
      }, 0);

      const captainPoints = playerPoints[team.captain] * 2 || 0;
      const viceCaptainPoints = playerPoints[team.viceCaptain] * 1.5 || 0;

      let captainPoint = playerPoints[team.captain];
      let viceCaptainPoint =
        playerPoints[team.viceCaptain] * 1.5 - playerPoints[team.viceCaptain];

      const teamTotalPoints = totalPoints + captainPoint + viceCaptainPoint;
      return {
        ...team,
        players: playerDetails,
        captain: {
          name: team.captain,
          points: captainPoints,
        },
        viceCaptain: {
          name: team.viceCaptain,
          points: viceCaptainPoints,
        },
        totalPoints: teamTotalPoints,
      };
    });

    const result = await Result.insertMany(teamResults);

    res.status(200).send({
      message: 'Match results processed successfully',
      teamResults,
      playerPoints,
    });
  } catch (error) {
    console.log('error', error);
    res.status(500).send(error);
  }
};

export const teamResults = async (req, res) => {
  try {
    const result = await Result.aggregate([
      {
        $sort: {
          totalPoints: -1,
        },
      },
    ]);
    const matchResult = await Match.aggregate([
      {
        $group: {
          _id: '$battingTeam',
          totalRuns: {
            $sum: '$totalRun',
          },
          totalWickets: {
            $sum: '$isWicketDelivery',
          },
          innings: {
            $first: '$innings',
          },
        },
      },
      {
        $sort: {
          totalRuns: -1,
        },
      },
    ]);

    let matchResultBy = generateMatchResult(matchResult);

    res.status(200).send({
      message: 'Team results processed successfully',
      winningTeamName: result[0].teamName,
      winningTeamPonits: result[0].totalPoints,
      winningTeamData: [{ ...result[0] }],
      matchSummary: matchResult,
      matchWin: `${matchResultBy} against ${matchResult[1]._id}`,
    });
  } catch (error) {
    console.log('error', error);
    res.status(500).send(error);
  }
};
