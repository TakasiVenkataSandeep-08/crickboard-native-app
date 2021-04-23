import React from "react";
import SpinnerComponent from "../../../Components/Spinner";
import AxiosContext from "../../../context/axios";
import { apiCalls } from "crickboardapi";
import TeamsComponent from "../../../Components/Teams";
function Teams({ matchId }) {
  const axios = React.useContext(AxiosContext);

  const { getTeams } = apiCalls(axios);
  const [teamsData, setTeamsData] = React.useState();
  React.useEffect(() => {
    let mounted = true;
    const getTeamsData = async () => {
      const TeamsData = await getTeams(matchId);
      if (!mounted) {
        return;
      }
      setTeamsData(TeamsData.data);
    };
    getTeamsData();
    return () => {
      mounted = false;
    };
  }, [matchId]);
  if (teamsData) {
    return <TeamsComponent teamsData={teamsData} />;
  } else {
    return <SpinnerComponent />;
  }
}

export default Teams;
