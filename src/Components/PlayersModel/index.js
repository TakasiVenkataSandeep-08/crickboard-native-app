import * as React from "react";
import {
  Modal,
  Button,
  Center,
  Flex,
  Divider,
  Text,
  Checkbox,
  View,
  Circle,
} from "native-base";
import getAvatar from "../../utils/createAvatar";

const PlayerModel = ({
  isOpen,
  data,
  liveData,
  checked,
  setChecked,
  handleSubmit,
  handleClose,
  teamsData,
  type,
}) => {
  return (
    <Flex>
      <Center>
        <Modal isCentered isOpen={isOpen} size="lg" onClose={handleClose}>
          <Modal.Overlay />
          <Modal.Content w="100%">
            <Modal.CloseButton />
            <Modal.Header fontSize="2xl" fontWeight="bold" p={4}>
              <Text>Select {type}</Text>
              <Divider borderWidth={0.5} />
            </Modal.Header>
            <Modal.Body>
              <View display="flex" justifyContent="space-between">
                <Checkbox.Group
                  colorScheme="green"
                  defaultValue={checked}
                  onChange={(values) => {
                    setChecked([values[values.length - 1]]);
                  }}
                >
                  {teamsData.map((team) => {
                    if (
                      team.teamId ===
                      (type === "Batsman" ? data.battingTeam : data.bowlingTeam)
                    ) {
                      return team.players.map((player, index) => {
                        return (
                          <React.Fragment key={index}>
                            <Checkbox
                              w="100%"
                              flexDirection="row-reverse"
                              mt={5}
                              size="lg"
                              isChecked={player.playerId === checked[0]}
                              isDisabled={
                                type === "Batsman"
                                  ? player.outSummary !== "Yet to bat" ||
                                    player.playerId === liveData.strickerId ||
                                    player.playerId === liveData.nonStrickerId
                                  : player.playerId === liveData.bowlerId
                              }
                              value={player.playerId}
                            >
                              <Text w="75%" mx={2}>
                                {player.playerName}
                              </Text>
                              <Circle mr={3} shadow={2} size={7} bg="red.200">
                                <Text fontSize={10}>
                                  {getAvatar(player.playerName)}
                                </Text>
                              </Circle>
                            </Checkbox>
                          </React.Fragment>
                        );
                      });
                    }
                  })}
                </Checkbox.Group>
              </View>
            </Modal.Body>
            <Modal.Footer>
              <Button colorScheme="blue" mr={1} onPress={() => handleSubmit()}>
                Save
              </Button>
              <Button
                colorScheme="red"
                onPress={() => {
                  handleClose();
                }}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>
    </Flex>
  );
};

export default PlayerModel;
