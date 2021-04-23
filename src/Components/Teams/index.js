import React from "react";
import { ScrollView } from "react-native";
import { List, Heading, Box, Flex, Avatar, Text } from "native-base";
import getAvatar from "../../utils/createAvatar";
const Teams = ({ teamsData }) => {
  return (
    <ScrollView>
      {teamsData.map((teamData, index) => (
        <Box key={index} shadow={2} key={teamData.teamId}>
          <Heading my={3} textAlign="center">
            {teamData.teamName}
          </Heading>
          <Box mt={2}>
            <List fontSize={22} spacing={12} color="#000">
              {teamData.players.map((player, index) => (
                <React.Fragment key={index}>
                  <List.Item my={3}>
                    <Avatar mx={3} fontSize={18} size={12} color="#fff">
                      {getAvatar(player.playerName)}
                    </Avatar>
                    <Flex ml={5} w="100%" direction="row">
                      <Box w="60%">
                        <Text ml={2} fontSize={18}>
                          {player.playerName}
                        </Text>
                      </Box>
                    </Flex>
                  </List.Item>
                </React.Fragment>
              ))}
            </List>
          </Box>
        </Box>
      ))}
    </ScrollView>
  );
};

export default Teams;
