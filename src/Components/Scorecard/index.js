import React from "react";
import { Accordion, Box, Flex, Text, Divider } from "native-base";
import { ScrollView } from "react-native";
import { computeExtras } from "../../utils/getBallsInfo";
import { getRunRate } from "../../utils/getRunRate";
function Scorecard({ data, scoreCard }) {
  let inng2Balls;
  let inng1Balls;
  let extras1;
  let extras2;
  let wicketstr1;
  let wicketstr2;
  if (data.matchData.current_innings === 2) {
    inng2Balls = computeExtras(scoreCard.secondInningsHighlights);
    extras2 = `(nb-${inng2Balls.noBall},wd-${inng2Balls.wide},b-${inng2Balls.byes},lb-${inng2Balls.legByes})`;
    wicketstr2 = `(${inng2Balls.fallOfWickets.length} wickets)`;
  }
  inng1Balls = computeExtras(scoreCard.firstInningsHighlights);
  extras1 = `(nb-${inng1Balls.noBall},wd-${inng1Balls.wide},b-${inng1Balls.byes},lb-${inng1Balls.legByes})`;
  wicketstr1 = `(${inng1Balls.fallOfWickets.length} wickets)`;
  return (
    <ScrollView>
      <Flex w="100%" h="100%" justify="center" align="center">
        {scoreCard.Innings.map((inng, key) => {
          const wickets = (inng.innings === 1 ? inng1Balls : inng2Balls)
            .fallOfWickets;
          return (
            <Box key={key}>
              <Accordion border="0.2px solid gray" index={[0]}>
                <Accordion.Item>
                  <Accordion.Summary
                    _expanded={{
                      backgroundColor: "white",
                    }}
                  >
                    <Box>
                      <Text>Innings {inng.innings}</Text>
                    </Box>
                    <Accordion.Icon />
                  </Accordion.Summary>
                  <Accordion.Details p={0}>
                    <>
                      <Flex
                        w="100%"
                        h="10"
                        direction="row"
                        bg="#061D42"
                        borderRadius="5"
                        shadow={4}
                      >
                        {["Batting", "R", "B", "4s", "6s", "SR"].map(
                          (field, index) => {
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
                          }
                        )}
                      </Flex>
                      {inng.batting
                        .filter(function (player) {
                          return player.out_summary !== "Yet to bat";
                        })
                        .map((row, index) => (
                          <React.Fragment key={index}>
                            <Flex w="100%" h="10" direction="row" p={2}>
                              {[
                                row.player_name,
                                row.runs,
                                row.balls_faced,
                                row.fours,
                                row.sixs,
                                row.balls_faced === 0
                                  ? "0.00"
                                  : (row.runs / row.balls_faced).toFixed(2) *
                                    100,
                              ].map((field, index) => {
                                return index === 0 ? (
                                  <React.Fragment key={index}>
                                    <Box width="40%" height="10">
                                      <Text fontSize="md">{field}</Text>
                                      <Text fontSize={12} color="grey">
                                        {row.out_summary}
                                      </Text>
                                    </Box>
                                  </React.Fragment>
                                ) : (
                                  <Box height="10" width="12%">
                                    <Text textAlign="center">{field}</Text>
                                  </Box>
                                );
                              })}
                            </Flex>
                            <Divider mt={2} borderWidth={0.3} />
                          </React.Fragment>
                        ))}
                      <Flex
                        w="100%"
                        h="10"
                        direction="row"
                        p={2}
                        bg="lightgray"
                      >
                        <Box width="40%" height="10">
                          <Text>EXTRAS</Text>
                        </Box>
                        {[
                          inng.innings === 1 ? extras1 : extras2,
                          inng.innings === 1
                            ? inng1Balls.totalExtras
                            : inng2Balls.totalExtras,
                        ].map((field, index) => {
                          return (
                            <Box
                              key={index}
                              height="10"
                              width={index === 0 ? "40%" : "20%"}
                            >
                              <Text textAlign="center">
                                {index !== 2 ? field : ""}
                              </Text>
                            </Box>
                          );
                        })}
                      </Flex>
                      <Flex
                        w="100%"
                        h="10"
                        direction="row"
                        p={2}
                        bg="#05695A"
                        color="#fff"
                      >
                        <Box width="40%" height="10">
                          <Text color="white">TOTAL</Text>
                        </Box>
                        {[
                          inng.innings === 1 ? wicketstr1 : wicketstr2,
                          inng.innings === 1
                            ? data.matchData.current_innings === 1
                              ? data.matchData.score
                              : data.matchData.team_a_score
                            : data.matchData.score,
                        ].map((field, index) => {
                          return (
                            <Box
                              key={index}
                              height="10"
                              width={index === 0 ? "40%" : "20%"}
                            >
                              <Text color="white" textAlign="center">
                                {field}
                              </Text>
                            </Box>
                          );
                        })}
                      </Flex>
                      <Flex
                        w="100%"
                        h="10"
                        direction="row"
                        bg="#061D42"
                        borderRadius="5"
                        mt={2}
                        shadow={4}
                      >
                        {["Bowling", "O", "R", "W", "Ext", "Eco"].map(
                          (field, index) => {
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
                          }
                        )}
                      </Flex>
                      {inng.bowling.map((row, index) =>
                        row.overs_bowled !== 0 ? (
                          <React.Fragment>
                            <Flex
                              key={index}
                              w="100%"
                              h="10"
                              direction="row"
                              p={2}
                            >
                              {[
                                row.player_name,
                                row.overs_bowled,
                                row.runs_given,
                                row.wickets,
                                row.extras,
                                getRunRate(row.runs_given, row.overs_bowled),
                              ].map((field, index) => {
                                return index === 0 ? (
                                  <React.Fragment key={index}>
                                    <Box width="40%" height="10">
                                      <Text fontSize="md">{field}</Text>
                                    </Box>
                                  </React.Fragment>
                                ) : (
                                  <Box key={index} height="10" width="12%">
                                    <Text textAlign="center">{field}</Text>
                                  </Box>
                                );
                              })}
                            </Flex>
                            <Divider mt={2} borderWidth={0.3} />
                          </React.Fragment>
                        ) : null
                      )}
                      <Flex
                        w="100%"
                        h="10"
                        direction="row"
                        p={3}
                        bg="#DD2C03"
                        color="#fff"
                        shadow={4}
                      >
                        {["Fall Of Wickets", "Score", "Over"].map(
                          (field, index) => {
                            return (
                              <Box
                                key={index}
                                width={index === 0 ? "50%" : "25%"}
                                height="10"
                              >
                                <Text color="white" bold>
                                  {field}
                                </Text>
                              </Box>
                            );
                          }
                        )}
                      </Flex>
                      {wickets.length !== 0 ? (
                        wickets.map((ball, key, array) => {
                          let scoreSummary = ball.score_summary.split(",");
                          return (
                            <Flex
                              key={key}
                              w="100%"
                              h="10"
                              direction="row"
                              p={2}
                            >
                              <Box width="50%" height="10">
                                <Text>{scoreSummary[1]}</Text>
                              </Box>
                              <Box width="25%" height="10">
                                <Text>{scoreSummary[0]}</Text>
                              </Box>
                              <Box width="25%" height="10">
                                <Text>{ball.ball_number}</Text>
                              </Box>
                            </Flex>
                          );
                        })
                      ) : (
                        <Flex
                          key={key}
                          w="100%"
                          h="10"
                          justify="center"
                          direction="row"
                          p={2}
                        >
                          <Text>No wickets</Text>
                        </Flex>
                      )}
                    </>
                  </Accordion.Details>
                </Accordion.Item>
              </Accordion>
            </Box>
          );
        })}
      </Flex>
    </ScrollView>
  );
}

export default Scorecard;
