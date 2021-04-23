import React from "react";
import { Flex, VStack, Heading } from "native-base";

import { ScrollView, StyleSheet } from "react-native";
import MatchCard from "../../Containers/Dashboard/MatchCard";
const index = ({
  navigation,
  matchesData,
  loggedinUser,
  filter,
  blink,
  setShowHeader,
}) => {
  const goToMatchDetail = (matchId) => {
    setShowHeader(false);
    navigation.navigate("MatchDetail", { id: matchId, navigation: navigation });
  };
  return (
    <ScrollView style={styles.container}>
      <Flex w="100%" h="100%" mb={10}>
        <VStack space={4} width="100%">
          <Heading color="teal.500" textAlign="center" mt={2}>
            {!filter ? "Live Matches" : "My Subscriptions"}
          </Heading>
          {matchesData.map((match, index) => {
            return (
              <MatchCard
                key={index}
                blinkCard={blink.includes(match.matchId)}
                match={match}
                navigation={navigation}
                goToMatchDetail={goToMatchDetail}
                loggedinUser={loggedinUser}
              />
            );
          })}
        </VStack>
      </Flex>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f8ff",
  },
});

export default index;
