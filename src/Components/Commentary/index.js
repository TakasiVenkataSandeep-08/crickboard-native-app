import React from "react";
import { ScrollView } from "react-native";
import {
  Text,
  Flex,
  Box,
  Heading,
  Circle,
  Icon,
  Divider,
  View,
} from "native-base";
const Commentary = ({ data }) => {
  const renderOverCompleted = (ball, prevBall) => {
    if (prevBall && ball.innings !== prevBall.innings) {
      return (
        <Flex
          w="100%"
          direction="row"
          p={5}
          borderRadius="10"
          mt={1}
          bg="#19398A"
          shadow={4}
        >
          <Box>
            <Text color="#fff" fontSize={22} bold>
              End of Innings 1
            </Text>
          </Box>
          <Box ml={4}>
            <Text fontSize={22} color="#fff" bold>
              Target: {ball.score_summary.split(",")[0]}
            </Text>
          </Box>
        </Flex>
      );
    }
    if (Number.isInteger(ball.ball_number)) {
      if (Number.isInteger(prevBall.ball_number)) {
        return;
      }
      return (
        <Flex
          w="100%"
          direction="row"
          p={5}
          borderRadius="10"
          mt={1}
          bg="#D2302F"
          shadow={4}
        >
          <Box>
            <Text color="#fff" fontSize={22} bold>
              End of Over: {ball.ball_number}
            </Text>
          </Box>
          <Box ml={4}>
            <Text fontSize={22} color="#fff" bold>
              Score: {ball.score_summary.split(",")[0]}
            </Text>
          </Box>
        </Flex>
      );
    } else {
      return;
    }
  };
  const renderBallsData = () => {
    return data.map((ball, key, arr) => {
      let previousBall = { ...ball };
      if (key !== 0) {
        previousBall = arr[key - 1];
      }
      return (
        <View key={key}>
          {renderOverCompleted(ball, previousBall)}
          <Flex w="100%" direction="row" p={2} borderRadius="10" mt={1}>
            <Box>
              <Circle
                size={50}
                bg={
                  ball.ball_summary === "W"
                    ? "red.600"
                    : ball.ball_summary === "6"
                    ? "blue.400"
                    : ball.ball_summary === "4"
                    ? "green.400"
                    : ["wd", "lb", "nb", "b"].some((ext) =>
                        ball.ball_summary.includes(ext)
                      )
                    ? "orange.400"
                    : "indigo.300"
                }
                shadow={2}
              >
                <Text color="#fff" fontSize={20}>
                  {ball.ball_summary}
                </Text>
              </Circle>
            </Box>
            <Box ml={4}>
              <Text fontSize={20} bold>
                {ball.ball_number.toFixed(1)}
              </Text>
              <Text fontSize={15} bold>
                {ball.commentary}
              </Text>
            </Box>
          </Flex>
        </View>
      );
    });
  };
  return (
    <ScrollView>
      <Heading mb={4} shadow={2} textAlign="center">
        Live Cricket Commentary
      </Heading>
      {renderBallsData()}
    </ScrollView>
  );
};

export default Commentary;
