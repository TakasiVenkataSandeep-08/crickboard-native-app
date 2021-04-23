import * as React from "react";
import {
  Modal,
  Button,
  Center,
  Flex,
  Divider,
  Text,
  Checkbox,
  Heading,
  Circle,
} from "native-base";
import getAvatar from "../../utils/createAvatar";
import { ScrollView } from "react-native-gesture-handler";

const OpeningModel = ({
  isOpen,
  data,
  teamsData,
  handleToggle,
  handleSubmit,
  handleClose,
  checkedBowler,
  checkedBatsman,
  handleBatsmanChange,
}) => {
  return (
    <Flex>
      <Center>
        <Modal
          isCentered
          isOpen={isOpen}
          size="lg"
          onClose={() => handleClose()}
        >
          <Modal.Overlay />
          <Modal.Content h="80%" w="100%">
            <Modal.CloseButton />
            <Modal.Header fontSize="2xl" fontWeight="bold" p={4}>
              Select Opening Players
              <Divider borderWidth={0.5} />
            </Modal.Header>
            <Modal.Body h="82%">
              <Heading size="md">Select Batsman</Heading>
              <ScrollView display="flex" justifyContent="space-between">
                <Checkbox.Group
                  colorScheme="green"
                  defaultValue={checkedBatsman}
                  onChange={(values) => {
                    handleBatsmanChange(values[values.length - 1]);
                  }}
                >
                  {teamsData.map((team) => {
                    if (team.teamId === data.battingTeam) {
                      return team.players.map((player) => {
                        return (
                          <Checkbox
                            w="100%"
                            flexDirection="row-reverse"
                            mt={5}
                            size="lg"
                            key={player.playerId}
                            checked={
                              checkedBatsman.indexOf(player.playerId) !== -1
                            }
                            value={player.playerId}
                          >
                            <Text w="70%" mx={2}>
                              {player.playerName}
                            </Text>
                            <Circle mr={3} shadow={2} size={7} bg="red.200">
                              <Text fontSize={10}>
                                {getAvatar(player.playerName)}
                              </Text>
                            </Circle>
                          </Checkbox>
                        );
                      });
                    }
                  })}
                </Checkbox.Group>
              </ScrollView>
              <Heading mt={5} size="md">
                Select Bowler
              </Heading>
              <ScrollView display="flex" justifyContent="space-between">
                <Checkbox.Group
                  colorScheme="green"
                  defaultValue={checkedBowler}
                  onChange={(values) => {
                    handleToggle(values[values.length - 1]);
                  }}
                >
                  {teamsData.map((team) => {
                    if (team.teamId === data.bowlingTeam) {
                      return team.players.map((player) => {
                        return (
                          <Checkbox
                            w="100%"
                            flexDirection="row-reverse"
                            mt={5}
                            size="lg"
                            key={player.playerId}
                            checked={
                              checkedBatsman.indexOf(player.playerId) !== -1
                            }
                            value={player.playerId}
                          >
                            <Text w="70%" mx={2}>
                              {player.playerName}
                            </Text>
                            <Circle mr={3} shadow={2} size={7} bg="red.200">
                              <Text fontSize={10}>
                                {getAvatar(player.playerName)}
                              </Text>
                            </Circle>
                          </Checkbox>
                        );
                      });
                    }
                  })}
                </Checkbox.Group>
              </ScrollView>
            </Modal.Body>
            <Modal.Footer>
              <Button colorScheme="blue" mr={1} onPress={() => handleSubmit()}>
                Save
              </Button>
              <Button colorScheme="red" onPress={() => handleClose()}>
                Close
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>
    </Flex>
  );
};

export default OpeningModel;
