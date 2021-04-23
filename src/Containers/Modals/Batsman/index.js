import React from "react";
import Loader from "../../../Components/Spinner";
import { socket } from "../../../socket";

import {
  LIVE_UPDATE,
  JOIN_MATCH,
  LEAVE_MATCH,
  NEW_BATSMANN,
} from "../../../Constants/socketEvents";
import BatsmanModal from "../../../Components/PlayersModel";
import AxiosContext from "../../../context/axios";
import { apiCalls } from "crickboardapi";
export default function TransitionsModal({
  isOpen,
  action,
  data,
  matchId,
  liveData,
  setLive,
  wickets,
  OpenBowlerModal,
}) {
  const axios = React.useContext(AxiosContext);

  const { getTeams, changeStrick, getPlayer } = apiCalls(axios);
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
  };
  const [checked, setChecked] = React.useState([]);

  const handleToggle = (value) => () => {
    setChecked(value);
  };

  const handleSubmit = async (e) => {
    if (checked.length !== 0) {
      await changeStrick(
        {
          strickerId: checked[0],
        },
        matchId
      );

      const res = await getPlayer(checked[0], matchId);
      socket.emit(NEW_BATSMANN, {
        room: matchId,
        batsmanData: res.data,
      });
      setTeamsData((prevData) => {
        const newData = [...prevData];
        const battingTeamIndex = newData.findIndex(
          (team) => team.teamId === liveData.battingTeam
        );
        const battingTeam = newData[battingTeamIndex];
        const player = battingTeam.players.findIndex(
          (prevBat) => prevBat.playerId === liveData.strickerId
        );
        battingTeam.players[player].outSummary = "Out";
        return newData;
      });
      setLive((prevData) => {
        const newData = { ...prevData };

        const batsmanIndex = newData.batting.findIndex(
          (batsman) => batsman.playerId === liveData.strickerId
        );
        newData.batting[batsmanIndex] = {
          ...newData.batting[batsmanIndex],
          ...res.data,
        };
        newData.strickerId = checked[0];
        setChecked([]);
        socket.emit(LIVE_UPDATE, {
          room: matchId,
          newData: newData,
        });
        return newData;
      });
      handleClose();
      if (wickets === "Run Out" && parseFloat(liveData.overs + 0.1) % 1 === 0) {
        OpenBowlerModal();
      }
    }
  };
  if (teamsData) {
    return (
      <BatsmanModal
        type="Batsman"
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
