import React from "react";
import Dashboard from "../Dashboard";
import FeatureDetails from "../../Components/FeatureDetails";

function index({
  loggedinUser,
  navigation,
  setShowHeader,
  loginAuthenticated,
}) {
  if (!loginAuthenticated) {
    const details = [
      "1. Like the match to follow it.",
      "2. Subscribed matches can be viewed anytime.",
      "3. Subscribed matches can be unsubscribed anytime.",
      "4. Please Login to avail this feature",
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
      <Dashboard
        loggedinUser={loggedinUser}
        filter={true}
        setShowHeader={setShowHeader}
        navigation={navigation}
      />
    );
  }
}

export default index;
