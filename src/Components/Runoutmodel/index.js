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
} from "native-base";
import SpinnerComponent from "../Spinner";

const PlayerModel = ({
  isOpen,
  liveData,
  checked,
  handleSubmit,
  handleClose,
  teamsData,
  setChecked,
}) => {
  if (teamsData && liveData && liveData.batting) {
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
            <Modal.Content w="100%">
              <Modal.CloseButton />
              <Modal.Header fontSize="2xl" fontWeight="bold" p={4}>
                <Text>Select Out Bastman</Text>
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
                    {liveData.batting.map((player, index) => {
                      return (
                        <React.Fragment key={index}>
                          <Checkbox
                            isChecked={player.playerId === checked[0]}
                            value={player.playerId}
                          >
                            <Text mx={2}>{player.player_name}</Text>
                          </Checkbox>
                        </React.Fragment>
                      );
                    })}
                  </Checkbox.Group>
                </View>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  colorScheme="blue"
                  mr={1}
                  onPress={() => handleSubmit()}
                >
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
  } else {
    return <SpinnerComponent />;
  }
};

export default PlayerModel;
