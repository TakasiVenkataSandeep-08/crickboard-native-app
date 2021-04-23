import React from "react";
import { Controller, useForm } from "react-hook-form";
import Modal from "../../../Components/AddModal";
import AxiosContext from "../../../context/axios";
import { apiCalls } from "crickboardapi";
import { textFormValidator } from "../../../FormValidations";
function Index({ teamId, setPlayers, open, setOpen }) {
  const axios = React.useContext(AxiosContext);

  const { addPlayer } = apiCalls(axios);
  const { control, handleSubmit, errors } = useForm({
    mode: "onChange",
  });
  const PlayerName = React.useRef({});
  const [snackBar, setSnackBar] = React.useState({
    value: false,
    message: "",
    type: "",
  });
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnSubmit = async (data) => {
    const playerData = {
      player_name: data.playerName,
      teamId: teamId,
    };
    const response = await addPlayer(playerData);
    setSnackBar({
      value: true,
      message: "Player Added Successfully",
      type: "green",
    });
    handleClose();
    setPlayers((oldList) => {
      const newPlayerList = [...oldList];
      newPlayerList.push({
        id: response.data.id,
        player_name: response.data.player_name,
        teamId: response.data.teamId,
      });
      return newPlayerList;
    });
  };

  const inputDetails = {
    name: "playerName",
    inputLabel: "Enter Player Name",
    placeholder: "Player Name",
    rules: textFormValidator(),
    error: errors.playerName,
    helperText: errors.playerName ? errors.playerName.message : null,
  };

  return (
    <Modal
      snackBar={snackBar}
      setSnackBar={setSnackBar}
      handleClose={handleClose}
      handleOpen={handleOpen}
      open={open}
      teamId={teamId}
      modalHeading={"Add Player Modal"}
      buttonText={"Add Player"}
      Controller={Controller}
      control={control}
      inputDetails={inputDetails}
      onFormSubmit={handleSubmit(handleOnSubmit)}
    />
  );
}

export default Index;
