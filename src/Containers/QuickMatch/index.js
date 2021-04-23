import React from "react";
import QuickMatchComponent from "../../Components/QuickMatchComponent/";
import { useForm, Controller } from "react-hook-form";
import { getFormDetails } from "../../utils/formData";
import { getMatchDetails } from "../../utils/getMatchDetails";
import { socket } from "../../socket";
import { MATCH_CREATED } from "../../Constants/socketEvents";
import FeatureDetails from "../../Components/FeatureDetails";
import AxiosContext from "../../context/axios";
import { apiCalls } from "crickboardapi";
function index({
  navigation,
  setShowHeader,
  loggedinUser,
  setLoggedinUser,
  loginAuthenticated,
  setLoginAuthenticated,
}) {
  const axios = React.useContext(AxiosContext);
  const { createMatch } = apiCalls(axios);
  const [tossModal, setTossModal] = React.useState(false);
  const [matchId, setMatchId] = React.useState();
  const [teams, setTeams] = React.useState({
    TeamA: "",
    TeamAId: "",
    TeamBId: "",
    TeamB: "",
  });
  const [loading, setLoading] = React.useState(false);
  const { control, handleSubmit, errors } = useForm({ mode: "onChange" });

  React.useEffect(() => {
    if (new Date(loggedinUser.expiredDate) <= new Date()) {
      setLoggedinUser({});
      setLoginAuthenticated(false);
    }
  }, []);

  const onFormSubmit = async (data) => {
    setLoading(true);
    const matchData = getMatchDetails(data, loggedinUser);

    const response = await createMatch(matchData);
    if (response.status === 201) {
      socket.emit(MATCH_CREATED, {
        matchId: response.data.data.matchId,
        matchName: data.matchDetails.match_name,
        max_overs: data.matchDetails.max_overs,
        venue: data.matchDetails.venue,
        teamOneName: response.data.data.teamAName,
        teamTwoName: response.data.data.teamBName,
        currentInnings: 1,
        overs: 0,
        result: "Match yet to start",
        score: 0,
        toss: "waiting for toss",
        startTime: new Date().toISOString(),
        wickets: 0,
      });
      setMatchId(response.data.data.matchId);
      setTeams({
        TeamAId: response.data.data.teamAId,
        TeamBId: response.data.data.teamBId,
        TeamA: response.data.data.teamAName,
        TeamB: response.data.data.teamBName,
      });
      navigation.navigate("ChallengeAccepted", {
        teamAId: response.data.data.teamAId,
        teamBId: response.data.data.teamBId,
        teamAName: response.data.data.teamAName,
        teamBName: response.data.data.teamBName,
        matchId: response.data.data.matchId,
      });
    }
  };

  const formFieldDetails = getFormDetails(errors);

  if (!loginAuthenticated) {
    const details = [
      "1. Register your teams and players to play a quick match.",
      "2. Admin dashboard will be provided to update the live score.",
      "3. Match will be Live immediately after you create quick match.",
      "4. Please Login to avail this feature.",
    ];
    return (
      <FeatureDetails
        navigation={navigation}
        details={details}
        setShowHeader={setShowHeader}
      />
    );
  } else {
    return (
      <QuickMatchComponent
        control={control}
        loading={loading}
        formFieldDetails={formFieldDetails}
        onFormSubmit={handleSubmit(onFormSubmit)}
        tossModal={tossModal}
        teams={teams}
        setTossModal={setTossModal}
        matchId={matchId}
        navigation={navigation}
        Controller={Controller}
        setShowHeader={setShowHeader}
      />
    );
  }
}

export default index;
