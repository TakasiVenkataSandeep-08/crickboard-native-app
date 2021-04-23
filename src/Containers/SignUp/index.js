import React from "react";
import CommonForm from "../../Components/Commonform";
import { useForm, Controller } from "react-hook-form";
import {
  emailFormValidator,
  textFormValidator,
  passwordFormValidator,
  confirmPasswordValidator,
} from "../../FormValidations";
import AxiosContext from "../../context/axios";
import { apiCalls } from "crickboardapi";
function Signup({ navigation, setShowHeader }) {
  const axios = React.useContext(AxiosContext);
  const { userSignup } = apiCalls(axios);
  React.useEffect(() => {
    setShowHeader(false);
    return () => {
      setShowHeader(true);
    };
  }, []);
  const [loading, setLoading] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [snackbarData, setSnackbarData] = React.useState({
    visible: false,
    message: "",
    color: "black",
  });
  const { control, errors, handleSubmit, getValues } = useForm({
    mode: "onChange",
  });

  const SignupFormDetails = [
    {
      name: "name",
      label: "User Name",
      rules: textFormValidator(),
      error: errors.name,
      helperText: errors.name ? errors.name.message : null,
    },
    {
      name: "email",
      type: "emailAddress",
      label: "Email Address",
      rules: emailFormValidator(),
      error: errors.email,
      helperText: errors.email ? errors.email.message : null,
    },

    {
      name: "password",
      label: "Password",
      type: "password",
      rules: passwordFormValidator(),
      error: errors.password,
      helperText: errors.password ? errors.password.message : null,
    },
    {
      name: "confirmPassword",
      label: "confirm Password",
      type: "password",
      rules: confirmPasswordValidator(getValues),
      error: errors.confirmPassword,
      helperText: errors.confirmPassword
        ? errors.confirmPassword.message
        : null,
    },
  ];
  const onSignupSubmit = async (data) => {
    setLoading(true);
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
      isNativeAppRequest: true,
    };
    await userSignup(userData);
    setLoading(false);
    alert("Verification Link Sent");
    navigation.navigate("Login");
  };
  return (
    <>
      <CommonForm
        loading={loading}
        snackbarData={snackbarData}
        setSnackbarData={setSnackbarData}
        Controller={Controller}
        formDetails={SignupFormDetails}
        control={control}
        heading={"Signup"}
        buttonName={"Signup"}
        onFormSubmit={handleSubmit(onSignupSubmit)}
      />
    </>
  );
}

export default Signup;
