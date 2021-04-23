import React from "react";
import { Box, Flex, Text, Divider } from "native-base";
import Commentary from "../../Containers/MatchDetail/Commentary";
import { ScrollView } from "react-native";
import { getRunRate } from "../../utils/getRunRate";
import SpinnerComponent from "../Spinner";
const LiveScore = ({ matchId, data }) => {
  if (data) {
    return (
      <ScrollView>
        <Flex w="100%">
          <Flex
            w="100%"
            h="10"
            direction="row"
            bg="#061D42"
            borderRadius="10"
            shadow={4}
          >
            {["Batting", "R", "B", "4s", "6s", "SR"].map((field, index) => {
              return (
                <Box
                  key={index}
                  width={field !== "Batting" ? "11%" : "44%"}
                  height="10"
                >
                  <Text color="#fff" p={2} mt={1}>
                    {field}
                  </Text>
                </Box>
              );
            })}
          </Flex>
          {data.batting.map((row, index) => {
            return (
              <Flex key={index} w="100%" h="10" direction="row" p={2}>
                {[
                  [
                    row.player_name,
                    data.strickerId === row.playerId ? "*" : "",
                  ],
                  row.runs,
                  row.balls_faced,
                  row.fours,
                  row.sixs,
                  row.runs && row.balls_faced
                    ? ((row.runs / row.balls_faced) * 100).toFixed(2)
                    : "0.00",
                ].map((field, index) => {
                  return index === 0 ? (
                    <React.Fragment key={index}>
                      <Box width="40%" height="10">
                        <Text fontSize="md">
                          {field[0]} {field[1]}
                        </Text>
                        <Text fontSize={12} color="grey">
                          Not Out
                        </Text>
                      </Box>
                    </React.Fragment>
                  ) : (
                    <Box key={index} height="10" width="12%">
                      <Text textAlign="center">{field}</Text>
                    </Box>
                  );
                })}
              </Flex>
            );
          })}
          <Flex
            w="100%"
            h="10"
            direction="row"
            bg="#061D42"
            borderRadius="10"
            mt={2}
            shadow={4}
          >
            {["Bowling", "O", "R", "W", "Ext", "Eco"].map((field, index) => {
              return (
                <Box
                  key={index}
                  width={field !== "Bowling" ? "11%" : "44%"}
                  height="10"
                >
                  <Text color="#fff" p={2} mt={1}>
                    {field}
                  </Text>
                </Box>
              );
            })}
          </Flex>

          <Flex w="100%" h="10" direction="row" mt={1} p={2}>
            {[
              data.bowling[0].player_name,
              data.bowling[0].overs_bowled,
              data.bowling[0].runs_given,
              data.bowling[0].wickets,
              data.bowling[0].extras,
              data && data.bowling[0].overs_bowled
                ? getRunRate(
                    data.bowling[0].runs_given,
                    data.bowling[0].overs_bowled
                  )
                : "0.00",
            ].map((value, index) => {
              return index === 0 ? (
                <React.Fragment key={index}>
                  <Box width="40%" height="10">
                    <Text fontSize="md">{value}</Text>
                  </Box>
                </React.Fragment>
              ) : (
                <Box key={index} height="10" width="12%">
                  <Text textAlign="center">{value}</Text>
                </Box>
              );
            })}
          </Flex>
          <Divider my={2} borderWidth={0.3} />
          <Commentary matchId={matchId} />
        </Flex>
      </ScrollView>
    );
  } else {
    return <SpinnerComponent />;
  }
};

export default LiveScore;
