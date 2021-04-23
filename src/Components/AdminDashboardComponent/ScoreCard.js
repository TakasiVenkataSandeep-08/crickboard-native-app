import React from "react";
import { Box, Flex, Text, Divider } from "native-base";
import SpinnerComponent from "../Spinner";
import { getRunRate } from "../../utils/getRunRate";
function ScoreCard({ liveInfo, maxOvers }) {
  if (liveInfo) {
    return (
      <Box px={2}>
        <Flex
          mt="20px"
          w="100%"
          h="10"
          direction="row"
          bg="#061D42"
          borderRadius="10px"
          shadow={4}
        >
          <Box width="40%" height="10">
            <Text color="white" p="6%">
              Batting
            </Text>
          </Box>
          {["R", "B", "4's", "6's", "S/R"].map((detail, index) => {
            return (
              <Box height="10" width="12%" key={index}>
                <Text color="white" p="16%" textAlign="center">
                  {detail}
                </Text>
              </Box>
            );
          })}
        </Flex>
        {liveInfo.batting ? (
          liveInfo.batting.map((player, index) => {
            return (
              <React.Fragment key={index}>
                <Flex
                  key={player.playerId}
                  w="100%"
                  h="10"
                  direction="row"
                  mt={2}
                  p={2}
                >
                  <Box width="40%" height="10">
                    <Text fontSize="md">{player.player_name}</Text>
                    <Text fontSize="sm" color="grey">
                      {liveInfo.strickerId === player.playerId ? "🏏" : ""}
                    </Text>
                  </Box>
                  {[
                    player.runs,
                    player.balls_faced,
                    player.fours,
                    player.sixs,
                    player.balls_faced === 0
                      ? "0.00"
                      : ((player.runs / player.balls_faced) * 100).toFixed(2),
                  ].map((field, index) => {
                    return (
                      <Box key={index} height="10" width="12%">
                        <Text textAlign="center">{field}</Text>
                      </Box>
                    );
                  })}
                </Flex>
                <Divider mt={2} borderWidth={0.3} />
              </React.Fragment>
            );
          })
        ) : (
          <SpinnerComponent />
        )}

        <Flex
          w="100%"
          h="10"
          direction="row"
          bg="#061D42"
          borderRadius="10px"
          mt={1}
          shadow={4}
        >
          <Box width="40%" height="10">
            <Text color="white" p="6%">
              Bowling
            </Text>
          </Box>
          {["O", "R", "W", "Extra", "Eco"].map((field, index) => {
            return (
              <Box height="10" width="12%" key={index}>
                <Text color="white" p="16%" textAlign="center">
                  {field}
                </Text>
              </Box>
            );
          })}
        </Flex>
        {liveInfo.bowling ? (
          liveInfo.bowling.map((player, index) => {
            return (
              <Flex
                key={player.playerId}
                key={index}
                w="100%"
                h="10"
                direction="row"
                mt={1}
                p={2}
              >
                <Box width="40%" height="10">
                  <Text fontSize="md">{player.player_name}</Text>
                </Box>
                {[
                  player.overs_bowled,
                  player.runs_given,
                  player.wickets,
                  player.extras,
                  player.runs_given && player.overs_bowled !== 0
                    ? getRunRate(player.runs_given, player.overs_bowled)
                    : "0.00",
                ].map((field, index) => {
                  return (
                    <Box key={index} height="10" width="12%">
                      <Text textAlign="center">{field}</Text>
                    </Box>
                  );
                })}
              </Flex>
            );
          })
        ) : (
          <SpinnerComponent />
        )}
        <Divider mt={2} borderWidth={0.3} />

        <Flex
          w="100%"
          h="40px"
          borderRadius="10px"
          color="white"
          direction="row"
          bg="#061D42"
          mt={2}
        >
          <Box
            width="100%"
            height="100%"
            d="flex"
            justifyContent="center"
            alignItems="center"
            shadow={4}
          >
            <Text color="white" fontSize="md">
              {liveInfo.currentInnings === 1
                ? "1st Innings"
                : `2nd Innings Target (${liveInfo.inningOneScore + 1} runs)`}
            </Text>
          </Box>
        </Flex>

        <Flex w="100%" h="100px" direction="row" mt="2px" p="5%">
          <Box height="10" width="33.3%">
            <Text fontSize="lg" textAlign="center">
              Score
            </Text>
            <Text fontSize="md" textAlign="center" mt="8px">
              {liveInfo.score}/{liveInfo.wickets}
            </Text>
          </Box>
          <Divider
            orientation="vertical"
            borderColor="#061D42"
            borderWidth={2}
          />
          <Box height="10" width="33.3%">
            <Text fontSize="lg" textAlign="center">
              CRR
            </Text>
            <Text fontSize="md" textAlign="center" mt="8px">
              {liveInfo.score && liveInfo.overs
                ? getRunRate(liveInfo.score, liveInfo.overs)
                : "0.00"}
            </Text>
          </Box>
          <Divider
            orientation="vertical"
            borderColor="#061D42"
            borderWidth={2}
          />
          <Box height="10" width="33.3%">
            <Text fontSize="lg" textAlign="center">
              Overs
            </Text>
            <Text fontSize="md" textAlign="center" mt="8px">
              {liveInfo.overs}/{maxOvers}
            </Text>
          </Box>
        </Flex>
      </Box>
    );
  } else {
    return <SpinnerComponent />;
  }
}

export default ScoreCard;
