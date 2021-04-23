import React from "react";
import MatchCardComponent from "../../Components/MatchCard/Card";
import { useCrickStore } from "../../store";
import AxiosContext from "../../context/axios";
import { apiCalls } from "crickboardapi";
function MatchCard({
  navigation,
  loggedinUser,
  match,
  goToMatchDetail,
  blinkCard,
}) {
  const axios = React.useContext(AxiosContext);

  const { subscribeToMatch, removeSubscription } = apiCalls(axios);
  const {
    subscriptions,
    addSubscription,
    deleteSubscription,
  } = useCrickStore();

  const isSubscribed = (() => {
    if (subscriptions.length !== 0) {
      const matchIndex = subscriptions.findIndex(
        (subscription) => subscription.matchId === match.matchId
      );
      if (matchIndex !== -1) {
        return { value: true, subscriptionId: subscriptions[matchIndex].id };
      } else {
        return { value: false, subscriptionId: 0 };
      }
    } else {
      return { value: false, subscriptionId: 0 };
    }
  })();

  const handleSubscribeChange = async () => {
    if (Object.keys(loggedinUser).length !== 0) {
      if (isSubscribed.value) {
        //get subscription id of respective match
        const subscribedMatch = subscriptions.find(
          (subscription) => subscription.matchId === match.matchId
        );
        //api call to delete subscription
        await removeSubscription(subscribedMatch.id);

        //dispatch event to redux
        deleteSubscription(subscribedMatch.id);
      } else {
        const subscriptionData = {
          matchId: match.matchId,
          userId: loggedinUser.userId,
        };
        const response = await subscribeToMatch(subscriptionData);

        //dispatch call to store matchid and respective subscription id
        addSubscription({
          id: response.data.id,
          matchId: response.data.matchId,
        });
      }
    } else {
      navigation.navigate("Login");
    }
  };
  return (
    <MatchCardComponent
      blinkCard={blinkCard}
      isSubscribed={isSubscribed}
      goToMatchDetail={goToMatchDetail}
      handleSubscribeChange={handleSubscribeChange}
      match={match}
    />
  );
}

export default MatchCard;
