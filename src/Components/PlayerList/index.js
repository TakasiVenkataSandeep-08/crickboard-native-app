import { Box, Button, Checkbox, Circle, Text } from "native-base";
import React from "react";
import { View } from "react-native";
import AddPlayerModal from "../../Containers/Modals/AddPlayer";
import SpinnerComponent from "../Spinner";
import getAvatar from "../../utils/createAvatar";

function index({ teamId, players, setPlayers, setChecked }) {
  const [openAddPlayer, setOpenAddPlayer] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [isInitializationDone, setIsInitializationDone] = React.useState(false);
  React.useEffect(() => {
    if (players.length <= 11) {
      let idArray = [];
      players.map((player) => {
        idArray.push(player.id);
      });
      if (idArray.length !== 0) {
        setOptions(idArray);
        setChecked(players);
      }
      setIsInitializationDone(true);
    } else {
      let idArray = [];
      let defaultCheckedPlayers = [];
      players.map((player, index) => {
        if (index <= 10) {
          idArray.push(player.id);
          defaultCheckedPlayers.push(player);
        }
      });
      if (idArray.length !== 0) {
        setOptions(idArray);
        setChecked(defaultCheckedPlayers);
      }
      setIsInitializationDone(true);
    }
  }, []);
  if (isInitializationDone) {
    return (
      <View display="flex" justifyContent="center" alignItems="center">
        <Box w="98%">
          <Button
            onPress={() => setOpenAddPlayer(true)}
            colorScheme="orange"
            w="100%"
            shadow={4}
          >
            + Add Player
          </Button>
        </Box>
        <Checkbox.Group
          defaultValue={options}
          w="100%"
          bg="#f8f8ff"
          p={5}
          colorScheme="green"
          onChange={(player) => {
            setChecked(players.filter((item) => player.includes(item.id)));
            setOptions(player);
          }}
        >
          {players.map((player, index) => {
            return (
              <React.Fragment key={index}>
                <Checkbox
                  w="100%"
                  flexDirection="row-reverse"
                  mb={5}
                  value={player.id}
                  size="lg"
                >
                  <Text w="70%" fontSize="18px" mx={2}>
                    {player.player_name}
                  </Text>
                  <Circle mr={3} shadow={2} size={12} bg="red.200">
                    <Text>{getAvatar(player.player_name)}</Text>
                  </Circle>
                </Checkbox>
              </React.Fragment>
            );
          })}
        </Checkbox.Group>
        {openAddPlayer && (
          <AddPlayerModal
            teamId={teamId}
            open={openAddPlayer}
            setOpen={setOpenAddPlayer}
            setPlayers={setPlayers}
          />
        )}
      </View>
    );
  } else {
    return <SpinnerComponent />;
  }
}

export default index;
