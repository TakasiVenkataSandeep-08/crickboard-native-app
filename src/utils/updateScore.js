export const UpdateScore = async (
  updateLiveScore,
  setLiveData,
  setBalls,
  OpenBowlerModal,
  setWickets,
  setExtras,
  setRuns,
  changeBatsman,
  setLoading,
  runs,
  setSnackBar,
  wickets,
  matchInfo,
  OpenBatsmanModal,
  OpenRunOutModal,
  endInnings,
  extras,
  matchId,
  socket,
  BALL_UPDATED,
  updatePrevScore,
  commentry,
  updatedLiveData,
  liveData,
  ballsData,
  setToast,
  setIsRunoutHandled
) => {
  setLoading(true);
  
  let commentary = commentry;
  const { updatedData, isWicket, batsmanRuns, extraRuns } = updatedLiveData(
    liveData,
    commentary,
    ballsData,
    runs,
    extras,
    wickets,
    matchId
  );
  await updateLiveScore(updatedData);
  socket.emit(BALL_UPDATED, {
    room: matchId,
    ...updatedData,
  });
  updatePrevScore(updatedData);
  setLiveData((prevData) => {
    const data = { ...prevData };
    const strickerIndex = data.batting.findIndex(
      (player) => player.playerId === data.strickerId
    );
    data.batting[strickerIndex] = {
      ...data.batting[strickerIndex],
      ...updatedData.batsmanData,
    };
    data.bowling[0] = { ...data.bowling[0], ...updatedData.bowlerData };
    data.score = liveData.score + batsmanRuns + extraRuns;
    data.overs = parseFloat(updatedData.matchData.overs);
    data.wickets = updatedData.matchData.wickets;
    return data;
  });

  setBalls((prevBalls) => {
    const updatedBalls = [...prevBalls];
    updatedBalls.unshift({
      ball_number: updatedData.ballData.ball_number,
      ball_summary: updatedData.ballData.ball_summary,
    });
    return updatedBalls;
  });
  setLoading(false);
  if (
    updatedData.matchData.wickets === 10 ||
    parseFloat(updatedData.matchData.overs) === matchInfo.max_overs
  ) {
    endInnings(updatedData.matchData.score);
    return;
  }
  if (
    isWicket &&
    parseInt(updatedData.matchData.wickets) !== 10 &&
    parseFloat(updatedData.matchData.overs) !== matchInfo.max_overs
  ) {
    OpenBatsmanModal();
  }
  if (
    wickets !== "Run Out" &&
    updatedData.bowlerData.overs_bowled % 1 === 0 &&
    parseInt(updatedData.matchData.wickets) !== 10 &&
    parseFloat(updatedData.matchData.overs) !== matchInfo.max_overs
  ) {
    OpenBowlerModal();
  }
  if (runs % 2 !== 0 && updatedData.matchData.overs % 1 !== 0) {
    changeBatsman();
  }
  if (
    liveData.currentInnings === 2 &&
    liveData.inningOneScore < updatedData.matchData.score
  ) {
    endInnings(updatedData.matchData.score);
    return;
  }
  if (
    updatedData.matchData.wickets === 10 ||
    parseFloat(updatedData.matchData.overs) === matchInfo.max_overs
  ) {
    endInnings(updatedData.matchData.score);
    return;
  }
  setToast({
    title: "Score Updated",
    duration: 3000,
    position: 'center'
  });

  setRuns(0);
  setWickets("Not Out");
  setExtras(0);
  setIsRunoutHandled(false);
};
