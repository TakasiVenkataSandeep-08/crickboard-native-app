import React from "react";
import VerifyComponent from "../../Components/CommonVerify";
import AxiosContext from "../../context/axios";
import { apiCalls } from "crickboardapi";
function Index({ id, navigation, setShowHeader }) {
  const axios = React.useContext(AxiosContext);
  const { verifyUser } = apiCalls(axios);
  React.useEffect(() => {
    setShowHeader(false);
  }, []);
  const [loading, setLoading] = React.useState(false);
  const handleVerifyEmail = async () => {
    setLoading(true);
    const response = await verifyUser(
      {
        is_verified: true,
      },
      id
    );
    setLoading(false);
    if (response) {
      navigation.navigate("Login", {
        verified: {
          value: true,
          message: "Email has been verified please login",
          type: "green",
        },
      });
    }
  };
  const headingText =
    "By clicking below you are agreeing to our terms and policies.";

  const buttonDetails = [{ name: "verify", handler: handleVerifyEmail }];
  return (
    <VerifyComponent
      headingText={headingText}
      buttonDetails={buttonDetails}
      loading={loading}
    />
  );
}

export default Index;
