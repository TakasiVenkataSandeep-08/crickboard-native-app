import * as React from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Button,
  Center,
  Input,
  Flex,
  Divider,
  Text,
} from "native-base";

const TossModel = () => {
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <Flex>
      <Center>
        <Modal
          isCentered
          isOpen={modalVisible}
          size="lg"
          onClose={setModalVisible}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalHeader fontSize="4xl" fontWeight="bold" p={4}>
              Toss
              <Divider borderWidth={0.5} />
            </ModalHeader>
            <ModalBody>
              <Text bold fontSize="xl">
                Won By
              </Text>
              <Input mt={2} placeholder="Toss Won by" />
              <Text bold fontSize="xl" mt={4}>
                Elected To
              </Text>
              <Input mt={2} placeholder="Team Elected to" />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={1}>
                Save
              </Button>
              <Button
                colorScheme="red"
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Button
          shadow={4}
          colorScheme="blue"
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          Change Batsman
        </Button>
      </Center>
    </Flex>
  );
};

export default TossModel;
