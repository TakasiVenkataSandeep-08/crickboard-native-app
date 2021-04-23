import React, { useEffect } from "react";
import AdminDashboardComponent from "../../Components/AdminDashboardComponent";
import { useCrickStore } from "../../store";
import { endCurrentInnings } from "../../utils/endInnings";
import { UpdateScore } from "../../utils/updateScore";
import { undoBall } from "../../utils/undoBall";
import { updatedLiveData } from "../../utils/getUpdatedLiveData";
import { socket } from "../../socket";
import SpinnerComponent from "../../Components/Spinner";
import { Text, useToast } from "native-base";
import {
  JOIN_MATCH,
  LEAVE_MATCH,
  LIVE_MATCHES_ROOM,
  BALL_UPDATED,
  STRICK_CHANGED,
} from "../../Constants/socketEvents";
import AxiosContext from "../../context/axios";
import { apiCalls } from "crickboardapi";
function index({
  navigation,
  id,
  loggedinUser,
  setLoggedinUser,
  setLoginAuthenticated,
}) {
  const axios = React.useContext(AxiosContext);
  const {
    getMatchInfo,
    getLiveData,
    getTenBalls,
    updateMatchInfo,
    changeStrick,
    updateLiveScore,
    undoLiveScore,
  } = apiCalls(axios);
  const setToast = useToast();
  const [timeout, setTimeout] = React.useState(false);
  const [matchId, setMatchId] = React.useState(id);
  const [matchInfo, setMatchInfo] = React.useState({});
  const [liveData, setLiveData] = React.useState({});
  const [ballsData, setBalls] = React.useState();
  const [hasErr, setErr] = React.useState(false);
  const [batsmanModal, setBatsmanModal] = React.useState(false);
  const [bowlerModal, setBowlerModal] = React.useState(false);
  const [openingModal, setOpeningModal] = React.useState(false);
  const [runOutModal, setRunOutModal] = React.useState(false);
  const commentryRef = React.useRef("");
  const [loading, setLoading] = React.useState(false);
  const { updatePrevScore, prevScore, deleteScore } = useCrickStore();
  const [isRunoutHandled, setIsRunoutHandled] = React.useState(false);
  const [snackBar, setSnackBar] = React.useState({
    value: false,
    message: "",
    type: "",
  });
  const Rns = [0, 1, 2, 3, 4, 5, 6];
  const xtra = [
    { type: "Ball" },
    { type: "Wide" },
    { type: "No Ball" },
    { type: "Bye" },
    { type: "Leg Bye" },
  ];
  const wkt = ["Not Out", "Catch Out", "Run Out", "Bowled", "Lbw"];

  const [extras, setExtras] = React.useState(0);
  const [extraText, setExtraText] = React.useState("Ball");
  const handleExtras = (extra) => {
    setExtraText(xtra[extra].type);
    setExtras(parseInt(extra));
  };

  const [wickets, setWickets] = React.useState("Not Out");
  const handleWickets = (wicket) => {
    setWickets(wicket);
  };

  const [runs, setRuns] = React.useState(0);
  const handleRuns = (run) => {
    setRuns(parseInt(run));
  };
  const OpenBatsmanModal = () => {
    setBatsmanModal(true);
  };
  const OpenBowlerModal = () => {
    setBowlerModal(true);
  };

  const OpenOpeningModal = () => {
    setOpeningModal(true);
  };
  const OpenRunOutModal = () => {
    setRunOutModal(true);
    setIsRunoutHandled(true);
  };
  useEffect(() => {
    let mounted = true;
    socket.emit(JOIN_MATCH, matchId);
    socket.emit(JOIN_MATCH, LIVE_MATCHES_ROOM);
    if (new Date(loggedinUser.expiredDate) <= new Date()) {
      setLoggedinUser({});
      setLoginAuthenticated(false);
    }

    const MatchInfo = async () => {
      try {
        const info = await getMatchInfo(matchId);
        if (!mounted) {
          return;
        } else if (info.status === 200) {
          setMatchInfo(info.data.data);
        } else {
          setErr(true);
        }
      } catch (error) {
        setErr(true);
      }
    };
    const LiveData = async () => {
      const liveData = await getLiveData(matchId);
      if (!mounted) {
        return;
      } else {
        setLiveData(liveData.data);
      }
    };

    MatchInfo();
    LiveData();
    return () => {
      mounted = false;
    };
  }, [loggedinUser.expiredDate, matchId]);

  useEffect(() => {
    let mounted = true;
    const getBalls = async () => {
      if (liveData) {
        const Balls = await getTenBalls(matchId, liveData.currentInnings);
        if (!mounted) {
          return;
        }
        setBalls(Balls.data);
      } else return;
    };
    getBalls();
    return () => {
      mounted = false;
      socket.emit(LEAVE_MATCH, matchId);
    };
  }, [matchId, liveData]);

  const endInnings = async (score) => {
    if (liveData.currentInnings === 1) {
      const updatedData = await endCurrentInnings(liveData, matchId);
      setLiveData(updatedData);
      OpenOpeningModal();
    } else {
      if (liveData.inningOneScore > score) {
        await updateMatch(
          { result: `${liveData.bowlingTeamName} Won`, isCompleted: 1 },
          matchId
        );
        alert(`${liveData.bowlingTeamName} Won`);
      } else if (liveData.inningOneScore === liveData.score) {
        await updateMatch({ result: "Tie Match", isCompleted: 1 }, matchId);
        alert("Tie Match");
      } else {
        await updateMatch(
          { result: `${liveData.battingTeamName} Won`, isCompleted: 1 },
          matchId
        );
        alert(`${liveData.battingTeamName} Won`);
      }
    }
    if (liveData.currentInnings === 1) {
      const updatedData = await endCurrentInnings(
        liveData,
        matchId,
        changeStrick
      );
      setLiveData(updatedData);
      OpenOpeningModal();
    } else {
      if (liveData.inningOneScore > score) {
        await updateMatch(
          { result: `${liveData.bowlingTeamName} Won`, isCompleted: 1 },
          matchId
        );
        alert(`${liveData.bowlingTeamName} Won`);
      } else if (liveData.inningOneScore === liveData.score) {
        await updateMatch({ result: "Tie Match", isCompleted: 1 }, matchId);
        alert("Tie Match");
      } else {
        await updateMatch(
          { result: `${liveData.battingTeamName} Won`, isCompleted: 1 },
          matchId
        );
        alert(`${liveData.battingTeamName} Won`);
      }
    }
  };

  if (wickets === "Run Out" && !isRunoutHandled) {
    OpenRunOutModal();
  }

  const scoreUpdate = async (data) => {
    await UpdateScore(
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
      data.commentry,
      updatedLiveData,
      liveData,
      ballsData,
      setToast,
      setIsRunoutHandled
    );
  };
  const changeBatsman = async () => {
    const changeStrickData = {
      strickerId: liveData.nonStrickerId,
      nonStrickerId: liveData.strickerId,
    };
    await changeStrick(changeStrickData, matchId);
    socket.emit(STRICK_CHANGED, {
      room: matchId,
      ...changeStrickData,
    });
    setLiveData((prevData) => {
      const newData = { ...prevData, ...changeStrickData };
      return newData;
    });
  };

  const updateMatch = async (matchData, matchId) => {
    const response = await updateMatchInfo(matchData, matchId);
    return response;
  };

  const undo = async () => {
    const undoData = await undoBall(prevScore, liveData, matchId);
    await undoLiveScore(undoData, ballsData[0].id);
    deleteScore();
    navigation.push("AdminDashboard", { id: matchId });
  };

  if (!hasErr) {
    if (matchInfo && liveData) {
      return (
        <AdminDashboardComponent
          matchInfo={matchInfo}
          liveData={liveData}
          ballsData={ballsData}
          matchId={matchId}
          setLiveData={setLiveData}
          OpenBatsmanModal={OpenBatsmanModal}
          OpenBowlerModal={OpenBowlerModal}
          batsmanModal={batsmanModal}
          bowlerModal={bowlerModal}
          openingModal={openingModal}
          runOutModal={runOutModal}
          endInnings={endInnings}
          setOpeningModal={setOpeningModal}
          setBatsmanModal={setBatsmanModal}
          setBowlerModal={setBowlerModal}
          setRunOutModal={setRunOutModal}
          changeBatsman={changeBatsman}
          scoreUpdate={scoreUpdate}
          loading={loading}
          wkt={wkt}
          handleWickets={handleWickets}
          wickets={wickets}
          xtra={xtra}
          handleExtras={handleExtras}
          extras={extras}
          Rns={Rns}
          handleRuns={handleRuns}
          runs={runs}
          commentryRef={commentryRef}
          snackBar={snackBar}
          setSnackBar={setSnackBar}
          prevScore={prevScore}
          deleteScore={deleteScore}
          navigation={navigation}
          extraText={extraText}
          undo={undo}
          setIsRunoutHandled={setIsRunoutHandled}
          setWickets={setWickets}
        />
      );
    } else {
      return <SpinnerComponent />;
    }
  } else {
    return <Text>You are not authorized to Access this page</Text>;
  }
}

export default index;
