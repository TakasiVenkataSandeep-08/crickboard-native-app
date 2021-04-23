import React from "react";
import ChallengeMatchComponent from "../../Components/ChallengeMatch";
import { useForm, Controller } from "react-hook-form";
import {
  textFormValidator,
  numberValidator,
  requiredValidator,
} from "../../FormValidations";
// import { getAllTeams } from "../../api/teams";
import SpinnerComponent from "../../Components/Spinner";
import FeatureDetails from "../../Components/FeatureDetails";
import AxiosContext from "../../context/axios";
import { apiCalls } from "crickboardapi";
function index({
  loggedinUser,
  setLoggedinUser,
  loginAuthenticated,
  setLoginAuthenticated,
  navigation,
  setShowHeader,
}) {
  const axios = React.useContext(AxiosContext);

  const { createChallengeMatch, getAllTeams } = apiCalls(axios);
  const [teams, setTeams] = React.useState();
  React.useEffect(() => {
    if (new Date(loggedinUser.expiredDate) <= new Date()) {
      setLoggedinUser({});
      setLoginAuthenticated(false);
    }
    let mounted = true;
    const initializeDashboard = async () => {
      const allTeams = await getAllTeams();
      if (!mounted) {
        return;
      }
      setTeams(allTeams.data);
    };
    initializeDashboard();
    return () => {
      mounted = false;
    };
  }, []);
  const [date, setDate] = React.useState(new Date());

  const [tossModal, setTossModal] = React.useState(false);
  const [matchId, setMatchId] = React.useState();
  const { control, handleSubmit, errors } = useForm({ mode: "onChange" });
  const [teamA, setTeamA] = React.useState({});
  const [teamAPlayers, setTeamAPlayers] = React.useState([]);
  const [teamsData, setTeamsData] = React.useState({
    TeamA: "",
    TeamAId: "",
    TeamBId: "",
    TeamB: "",
  });
  const [teamB, setTeamB] = React.useState({});
  const [teamBPlayers, setTeamBPlayers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const matchFormDetails = [
    [
      {
        name: "matchDetails.match_name",
        type: "text",
        label: "Match Name*",
        error: errors.matchDetails && errors.matchDetails.match_name,
        helperText:
          errors.matchDetails && errors.matchDetails.match_name
            ? errors.matchDetails.match_name.message
            : null,
        rules: textFormValidator(),
      },
      {
        name: "matchDetails.venue",
        type: "text",
        label: "Venue*",
        error: errors.matchDetails && errors.matchDetails.venue,
        helperText:
          errors.matchDetails && errors.matchDetails.venue
            ? errors.matchDetails.venue.message
            : null,
        rules: textFormValidator(),
      },
      {
        name: "matchDetails.max_overs",
        type: "number",
        label: "overs*",
        error: errors.matchDetails && errors.matchDetails.max_overs,
        helperText:
          errors.matchDetails && errors.matchDetails.max_overs
            ? errors.matchDetails.max_overs.message
            : null,
        rules: numberValidator(),
      },
    ],
  ];

  const handleCreateChallengeMatch = async (data) => {
    setLoading(true);
    const start_time = date.toISOString();
    let playerList = teamAPlayers.concat(teamBPlayers);
    var i;
    for (i = 0; i < playerList.length; i++) {
      playerList[i].playerId = playerList[i]["id"];
      delete playerList[i].id;
    }
    const Data = {
      isNativeAppRequest: true,
      matchData: {
        match_name: data.matchDetails.match_name,
        team_a_id: teamA.id,
        team_b_id: teamB.id,
        max_overs: data.matchDetails.max_overs,
        venue: data.matchDetails.venue,
        adminId: loggedinUser.userId,
        start_time: start_time,
      },
      matchDetails: {
        current_batting_team: teamA.id,
        current_bowling_team: teamB.id,
        strickerId: playerList[0].playerId,
        nonStrickerId: playerList[1].playerId,
        bowlerId: playerList[playerList.length - 1].playerId,
      },
      playersData: playerList,
    };
    if (teamB.ownerId === loggedinUser.userId) {
      Data.matchData.is_verified = true;
    }

    const response = await createChallengeMatch(Data);

    if (response.status === 201) {
      console.log("Status",teamB.ownerId === loggedinUser.userId)
      console.log("Status",navigation)
      if (teamB.ownerId === loggedinUser.userId) {
        setLoading(false);
        setMatchId(response.data.data.matchId);
        setTeamsData({
          TeamAId: teamA.id,
          TeamBId: teamB.id,
          TeamA: teamA.team_name,
          TeamB: teamB.team_name,
        });
        navigation.navigate("ChallengeAccepted", {
          teamAId: teamA.id,
          teamBId: teamB.id,
          teamAName: teamA.team_name,
          teamBName: teamB.team_name,
          matchId: response.data.data.matchId,
        });
      } else {
        setLoading(false);
        navigation.navigate("Dashboard")
      }
    }
  };
  if (!loginAuthenticated) {
    const details = [
      "1. Register your teams and challenge your peers.",
      "2. You can pick time and venue for challenge match of your choice",
      "3. Match will be live once your opponent accepts your challenge.",
      "4. Admin dashboard will be provided to update the live score.",
      "5. Please Login to avail this feature.",
    ];
    return (
      <FeatureDetails
        navigation={navigation}
        details={details}
        setShowHeader={setShowHeader}
      />
    );
  } else {
    if (teams) {
      return (
        <ChallengeMatchComponent
          formFieldDetails={matchFormDetails}
          Controller={Controller}
          control={control}
          onFormSubmit={handleSubmit(handleCreateChallengeMatch)}
          teams={teams}
          setTeams={setTeams}
          teamA={teamA}
          teamB={teamB}
          setTeamA={setTeamA}
          setTeamB={setTeamB}
          teamAPlayers={teamAPlayers}
          teamBPlayers={teamBPlayers}
          setTeamAPlayers={setTeamAPlayers}
          setTeamBPlayers={setTeamBPlayers}
          loggedinUser={loggedinUser}
          loading={loading}
          date={date}
          setDate={setDate}
          tossModal={tossModal}
          setTossModal={setTossModal}
          matchId={matchId}
          teamsData={teamsData}
          navigation={navigation}
          setShowHeader={setShowHeader}
        />
      );
    } else {
      return <SpinnerComponent />;
    }
  }
}

export default index;
