import React from "react";
import {
  useTypeahead,
  Box,
  Input,
  Button,
  Text,
  Icon,
  IconButton,
} from "native-base";
import { ScrollView } from "react-native";
import PlayerList from "../../Containers/ChallengeMatch/playerList";
import AddTeamModal from "../../Containers/Modals/AddTeam";

function Index({
  teams,
  setTeams,
  teamData,
  setTeamData,
  teamPlayers,
  setTeamPlayers,
  disable,
}) {
  const [inputItems, setInputItems] = React.useState(teams);

  React.useEffect(() => {
    setInputItems(teams);
  }, [teams]);

  const [openAddTeam, setOpenAddTeam] = React.useState(false);

  const {
    isOpen,
    getInputProps,
    getMenuItemProps,
    getMenuProps,
    getToggleButtonProps,
  } = useTypeahead({
    items: inputItems,
    itemToString: (item) => item.team_name.toString(),
    onInputValueChange: ({ inputValue }) => {
      if (inputValue !== "") {
        setInputItems(
          teams.filter((item) =>
            item.team_name.toLowerCase().startsWith(inputValue.toLowerCase())
          )
        );
      } else {
        setInputItems(teams);
        setTeamData({});
      }
    },
    onSelectedItemChange: (item) => {
      setTeamData(item);
    },
  });
  return (
    <>
      <Box
        mt={4}
        px={1}
        bg="#f8f8ff"
        height={50}
        width="100%"
        flexDirection="row"
      >
        <Box flex={1} h="100px">
          <Input
            placeholderTextColor="black"
            borderColor="teal.500"
            placeholder="Enter Team Name*"
            isRequired={true}
            {...getInputProps()}
          />
        </Box>
        <Box h="100px">
          <IconButton
            shadow={2}
            h="67%"
            bg="teal.400"
            py="1px"
            {...getToggleButtonProps()}
            icon={
              isOpen ? (
                <Icon
                  color="#ffffff"
                  name="arrow-drop-up"
                  type="MaterialIcons"
                  size={12}
                />
              ) : (
                <Icon
                  color="#ffffff"
                  name="arrow-drop-down"
                  type="MaterialIcons"
                  size={12}
                />
              )
            }
          />
        </Box>
      </Box>
      {isOpen && (
        <Box
          bg="#f8f8ff"
          width="100%"
          minH="auto"
          maxHeight="160px"
          {...getMenuProps()}
        >
          {inputItems.length !== 0 ? (
            <ScrollView>
              {inputItems.map((item, index) => {
                if (JSON.stringify(item) !== JSON.stringify(disable)) {
                  return (
                    <Button
                      variant="outline"
                      bg="transparent"
                      key={`${item}${index}`}
                      {...getMenuItemProps(item, index)}
                    >
                      <Text>{item.team_name}</Text>
                    </Button>
                  );
                }
              })}
            </ScrollView>
          ) : (
            <Text fontSize="20px" textAlign="center" color="red.400">
              No Team Found
            </Text>
          )}
        </Box>
      )}

      <Box p={1} my={2}>
        {Object.keys(teamData).length === 0 && (
          <Button
            shadow={2}
            onPress={() => setOpenAddTeam(true)}
            colorScheme="teal"
          >
            + Add Team
          </Button>
        )}
      </Box>
      {Object.keys(teamData).length !== 0 && !isOpen && (
        <PlayerList
          teamId={teamData.id}
          teamPlayers={teamPlayers}
          setTeamPlayers={setTeamPlayers}
        />
      )}
      {openAddTeam && (
        <AddTeamModal
          open={openAddTeam}
          setOpen={setOpenAddTeam}
          setTeams={setTeams}
        />
      )}
    </>
  );
}
export default Index;
