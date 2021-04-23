import React from "react";
import SpinnerComponent from "../Spinner";
import {
  Avatar,
  Box,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Text,
} from "native-base";
function LastTenBalls({ ballsInfo, currentInnings }) {
  if (ballsInfo) {
    if (ballsInfo.length === 0) {
      return (
        <Flex w="100%" h="100px" justify="space-between" align="center">
          <Flex w="100%" justify="center" align="center">
            <Heading mt={2} size="sm">
              No Balls to Display...
            </Heading>
          </Flex>
        </Flex>
      );
    } else {
      return (
        <Flex
          px={0.5}
          w="100%"
          h="90px"
          flexDir="column"
          justify="space-between"
          align="center"
        >
          <Flex w="100%" justify="center" align="center">
            <Heading mt={2} size="sm" color="blue.600">
              Previous ten balls...
            </Heading>
          </Flex>
          <HStack px={2} w="100%" space={2}>
            {ballsInfo.slice(0, 10).map((ball, index) => {
              const avatarColor =
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
                  : "indigo.300";
              if (ball.innings === currentInnings) {
                return (
                  <Flex
                    w="100%"
                    key={index}
                    flexDir="column"
                    justify="space-between"
                    align="center"
                  >
                    <Text color="blue.800">{ball.ball_number.toFixed(1)}</Text>
                    <Avatar
                      shadow={2}
                      size="sm"
                      color="transparent"
                      bgColor={avatarColor}
                    >
                      <Text>{ball.ball_summary}</Text>
                    </Avatar>
                  </Flex>
                );
              } else {
                return;
              }
            })}
          </HStack>
        </Flex>
      );
    }
  } else {
    return <SpinnerComponent />;
  }
}

export default LastTenBalls;
