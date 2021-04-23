import React from "react";
import OpeningModalComponent from "../../../Components/OpeningModal";
import SpinnerComponent from "../../../Components/Spinner";
import AxiosContext from "../../../context/axios";
import { apiCalls } from "crickboardapi";
const OpeningModal = ({
  isOpen,
  action,
  data,
  matchId,
  liveData,
  setLiveData,
  navigation,
  setShowHeader,
}) => {
  const axios = React.useContext(AxiosContext);

  const { getTeams, changeStrick, getPlayer } = apiCalls(axios);
  const [teamsData, setTeamsData] = React.useState();
  const [snackBar, setSnackBar] = React.useState({
    value: false,
    message: "",
    type: "",
  });
  React.useEffect(() => {
    let mounted = true;
    const getTeamsData = async () => {
      const TeamData = await getTeams(matchId);
      if (!mounted) {
        return;
      }
      setTeamsData(TeamData.data);
    };
    getTeamsData();
  }, []);

  const handleClose = () => {
    action(false);
  };
  const [checkedBowler, setChecked] = React.useState([]);
  const [checkedBatsman, setCheckedBatsman] = React.useState([]);

  const handleToggle = (value) => {
    setChecked(value);
  };

  const handleBatsmanChange = (value) => {
    let selectedBatsman = [...checkedBatsman];
    const currentIndex = selectedBatsman.indexOf(value);
    if (currentIndex === -1) {
      if (selectedBatsman.length < 2) {
        selectedBatsman.push(value);
      }
    } else {
      selectedBatsman.splice(currentIndex, 1);
    }
    setCheckedBatsman(selectedBatsman);
  };

  const handleSubmit = async () => {
    if (checkedBowler !== 0 && checkedBatsman.length === 2) {
      const updateData = {
        bowlerId: checkedBowler,
        strickerId: checkedBatsman[0],
        nonStrickerId: checkedBatsman[1],
      };
      await changeStrick(updateData, matchId);
      const bowlerResponse = await getPlayer(checkedBowler, matchId);
      const strickerResponse = await getPlayer(checkedBatsman[0], matchId);
      const nonStrickerResponse = await getPlayer(checkedBatsman[1], matchId);
      if (liveData && setLiveData) {
        setLiveData((prevData) => {
          const newStateData = { ...prevData };
          newStateData.batting[0] = strickerResponse.data;
          newStateData.batting[1] = nonStrickerResponse.data;
          newStateData.bowling[0] = bowlerResponse.data;
          newStateData.battingTeam = newStateData.bowlingTeam;
          newStateData.bowlingTeam = newStateData.battingTeam;
          newStateData.bowlerId = checkedBowler;
          newStateData.strickerId = checkedBatsman[0];
          newStateData.nonStrickerId = checkedBatsman[1];
          newStateData.overs = 0;
          newStateData.inningOneScore = newStateData.score;
          newStateData.score = 0;
          newStateData.wickets = 0;
          newStateData.currentInnings === 1 ? 2 : 1;
          newStateData.battingTeamName = newStateData.bowlingTeamName;
          newStateData.bowlingTeamName = newStateData.battingTeamName;
          return newStateData;
        });
      }
      alert("Data Updated");
      if (navigation) {
        setShowHeader(false);
        navigation.navigate("Dashboard", {
          screen: "AdminDashboard",
          params: { id: matchId },
        });
      }
      handleClose();
    } else {
      alert("Data can not be updated,Select 2 batsman and 1 bowler");
    }
  };
  if (teamsData) {
    return (
      <OpeningModalComponent
        isOpen={isOpen}
        snackBar={snackBar}
        setSnackBar={setSnackBar}
        teamsData={teamsData}
        data={data}
        handleBatsmanChange={handleBatsmanChange}
        checkedBatsman={checkedBatsman}
        handleToggle={handleToggle}
        checkedBowler={checkedBowler}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        matchId={matchId}
        action={action}
      />
    );
  } else {
    return <SpinnerComponent />;
  }
};

export default OpeningModal;
