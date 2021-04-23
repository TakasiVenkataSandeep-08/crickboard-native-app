import React from "react";
import SpinnerComponent from "../../Components/Spinner";
import VerifyComponent from "../../Components/CommonVerify";
import AxiosContext from "../../context/axios";
import { apiCalls } from "crickboardapi";
function index({
  loggedinUser,
  navigation,
  id,
  teamAId,
  teamBId,
  teamName,
  setShowHeader,
}) {
  const axios = React.useContext(AxiosContext);
  const {
    checkTeamOwner,
    clearCompleteMatchData,
    verifyMatch,
    checkIsMatchVerified,
  } = apiCalls(axios);
  const [isOwner, setIsOwner] = React.useState(false);
  const [isVerified, setIsVerified] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [buttonLoading, setButtonLoading] = React.useState(false);

  React.useEffect(() => {
    setShowHeader(false);
  }, []);

  React.useEffect(() => {
    let mounted = true;
    async function isVerifiedCheck() {
      const isVerifiedResponse = await checkIsMatchVerified(id);

      setIsVerified(isVerifiedResponse);
      if (isVerifiedResponse) {
        setLoading(false);
        return;
      }
    }
    async function validateTeamOwner() {
      if (Object.keys(loggedinUser).length !== 0 && mounted) {
        setLoading(true);
        const response = await checkTeamOwner(teamBId, loggedinUser.userId);
        setIsOwner(response);
        setLoading(false);
      } else {
        return;
      }
    }
    isVerifiedCheck();
    validateTeamOwner();
    return () => {
      mounted = false;
    };
  }, []);
  const handleAcceptChallenge = async () => {
    setButtonLoading(true);
    const response = await verifyMatch(
      {
        isNativeAppRequest: true,
        matchUpdate: { is_verified: true },
        challengeData: {
          teamAId: teamAId,
          teamBId: teamBId,
        },
      },
      id
    );
    setButtonLoading(false);
    if (response) {
      navigation.navigate("Dashboard", { screen: "Home" });
    }
  };
  const handleRejectChallenge = async () => {
    setButtonLoading(true);
    const response = await clearCompleteMatchData(id, teamAId, teamBId);
    setButtonLoading(false);
    if (response) {
      navigation.navigate("Dashboard", { screen: "Home" });
    }
  };
  const headingText = `${teamName} has challenged you for a match`;

  const buttonDetails = [
    { name: "Accept", handler: handleAcceptChallenge },
    { name: "reject", handler: handleRejectChallenge },
  ];

  if (!loading) {
    return (
      <VerifyComponent
        headingText={headingText}
        buttonDetails={buttonDetails}
        loading={buttonLoading}
      />
    );
  } else {
    return <SpinnerComponent />;
  }
}

export default index;
