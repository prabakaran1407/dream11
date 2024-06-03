import Team from '../Models/Team.js';
import Player from '../Models/Player.js';
import { validatePlayers } from '../utils/index.js';

export const createTeam = async (req, res) => {
  try {
    const { players, captain, viceCaptain, teamName } = req.body;

    // PLAYER LENGTH VALIDATION
    if (players && players?.length !== 11) {
      return res.status(400).send({ error: 'Your team must have 11 Players' });
    }

    let teamData = await Team.aggregate([
      {
        $match: {
          teamName: teamName,
        },
      },
    ]);

    //TEAM VALIDATION
    if (teamData.length > 0) {
      throw new Error(`Team Name Already Exists`);
    }

    //PLAYER VALIDATION

    let playersData = await Player.aggregate([
      {
        $match: {
          Team: {
            $in: ['Chennai Super Kings', 'Rajasthan Royals'],
          },
        },
      },
    ]);

    const fullTeamPlayers = playersData.map((player) => player.Player);

    //FULL TEAM VALIDATION WITH PLAYERS COUNT
    await validatePlayers(playersData, players);

    //CAPTAIN VALIDATION

    const isValidCaptain = players.includes(captain);

    if (!isValidCaptain) {
      throw new Error(`Captain Not Found`);
    }

    //VICE CAPTAIN VALIDATION

    const isValidViceCaptain = players.includes(viceCaptain);

    if (!isValidViceCaptain) {
      throw new Error(`Vice Captain Not Found`);
    }

    //CAPTAIN VICE CAPTAIN SAME

    if (captain === viceCaptain) {
      throw new Error(`Captain and Vice Captain Should be Different`);
    }

    const team = await Team.create(req.body);
    await team.save();
    res
      .status(201)
      .send({ data: team, message: 'Your team Has been Registered 👍🏻' });
  } catch (error) {
    console.log('***********error*********', error);
    res.status(400).send({ error: error.message });
  }
};
