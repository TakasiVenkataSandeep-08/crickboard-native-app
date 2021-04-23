import React from "react";
import { Box, Input, Button, Text, Divider, Heading } from "native-base";
import { Platform, ScrollView, StyleSheet } from "react-native";
import PlayWithTeams from "./PlayWithTeams";
import DateTimePicker from "@react-native-community/datetimepicker";
function Index({
  teams,
  setTeams,
  teamA,
  loading,
  setTeamA,
  teamB,
  setTeamB,
  formFieldDetails,
  Controller,
  control,
  onFormSubmit,
  teamAPlayers,
  setTeamAPlayers,
  teamBPlayers,
  setTeamBPlayers,
  loggedinUser,
  date,
  setDate,
}) {
  const [mode, setMode] = React.useState("date");
  const [show, setShow] = React.useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    if (mode === "date") {
      showTimepicker();
    }
  };

  const showMode = (currentMode) => {
    setMode(currentMode);
    setShow(true);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const handleIosPickerCLose = () => {
    setShow(false);
  };
  return (
    <>
      <Divider mt="1px" borderColor="gray.500" />
      <Heading py={3} bg="#f8f8ff" textAlign="center" color="teal.500">
        Challenge Match
      </Heading>
      <Divider borderColor="gray.500" />
      <ScrollView style={styles.container}>
        <PlayWithTeams
          setTeams={setTeams}
          teams={teams.filter((team) => team.ownerId === loggedinUser.userId)}
          disable={teamB}
          teamData={teamA}
          setTeamData={setTeamA}
          teamPlayers={teamAPlayers}
          setTeamPlayers={setTeamAPlayers}
        />
        <PlayWithTeams
          setTeams={setTeams}
          teams={teams}
          teamData={teamB}
          setTeamData={setTeamB}
          teamPlayers={teamBPlayers}
          disable={teamA}
          setTeamPlayers={setTeamBPlayers}
        />
        {formFieldDetails.map((formDetails, outerIndex) => (
          <Box p={1} key={outerIndex} w="100%" bg="#f8f8ff">
            {formDetails.map((detail, innerIndex) => (
              <Controller
                key={innerIndex}
                control={control}
                defaultValue=""
                name={detail.name}
                rules={detail.rules}
                render={({ onChange, onBlur, value }) => (
                  <Input
                    mt={3}
                    borderColor="teal.400"
                    placeholderTextColor="black"
                    placeholder={detail.label}
                    variant="outline"
                    mb="15px"
                    value={value}
                    onBlur={onBlur}
                    {...(detail.type && { type: detail.type })}
                    autoCapitalize="none"
                    onChangeText={(value) => onChange(value)}
                    isInvalid={detail.error}
                    errorMessage={detail.helperText}
                  />
                )}
              />
            ))}
          </Box>
        ))}
        <Box p={1} w="100%" bg="#f8f8ff">
          {show ? (
            <Box>
              {" "}
              <DateTimePicker
                style={styles.datePicker}
                display={Platform.OS === "ios" ? "spinner" : "default"}
                minimumDate={new Date()}
                value={date}
                onChange={onChangeDate}
                mode={mode}
              />
              {Platform.OS === "ios" && (
                <Box
                  w="100%"
                  bg="#f8f8ff"
                  flexDirection="row"
                  justifyContent="flex-end"
                >
                  <Button mr={2} bg="#f8f8ff" onPress={handleIosPickerCLose}>
                    <Text fontWeight="bold" color="red.800">
                      Close
                    </Text>
                  </Button>
                  <Button
                    mr={2}
                    bg="#f8f8ff"
                    onPress={mode === "date" ? showTimepicker : showDatepicker}
                  >
                    <Text fontWeight="bold" color="blue.800">
                      {mode === "date" ? "Next" : "Prev"}
                    </Text>
                  </Button>
                </Box>
              )}
            </Box>
          ) : null}
          <Input
            borderColor="teal.400"
            mb={3}
            isReadOnly={true}
            value={date.toDateString() + ", " + date.toLocaleTimeString()}
          />
          <Button colorScheme="teal" shadow={2} mb={3} onPress={showDatepicker}>
            Pick A Date
          </Button>
        </Box>
      </ScrollView>
      <Box bg="#f8f8ff" py={2}>
        {" "}
        <Button
          shadow={2}
          isLoading={loading}
          color="black"
          isLoadingText="creating match.."
          isDisabled={loading}
          mt="10px"
          mb="10px"
          width="100%"
          colorScheme="yellow"
          mode="contained"
          onPress={onFormSubmit}
        >
          Create Match
        </Button>
      </Box>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f8ff",
  },
  datePicker: {
    flex: 1,
    backgroundColor: "#f8f8ff",
  },
});
export default Index;
