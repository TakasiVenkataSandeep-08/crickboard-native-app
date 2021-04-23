import React, { Suspense } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Divider,
  TextArea,
  Button,
  HStack,
} from "native-base";
import { ScrollView } from "react-native";
import LastTenBalls from "./LastTenBalls";
import ScoreCard from "./ScoreCard";
import SpinnerComponent from "../Spinner";
import ToggleButtons from "../ToggleButtons";
import { useForm, Controller } from "react-hook-form";
const BatsmanModal = React.lazy(() =>
  import("../../Containers/Modals/Batsman")
);
const BowlerModal = React.lazy(() => import("../../Containers/Modals/Bowler"));
const OpeningModal = React.lazy(() =>
  import("../../Containers/Modals/Opening")
);
const RunOutModal = React.lazy(() => import("../../Containers/Modals/Runout"));

function index({
  matchInfo,
  liveData,
  ballsData,
  matchId,
  setLiveData,
  OpenBatsmanModal,
  OpenBowlerModal,
  batsmanModal,
  bowlerModal,
  openingModal,
  runOutModal,
  endInnings,
  setOpeningModal,
  setBatsmanModal,
  setBowlerModal,
  setRunOutModal,
  changeBatsman,
  scoreUpdate,
  loading,
  wkt,
  handleWickets,
  wickets,
  xtra,
  handleExtras,

  Rns,
  handleRuns,
  runs,

  extraText,
  undo,
  setIsRunoutHandled,
  setWickets,
}) {
  const { control, handleSubmit } = useForm({
    mode: "onChange",
  });

  const handelOnchangeBatsman = async () => {
    await changeBatsman();
  };
  const handelUpdateScore = async (data) => {
    await scoreUpdate(data);
  };

  const handelOnEndInnings = (score) => {
    endInnings(score);
  };

  return (
    <>
      <Divider mt={1} borderColor="gray.500" />
      <Heading
        bg="white"
        textAlign="center"
        pt="10px"
        pb="10px"
        color="blue.400"
      >
        Admin Dashboard
      </Heading>
      <Divider borderColor="gray.500" />
      <ScrollView>
        <Flex
          w="100%"
          bg="#f8f8ff"
          h="100%"
          justify="flex-start"
          align="center"
        >
          <Flex
            p="5px"
            mt="10px"
            w="100%"
            h="80px"
            justify="space-between"
            align="flex-start"
          >
            <Text fontSize="16px" color="green.900">
              Match: {matchInfo.match_name}
            </Text>
            <Text color="blue.900">Venue: {matchInfo.venue}</Text>
            <Text color="orange.900">{matchInfo.toss}</Text>
          </Flex>
          <Divider mt="5px" borderColor="gray.500" />

          <LastTenBalls
            ballsInfo={ballsData}
            currentInnings={liveData.currentInnings}
          />

          <ScoreCard maxOvers={matchInfo.max_overs} liveInfo={liveData} />

          <Divider borderColor="gray.500" />

          <Flex
            p={4}
            w="100%"
            direction="row"
            justify="space-around"
            align="center"
          >
            <Button
              shadow={2}
              isDisabled={loading}
              onPress={() => handelOnchangeBatsman()}
              variant="solid"
              bg="#002884"
              color="white"
            >
              Change strike
            </Button>
            <Button
              shadow={2}
              isDisabled={loading}
              onPress={() => setBatsmanModal(true)}
              variant="solid"
              colorScheme="red"
            >
              Retired hurt
            </Button>
          </Flex>
          <Flex
            p={4}
            w="100%"
            direction="row"
            justify="space-around"
            align="center"
          >
            <Button
              shadow={2}
              isDisabled={loading}
              onPress={() => setBowlerModal(true)}
              variant="solid"
              bg="#002884"
              color="white"
            >
              Change bowler
            </Button>
            <Button
              shadow={2}
              isDisabled={loading}
              onPress={() => handelOnEndInnings(liveData.score)}
              variant="solid"
              colorScheme="red"
            >
              End innings
            </Button>
          </Flex>
          <Divider borderColor="gray.500" />
          <ToggleButtons
            size="md"
            buttonGroupDetails={Rns}
            heading="Runs"
            buttonGroupState={runs}
            handleToggleFunction={handleRuns}
          />
          <ToggleButtons
            size="md"
            color="yellow"
            buttonGroupDetails={xtra}
            heading="Extras"
            buttonGroupState={extraText}
            handleToggleFunction={handleExtras}
          />
          <ToggleButtons
            py={2}
            color="red"
            buttonGroupDetails={wkt}
            heading="Wickets"
            buttonGroupState={wickets}
            handleToggleFunction={handleWickets}
          />

          <Box px={4} w="100%">
            <Controller
              control={control}
              defaultValue=""
              name="commentry"
              render={({ onChange, onBlur, value }) => (
                <TextArea
                  borderColor="teal.700"
                  placeholder="commentry here..."
                  my="5px"
                  w="100%"
                  h="100px"
                  rule="none"
                  value={value}
                  onBlur={onBlur}
                  autoCapitalize="none"
                  onChangeText={(value) => onChange(value)}
                />
              )}
            />
          </Box>
        </Flex>
        <Suspense fallback={<SpinnerComponent />}>
          {batsmanModal && (
            <BatsmanModal
              isOpen={batsmanModal}
              action={setBatsmanModal}
              data={{
                battingTeam: liveData.battingTeam,
                bowlingTeam: liveData.bowlingTeam,
              }}
              liveData={liveData}
              setLive={setLiveData}
              matchId={matchId}
              wickets={wickets}
              OpenBowlerModal={OpenBowlerModal}
            />
          )}
          {bowlerModal && (
            <BowlerModal
              isOpen={bowlerModal}
              action={setBowlerModal}
              data={{
                battingTeam: liveData.battingTeam,
                bowlingTeam: liveData.bowlingTeam,
              }}
              liveData={liveData}
              setLive={setLiveData}
              matchId={matchId}
            />
          )}
          {runOutModal && (
            <RunOutModal
              isOpen={runOutModal}
              action={setRunOutModal}
              data={{
                battingTeam: liveData.battingTeam,
                bowlingTeam: liveData.bowlingTeam,
              }}
              matchId={matchId}
              liveData={liveData}
              setLive={setLiveData}
              batsmanModal={OpenBatsmanModal}
              setIsRunoutHandled={setIsRunoutHandled}
              setWickets={setWickets}
            />
          )}
          {openingModal && (
            <OpeningModal
              isOpen={openingModal}
              action={setOpeningModal}
              data={{
                battingTeam: liveData.battingTeam,
                bowlingTeam: liveData.bowlingTeam,
              }}
              matchId={matchId}
              liveData={liveData}
              setLiveData={setLiveData}
            />
          )}
        </Suspense>
      </ScrollView>
      <HStack
        bg="white"
        py={3}
        w="100%"
        display="flex"
        justifyContent="space-around"
      >
        <Button
          shadow={2}
          isDisabled={loading}
          isLoading={loading}
          isLoadingText="submitting..."
          onPress={handleSubmit(handelUpdateScore)}
          bg="#002884"
          color="white"
        >
          submit
        </Button>
        <Button
          shadow={2}
          isDisabled={loading}
          onPress={() => undo()}
          colorScheme="red"
        >
          undo
        </Button>
      </HStack>
    </>
  );
}

export default index;
