import { updatedScore } from "./getUpdatedScoreData";
export const updatedLiveData = () => {
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
  let commentary = commentryEl.current.value;
  liveData.batting.map((st) => {
    if (st.playerId === liveData.strickerId) {
      stricker = st;
    }
  });
  updateData.batsmanId = liveData.strickerId;
  updateData.bowlerId = liveData.bowlerId;
  updateData.matchData = {
    score: liveData.score + batsmanRuns + extraRuns,
    overs: ballCount ? convertBall(liveData.overs) : liveData.overs,
    wickets: isWicket ? liveData.wickets + 1 : liveData.wickets,
  };
  updateData.batsmanData = {
    balls_faced: parseInt(
      ballCount ? stricker.balls_faced + 1 : stricker.balls_faced
    ),
    runs: parseInt(stricker.runs + batsmanRuns),
    fours: parseInt(isFour ? stricker.fours + 1 : stricker.fours),
    sixs: parseInt(isSix ? stricker.sixs + 1 : stricker.sixs),
    out_summary: outSummary,
  };
  updateData.bowlerData = {
    overs_bowled: parseFloat(
      ballCount
        ? convertBall(liveData.bowling[0].overs_bowled)
        : liveData.bowling[0].overs_bowled
    ),

    runs_given: parseInt(
      liveData.bowling[0].runs_given + batsmanRuns + extraRuns
    ),

    wickets: parseInt(
      wickets !== "Run Out"
        ? isWicket
          ? liveData.bowling[0].wickets + 1
          : liveData.bowling[0].wickets
        : liveData.bowling[0].wickets
    ),
    extras: parseInt(
      extraRuns !== 0
        ? liveData.bowling[0].extras + extraRuns
        : liveData.bowling[0].extras
    ),
  };

  updateData.ballData = {
    ball_number: parseFloat(
      ballCount
        ? ballsD.length !== 0
          ? convertBall(ballsD[0].ball_number)
          : parseFloat(0.1)
        : ballsD[0].ball_number
    ),
    ball_summary: ballSummary,

    innings: liveData.currentInnings,

    commentary: `${liveData.bowling[0].player_name} to ${
      stricker.player_name
    } for ${batsmanRuns + extraRuns} runs ${
      commentary !== "" ? `, ${commentary}.` : "."
    }`,

    score_summary: `${updateData.matchData.score}/${liveData.wickets}`,
    matchId: parseInt(matchId),
  };
};
