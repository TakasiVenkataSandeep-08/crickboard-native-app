import React from "react";
import PlayerList from "../../../Components/PlayerList";
import Spinner from "../../../Components/Spinner";
import AxiosContext from "../../../context/axios";
import { apiCalls } from "crickboardapi";
function index({ teamId, teamPlayers, setTeamPlayers }) {
  const axios = React.useContext(AxiosContext);
  const { getTeamPlayers } = apiCalls(axios);
  const [players, setPlayers] = React.useState();
  React.useEffect(() => {
    let mounted = true;
    const initializeDashboard = async () => {
      const allPlayers = await getTeamPlayers(teamId);
      if (!mounted) {
        return;
      }
      setPlayers(allPlayers.data);
    };
    initializeDashboard();
    return () => {
      mounted = false;
    };
  }, [teamId]);

  if (players) {
    return (
      <PlayerList
        teamId={teamId}
        players={players}
        setPlayers={setPlayers}
        checked={teamPlayers}
        setChecked={setTeamPlayers}
      />
    );
  } else {
    return <Spinner />;
  }
}

export default index;
