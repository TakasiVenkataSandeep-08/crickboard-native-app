import React from "react";
import Loader from "../../../Components/Spinner";
import { socket } from "../../../socket";

import { JOIN_MATCH, LEAVE_MATCH } from "../../../Constants/socketEvents";
import RunOutModal from "../../../Components/Runoutmodel";
import AxiosContext from "../../../context/axios";
import { apiCalls } from "crickboardapi";
export default function TransitionsModal({
  isOpen,
  action,
  data,
  matchId,
  liveData,
  setLive,
  setIsRunoutHandled,
  setWickets,
}) {
  const axios = React.useContext(AxiosContext);

  const { getTeams, changeStrick } = apiCalls(axios);
  const [teamsData, setTeamsData] = React.useState();
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
    setWickets("Not Out");
    setIsRunoutHandled(false);
  };
  const [checked, setChecked] = React.useState([]);

  const handleToggle = (value) => () => {
    setChecked(value);
  };

  const handleSubmit = async (e) => {
    if (checked.length !== 0) {
      setLive((prevData) => {
        const newData = { ...prevData };
        newData.strickerId = checked[0];
        const stricker = newData.batting.filter(
          (player) => player.playerId === newData.strickerId
        );
        stricker[0].out_summary = "Run Out";
        setChecked([]);
        return newData;
      });
      await changeStrick(
        {
          strickerId: checked[0],
        },
        matchId
      );
      action(false);
    }
  };
  if (teamsData) {
    return (
      <RunOutModal
        type="Batsman"
        teamsData={teamsData}
        isOpen={isOpen}
        data={data}
        handleToggle={handleToggle}
        liveData={liveData}
        checked={checked}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        setChecked={setChecked}
      />
    );
  } else {
    return <Loader />;
  }
}
