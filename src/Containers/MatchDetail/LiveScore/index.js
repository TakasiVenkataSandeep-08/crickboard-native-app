import React from "react";
import LiveScoreComponent from "../../../Components/LiveScore";
import { socket } from "../../../socket";
import SpinnerComponent from "../../../Components/Spinner";
import AxiosContext from "../../../context/axios";
import { apiCalls } from "crickboardapi";
import {
  BALL_UPDATED,
  JOIN_MATCH,
  LEAVE_MATCH,
  LIVE_UPDATE,
  NEW_OPENING_PLAYERS,
  STRICK_CHANGED,
} from "../../../Constants/socketEvents";
function LiveScorecard({ matchId }) {
  const axios = React.useContext(AxiosContext);

  const { getLiveData } = apiCalls(axios);
  const [data, setData] = React.useState();
  React.useEffect(() => {
    socket.emit(JOIN_MATCH, matchId);
    let mounted = true;
    const getData = async () => {
      const LiveData = await getLiveData(matchId);
      if (!mounted) {
        return;
      }
      setData(LiveData.data);
    };
    getData();
    return () => {
      mounted = false;
      socket.emit(LEAVE_MATCH, matchId);
    };
  }, [matchId]);
  React.useEffect(() => {
    socket.on(STRICK_CHANGED, () => {
      setData((prevData) => {
        const newState = { ...prevData };
        newState.strickerId = newState.nonStrickerId;
        newState.nonStrickerId = newState.strickerId;
        return newState;
      });
    });
    socket.on(BALL_UPDATED, (newData) => {
      const { batsmanData, batsmanId, bowlerData, bowlerId } = newData;
      if (bowlerData) {
        bowlerData.playerId = bowlerId;
      }
      if (batsmanData) {
        batsmanData.playerId = batsmanId;
      }
      setData((prevData) => {
        const newStateData = { ...prevData };
        const updateBatsmanIndex = newStateData.batting.findIndex(
          (batsman) => batsman.playerId === batsmanId
        );
        newStateData.batting[updateBatsmanIndex] = {
          ...newStateData.batting[updateBatsmanIndex],
          ...batsmanData,
        };
        newStateData.bowling[0] = { ...newStateData.bowling[0], ...bowlerData };
        return newStateData;
      });
    });
    socket.on(LIVE_UPDATE, (newData) => setData(newData));
    socket.on(NEW_OPENING_PLAYERS, (newData) => {
      const {
        bowlerData,
        strickerData,
        nonStrickerData,
        bowlerId,
        strickerId,
        nonStrickerId,
      } = newData;
      bowlerData.playerId = bowlerId;
      strickerData.playerId = strickerId;
      nonStrickerData.playerId = nonStrickerId;
      setData((prevData) => {
        return updateOpeningData(
          prevData,
          bowlerData,
          strickerData,
          nonStrickerData,
          bowlerId,
          strickerId,
          nonStrickerId
        );
      });
    });
  }, []);
  if (data) {
    if (data.batting) {
      return (
        <>
          <LiveScoreComponent matchId={matchId} data={data} />
        </>
      );
    } else {
      return <SpinnerComponent />;
    }
  } else {
    return <SpinnerComponent />;
  }
}

export default LiveScorecard;
