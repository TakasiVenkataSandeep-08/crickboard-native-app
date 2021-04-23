import React from "react";
import TossModal from "../Modals/Toss";
import SpinnerComponent from "../../Components/Spinner";
import { Text } from "native-base";
import AxiosContext from "../../context/axios";
import { apiCalls } from "crickboardapi";
function Index({
  navigation,
  teamAId,
  teamBId,
  teamAName,
  teamBName,
  matchId,
  loggedinUser,
  setShowHeader,
}) {
  const axios = React.useContext(AxiosContext);
  const { checkisAuthorized } = apiCalls(axios);
  const [tossModal, setTossModal] = React.useState(false);
  const [teams, setTeams] = React.useState({
    TeamA: "",
    TeamAId: "",
    TeamBId: "",
    TeamB: "",
  });
  const [isAuthorized, setIsAuthorized] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setShowHeader(false);
  }, []);

  React.useEffect(() => {
    let mounted = true;
    async function validateTeamOwner() {
      if (Object.keys(loggedinUser).length !== 0 && mounted) {
        setLoading(true);

        const isAuthorizedResponse = await checkisAuthorized(
          matchId,
          teamAId,
          loggedinUser.userId
        );

        setIsAuthorized(isAuthorizedResponse);
        setTeams({
          TeamAId: teamAId,
          TeamBId: teamBId,
          TeamA: teamAName,
          TeamB: teamBName,
        });
        setTossModal(true);
        setLoading(false);
      } else {
        return;
      }
    }
    validateTeamOwner();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return <SpinnerComponent />;
  } else {
    if (!loading && isAuthorized) {
      return (
        <TossModal
          setShowHeader={setShowHeader}
          isOpen={tossModal}
          navigation={navigation}
          action={setTossModal}
          teams={teams}
          matchId={matchId}
          navigation={navigation}
        />
      );
    } else {
      return <Text>You have no access to this page.</Text>;
    }
  }
}

export default Index;
