import useAsyncStorage from "../../../customHooks/useAsyncStorage";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import Modal from "../../../Components/AddModal";
import { textFormValidator } from "../../../FormValidations";
import AxiosContext from "../../../context/axios";
import { apiCalls } from "crickboardapi";
function Index({ open, setOpen, setTeams }) {
  const axios = React.useContext(AxiosContext);

  const { createTeam } = apiCalls(axios);
  const TeamName = React.useRef({});
  const { control, handleSubmit, errors } = useForm({
    mode: "onChange",
  });
  const [user, setUser] = useAsyncStorage("user", {});
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
    const teamData = {
      team_name: data.teamName,
      ownerId: user.userId,
    };
    const response = await createTeam(teamData);
    setSnackBar({
      value: true,
      message: "Team Created Successfully",
      type: "green",
    });

    setTeams((oldList) => {
      const newTeamList = [...oldList];
      newTeamList.push({
        id: response.data.id,
        team_name: response.data.team_name,
        ownerId: user.userId,
      });
      return newTeamList;
    });
    handleClose();
  };

  const inputDetails = {
    name: "teamName",
    inputLabel: "Enter Team Name",
    placeholder: "Team Name",
    rules: textFormValidator(),
    error: errors.teamName,
    helperText: errors.teamName ? errors.teamName.message : null,
  };

  return (
    <Modal
      snackBar={snackBar}
      setSnackBar={setSnackBar}
      handleClose={handleClose}
      handleOpen={handleOpen}
      open={open}
      inputDetails={inputDetails}
      modalHeading={"Add Team Modal"}
      buttonText={"Add Team"}
      Controller={Controller}
      control={control}
      inputDetails={inputDetails}
      onFormSubmit={handleSubmit(handleOnSubmit)}
    />
  );
}

export default Index;
