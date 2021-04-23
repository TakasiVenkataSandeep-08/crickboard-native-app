import React from "react";
import Loader from "../../../Components/Spinner";
import { socket } from "../../../socket";

import {
  LIVE_UPDATE,
  JOIN_MATCH,
  LEAVE_MATCH,
  NEW_BOWLER,
} from "../../../Constants/socketEvents";
import BowlerModal from "../../../Components/PlayersModel";
import AxiosContext from "../../../context/axios";
import { apiCalls } from "crickboardapi";
export default function TransitionsModal({
  isOpen,
  action,
  data,
  matchId,
  liveData,
  setLive,
}) {
  const axios = React.useContext(AxiosContext);

  const { getTeams, changeStrick, getPlayer } = apiCalls(axios);
  const [teamsData, setTeamsData] = React.useState();
  const [checked, setChecked] = React.useState([0]);
  React.useEffect(() => {
    socket.emit(JOIN_MATCH, matchId);
    let mounted = true;
    const getTeamsData = async () => {
      const TeamData = await getTeams(matchId);
      if (!mounted) {
        return;
      }
      setTeamsData(TeamData.data);
    };
    getTeamsData();
    return () => {
      mounted = false;
      socket.emit(LEAVE_MATCH, matchId);
    };
  }, [matchId]);

  const handleClose = () => {
    action(false);
  };

  const handleToggle = (value) => () => {
    setChecked(value);
  };

  const handleSubmit = async (e) => {
    if (checked.length !== 0) {
      await changeStrick(
        {
          bowlerId: checked[0],
        },
        matchId
      );
      const res = await getPlayer(checked[0], matchId);
      socket.emit(NEW_BOWLER, {
        room: matchId,
        bowlerData: res.data,
      });
      setLive((prevData) => {
        const newData = { ...prevData };
        newData.bowling[0] = { ...newData.bowling[0], ...res.data };
        newData.bowlerId = checked[0];
        setChecked([]);
        return newData;
      });
      socket.emit(LIVE_UPDATE, {
        room: matchId,
        newData: { ...liveData },
      });
      handleClose();
    }
  };
  if (teamsData) {
    return (
      <BowlerModal
        type="Bowler"
        teamsData={teamsData}
        isOpen={isOpen}
        data={data}
        handleToggle={handleToggle}
        liveData={liveData}
        checked={checked}
        setChecked={setChecked}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
      />
    );
  } else {
    return <Loader />;
  }
}
