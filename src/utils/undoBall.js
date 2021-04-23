export const undoBall = async (prevScore, liveData, matchId) => {
  if (prevScore.length >= 2) {
    const { ballData, ...restData } = prevScore[prevScore.length - 2];
    if (prevScore[prevScore.length - 1].ballData.ball_summary === "W") {
      restData.batsmanData.out_summary = "Not Out";
      restData.matchData.strickerId = restData.batsmanId;
      restData.undoBatsmanId = liveData.strickerId;
      restData.isWicket = true;
    }
    restData.matchData.bowlerId = restData.bowlerId;
    restData.matchId = ballData.matchId;
    return restData;
  } else {
    let undoData = {};
    undoData.batsmanId = liveData.strickerId;
    undoData.bowlerId = liveData.bowlerId;
    undoData.batsmanData = { balls_faced: 0, runs: 0, fours: 0, sixs: 0 };
    undoData.bowlerData = {
      overs_bowled: 0,
      runs_given: 0,
      wickets: 0,
      extras: 0,
    };
    undoData.matchId = matchId;
    undoData.nonStrickerId = liveData.nonStrickerId;
    undoData.matchData = {
      score: 0,
      overs: 0,
      wickets: 0,
      bowlerId: undoData.bowlerId,
      batsmanId: undoData.batsmanId,
      nonStrickerId: liveData.nonStrickerId,
    };
    return undoData;
  }
};
