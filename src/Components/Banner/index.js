import React from "react";
import {
  Flex,
  VStack,
  Text,
  Heading,
  Box,
  View,
  Badge,
  Avatar,
  Center,
  Button,
  Icon,
} from "native-base";
import SpinnerComponent from "../Spinner";
import { getRunRate } from "../../utils/getRunRate";
import { ScrollView } from "react-native";

import getAvatar from "../../utils/createAvatar";
const Banner = ({ matchId, isAdmin, data, navigation, setShowHeader }) => {
  const gotoAdminDashboard = () => {
    setShowHeader(false);
    navigation.navigate("AdminDashboard", { id: matchId });
  };
  if (data) {
    const currentInnings = data.matchData.current_innings;
    const firstBattingTeam = `${
      currentInnings === 2
        ? `${data.bowlingTeam.team_name}`
        : `${data.battingTeam.team_name}`
    }`;
    const secondBattingTeam = `${
      currentInnings === 1
        ? `${data.bowlingTeam.team_name}`
        : `${data.battingTeam.team_name}`
    }`;
    return (
      <ScrollView>
        <Flex w="100%" h="100%">
          <VStack space={4} width="100%">
            <View m={1}>
              <Box width="100%" bg="#fff" p={2} shadow={1}>
                <Heading size="sm" textAlign="center">
                  Venue: {data.matchData.match.venue}
                </Heading>
                <Badge m={2} shadow={2} colorScheme="success" borderRadius={20}>
                  <Text textAlign="center" textTransform="none">
                    {data.matchData.current_innings === 1
                      ? data.matchData.match.result
                      : data.matchData.match.isCompleted !== 0
                      ? data.matchData.match.result
                      : `Target ${data.matchData.team_a_score + 1} runs in ${
                          data.matchData.match.max_overs * 6
                        } balls`}
                  </Text>
                </Badge>
                {isAdmin && (
                  <Center>
                    <Button
                      shadow={2}
                      bg="#F44335"
                      onPress={gotoAdminDashboard}
                      iconLeft
                      alignContent="center"
                    >
                      <Icon color="#fff" name="edit" />
                      <Text color="#fff">Edit Match</Text>
                    </Button>
                  </Center>
                )}
                <Flex direction="row" justifyContent="center">
                  <Box
                    width="43%"
                    bg="#fff"
                    p={2}
                    color="#fff"
                    alignContent="flex-end"
                  >
                    <Center>
                      <Avatar mb={2} shadow={2} size="2xl">
                        {getAvatar(firstBattingTeam)}
                      </Avatar>
                      <Heading
                        size="md"
                        color={currentInnings === 1 ? "#000" : "grey"}
                      >
                        {firstBattingTeam}
                      </Heading>
                      <Heading
                        size="xl"
                        color={currentInnings === 1 ? "#000" : "grey"}
                      >
                        {currentInnings === 1
                          ? `${data.matchData.score}/${data.matchData.wickets}`
                          : `${data.matchData.team_a_score}/${data.matchData.team_a_wickets}`}
                      </Heading>
                      <Heading
                        size="sm"
                        color={currentInnings === 1 ? "#000" : "grey"}
                      >
                        Run Rate:{" "}
                        {currentInnings === 1
                          ? `${
                              data.matchData.score === 0 &&
                              data.matchData.overs === 0
                                ? "0.0"
                                : getRunRate(
                                    data.matchData.score,
                                    data.matchData.overs
                                  )
                            }`
                          : `${
                              data.matchData.team_a_score === 0 &&
                              data.matchData.team_a_overs === 0
                                ? "0.0"
                                : getRunRate(
                                    data.matchData.team_a_score,
                                    data.matchData.team_a_overs
                                  )
                            }`}
                      </Heading>
                      <Heading
                        size="sm"
                        color={currentInnings === 1 ? "#000" : "grey"}
                      >
                        Overs:{" "}
                        {currentInnings === 1
                          ? `${data.matchData.overs}/${data.matchData.match.max_overs}`
                          : `${data.matchData.team_a_overs}/${data.matchData.match.max_overs}`}
                      </Heading>
                    </Center>
                  </Box>
                  <Box
                    width="14%"
                    bg="#fff"
                    color="#fff"
                    justifyContent="center"
                  >
                    <Center shadow={1}>
                      <Heading size="xl" color="#EB4133">
                        Vs
                      </Heading>
                    </Center>
                  </Box>
                  <Box width="43%" bg="#fff" p={2} color="#fff">
                    <Center>
                      <Avatar mb={2} shadow={2} size="2xl">
                        {getAvatar(secondBattingTeam)}
                      </Avatar>
                      <Heading
                        size="md"
                        color={currentInnings === 2 ? "#000" : "grey"}
                      >
                        {secondBattingTeam}
                      </Heading>
                      <Heading
                        size="xl"
                        color={currentInnings === 2 ? "#000" : "grey"}
                      >
                        {currentInnings === 1
                          ? "Yet to Bat"
                          : `${data.matchData.score}/${data.matchData.wickets}`}
                      </Heading>
                      <Heading
                        size="sm"
                        color={currentInnings === 2 ? "#000" : "grey"}
                      >
                        Run Rate:{" "}
                        {currentInnings === 1
                          ? "0.0"
                          : `${
                              data.matchData.score === 0 &&
                              data.matchData.overs === 0
                                ? "0.0"
                                : getRunRate(
                                    data.matchData.score,
                                    data.matchData.overs
                                  )
                            }`}
                      </Heading>
                      <Heading
                        size="sm"
                        color={currentInnings === 2 ? "#000" : "grey"}
                      >
                        Overs:{" "}
                        {currentInnings === 1
                          ? `0/${data.matchData.match.max_overs}`
                          : `${data.matchData.overs}/${data.matchData.match.max_overs}`}
                      </Heading>
                    </Center>
                  </Box>
                </Flex>
              </Box>
            </View>
          </VStack>
        </Flex>
      </ScrollView>
    );
  } else {
    return <SpinnerComponent />;
  }
};

export default Banner;
