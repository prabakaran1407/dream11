import {
  BATTING_POINTS,
  BOWLING_POINTS,
  FIELDING_PONITS,
} from '../../contants.js';
function validatePlayers(allPlayers, selectedPlayers) {
  return new Promise((resolve, reject) => {
    const fullTeamPlayers = allPlayers.map((player) => player.Player);

    for (const player of selectedPlayers) {
      if (fullTeamPlayers.includes(player) === false) {
        return reject(
          new Error(
            `Player ${player} from selectedPlayers is not found in Players Data`
          )
        );
      }
    }
    const filteredPlayers = allPlayers.filter((player) =>
      selectedPlayers.includes(player.Player)
    );

    if (filteredPlayers.length > 0) {
      const checkTeamPlayerCount = filteredPlayers.filter(
        (team) => filteredPlayers[0].Team === team.Team
      );

      if (
        checkTeamPlayerCount.length === 0 ||
        checkTeamPlayerCount.length === 11
      ) {
        return reject(
          new Error(`Combination of team should be Maximum 10 minimum 1`)
        );
      }
    }

    resolve('All players in selectedPlayers are included in Player Data.');
  });
}

function calculatePlayerPoints(matchData) {
  const playerPoints = {};

  const playerRun = {};

  matchData.forEach((ball) => {
    const {
      batter,
      bowler,
      batsmanRun,
      isWicketDelivery,
      kind,
      fieldersInvolved,
    } = ball;

    // Initialize player points if not already done
    if (!playerPoints[batter]) playerPoints[batter] = 0;
    if (!playerPoints[bowler]) playerPoints[bowler] = 0;
    if (fieldersInvolved && fieldersInvolved !== 'NA') {
      fieldersInvolved.split(',').forEach((fielder) => {
        if (!playerPoints[fielder]) playerPoints[fielder] = 0;
      });
    }

    if (!playerRun[batter]) playerRun[batter] = 0;
    if (!playerRun[bowler]) playerRun[bowler] = 0;
    if (fieldersInvolved && fieldersInvolved !== 'NA') {
      fieldersInvolved.split(',').forEach((fielder) => {
        if (!playerRun[fielder]) playerRun[fielder] = 0;
      });
    }

    // Batting points
    playerPoints[batter] += batsmanRun * BATTING_POINTS.RUN;

    playerRun[batter] += batsmanRun;

    if (batsmanRun === 4) playerPoints[batter] += BATTING_POINTS.BOUNDARY_BONUS;
    if (batsmanRun === 6) playerPoints[batter] += BATTING_POINTS.SIX_BONUS;

    // Check for wickets
    if (isWicketDelivery) {
      if (kind === 'bowled' || kind === 'lbw') {
        playerPoints[bowler] +=
          BOWLING_POINTS.WICKET + BOWLING_POINTS.LBW_BOWLED_BONUS;
      } else if (kind === 'caught and bowled') {
        playerPoints[bowler] += FIELDING_PONITS.CATCH + BOWLING_POINTS.WICKET;
      } else {
        playerPoints[bowler] += BOWLING_POINTS.WICKET;
      }

      if (kind === 'caught' || kind === 'bowled') {
        const catcher = fieldersInvolved;
        playerPoints[catcher] += FIELDING_PONITS.CATCH;
      }

      if (kind === 'stumping') {
        const stumper = fieldersInvolved;
        playerPoints[stumper] += FIELDING_PONITS.STUMPING;
      }
    }
  });

  console.log('playerRun', playerRun);

  delete playerPoints['NA'];

  for (const [player, points] of Object.entries(playerRun)) {
    if (points >= 30 && points <= 50) {
      playerPoints[player] += BATTING_POINTS['30_RUN_BONUS'];
    }
    if (points >= 50 && points <= 100) {
      playerPoints[player] += BATTING_POINTS['HALF_CENTURY_BONUS'];
    }
    if (points >= 100) {
      playerPoints[player] += BATTING_POINTS['CENTURY_BONUS'];
    }
  }

  return playerPoints;
}

function generateMatchResult(matchSummary) {
  const team1 = matchSummary[0];
  const team2 = matchSummary[1];

  const firstInnings = team1.innings === 1 ? team1 : team2;
  const secondInnings = team1.innings === 2 ? team1 : team2;

  let result;
  if (secondInnings.totalRuns > firstInnings.totalRuns) {
    const wicketsRemaining = 10 - secondInnings.totalWickets;
    result = `${secondInnings._id} won the match by ${wicketsRemaining} wickets`;
  } else {
    const runsDifference = firstInnings.totalRuns - secondInnings.totalRuns;
    result = `${firstInnings._id} won the match by ${runsDifference} runs`;
  }

  return result;
}

export { validatePlayers, calculatePlayerPoints, generateMatchResult };
