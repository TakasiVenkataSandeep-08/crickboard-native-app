import { updatedScore } from "./getUpdatedScoreData";
import { convertBall } from "./convertBalls";
export const updatedLiveData = (
  liveData,
  commentary,
  ballsData,
  runs,
  extras,
  wickets,
  matchId
) => {
  const updatedData = {};
  const {
    ballCount,
    ballSummary,
    batsmanRuns,
    extraRuns,
    isWicket,
    isFour,
    isSix,
    outSummary,
  } = updatedScore(runs, extras, wickets);
  let stricker = {};

  liveData.batting.map((st) => {
    if (st.playerId === liveData.strickerId) {
      stricker = st;
    }
  });
  updatedData.batsmanId = liveData.strickerId;
  updatedData.bowlerId = liveData.bowlerId;
  updatedData.matchData = {
    score: liveData.score + batsmanRuns + extraRuns,
    overs: ballCount ? convertBall(liveData.overs) : liveData.overs,
    wickets: isWicket ? liveData.wickets + 1 : liveData.wickets,
  };
  updatedData.batsmanData = {
    balls_faced: parseInt(
      ballCount ? stricker.balls_faced + 1 : stricker.balls_faced
    ),
    runs: parseInt(stricker.runs + batsmanRuns),
    fours: parseInt(isFour ? stricker.fours + 1 : stricker.fours),
    sixs: parseInt(isSix ? stricker.sixs + 1 : stricker.sixs),
    out_summary: outSummary,
  };
  updatedData.bowlerData = {
    overs_bowled: parseFloat(
      ballCount
        ? convertBall(liveData.bowling[0].overs_bowled)
        : liveData.bowling[0].overs_bowled
    ),
    runs_given: parseInt(
      liveData.bowling[0].runs_given + batsmanRuns + extraRuns
    ),
    wickets: parseInt(
      // wickets !== "Run Out"?
      isWicket ? liveData.bowling[0].wickets + 1 : liveData.bowling[0].wickets
      // : liveData.bowling[0].wickets
    ),
    extras: parseInt(
      extraRuns !== 0
        ? liveData.bowling[0].extras + extraRuns
        : liveData.bowling[0].extras
    ),
  };
  updatedData.ballData = {
    ball_number: parseFloat(
      ballCount
        ? ballsData.length !== 0
          ? convertBall(ballsData[0].ball_number)
          : parseFloat(0.1)
        : ballsData[0].ball_number
    ),
    ball_summary: ballSummary,
    innings: liveData.currentInnings,
    commentary: `${liveData.bowling[0].player_name} to ${
      stricker.player_name
    } for ${batsmanRuns + extraRuns} runs ${
      commentary !== "" ? `, ${commentary}.` : "."
    }`,
    score_summary: `${updatedData.matchData.score}/${updatedData.matchData.wickets},${stricker.player_name}`,
    matchId: parseInt(matchId),
  };
  return {
    updatedData,
    isWicket,
    batsmanRuns,
    extraRuns,
    oldData: liveData,
  };
};
