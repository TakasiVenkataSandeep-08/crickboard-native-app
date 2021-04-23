import * as React from "react";
import {
  Modal,
  Button,
  Center,
  Flex,
  Divider,
  Text,
  Heading,
  Select,
} from "native-base";
const OpeningModal = React.lazy(() =>
  import("../../Containers/Modals/Opening")
);
import SpinnerComponent from "../Spinner";
const TossModel = ({
  setShowHeader,
  navigation,
  isOpen,
  matchId,
  teams,
  handleClose,
  wonBy,
  decision,
  openingModal,
  setOpeningModal,
  tossResponse,
  handelTossUpdate,
  handleChangeOnDecision,
  handleChangeOnTeam,
}) => {
  return (
    <Flex>
      <Center>
        <Modal isCentered isOpen={isOpen} size="lg" onClose={handleClose}>
          <Modal.Overlay />
          <Modal.Content w="100%">
            <Modal.CloseButton />
            <Modal.Header fontSize="4xl" fontWeight="bold" p={4}>
              <Heading color="teal.600" shadow={2} textAlign="center">
                Match Toss
              </Heading>
            </Modal.Header>
            <Modal.Body>
              <Text bold fontSize="xl">
                Won By
              </Text>
              <Select
                variant="native"
                selectedValue={wonBy}
                minWidth={200}
                onValueChange={(itemValue) => handleChangeOnTeam(itemValue)}
                androidIconColor="gray.500"
                androidPrompt="Won by"
              >
                <Select.Item label={teams.TeamA} value={teams.TeamA} />
                <Select.Item label={teams.TeamB} value={teams.TeamB} />
              </Select>
              <Divider borderWidth={0.2} borderColor="gray" />
              <Text bold fontSize="xl" mt={4}>
                Elected To
              </Text>
              <Select
                variant="native"
                selectedValue={decision}
                minWidth={200}
                onValueChange={(itemValue) => handleChangeOnDecision(itemValue)}
                androidIconColor="gray.500"
                androidPrompt="Elected To"
              >
                <Select.Item label="BAT" value="BAT" />
                <Select.Item label="BOWL" value="BOWL" />
              </Select>
              <Divider borderWidth={0.2} borderColor="gray" />
            </Modal.Body>
            <Modal.Footer>
              <Button
                shadow={2}
                colorScheme="green"
                mr={2}
                onPress={handelTossUpdate}
              >
                Start Match
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>
      {Object.keys(tossResponse).length !== 0 ? (
        <React.Suspense fallback={<SpinnerComponent />}>
          <OpeningModal
            isOpen={openingModal}
            action={setOpeningModal}
            data={{
              battingTeam: tossResponse.currentBattingTeam,
              bowlingTeam: tossResponse.currentBowlingTeam,
            }}
            matchId={matchId}
            navigation={navigation}
            setShowHeader={setShowHeader}
          />
        </React.Suspense>
      ) : null}
    </Flex>
  );
};
export default TossModel;
