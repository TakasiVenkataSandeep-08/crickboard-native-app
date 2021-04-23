import React from "react";
import { ScrollView, Text, Dimensions, Platform } from "react-native";
import LiveScoreCard from "../../Containers/MatchDetail/LiveScore";
import ScoreCard from "../../Containers/MatchDetail/Scorecard";
import Commentary from "../../Containers/MatchDetail/Commentary";
import Teams from "../../Containers/MatchDetail/Teams";
import { Box, Tabs, Flex, View, VStack, Spinner } from "native-base";
const TabComponent = ({ matchId, data }) => {
  if (data) {
    return (
      <ScrollView>
        <Flex w="100%" h="100%">
          <VStack space={4} width="100%">
            <View>
              <Box width="100%" bg="#fff" shadow={1} p={1}>
                <Tabs size="lg" isFitted>
                  <Tabs.Bar>
                    {["Live", "Scorecard", "Commentary", "Teams"].map(
                      (tabName, index) => (
                        <Tabs.Tab w="100%" key={index}>
                          {tabName}
                        </Tabs.Tab>
                      )
                    )}
                  </Tabs.Bar>
                  <Tabs.Views>
                    <Tabs.View>
                      <LiveScoreCard matchId={matchId} />
                    </Tabs.View>
                    <Tabs.View>
                      <ScoreCard matchId={matchId} data={data} />
                    </Tabs.View>
                    <Tabs.View>
                      <Commentary matchId={matchId} />
                    </Tabs.View>
                    <Tabs.View>
                      <Teams matchId={matchId} />
                    </Tabs.View>
                  </Tabs.Views>
                </Tabs>
              </Box>
            </View>
          </VStack>
        </Flex>
      </ScrollView>
    );
  } else {
    return <Spinner color="white" />;
  }
};
export default TabComponent;
