import React from "react";
import CommonForm from "../../Components/Commonform";
import { useForm, Controller } from "react-hook-form";
import {
  emailFormValidator,
  passwordFormValidator,
} from "../../FormValidations";
import { addDays } from "../../utils/addDays";
import { useCrickStore } from "../../store";
import { useToast } from "native-base";
import AxiosContext from "../../context/axios";
import { apiCalls } from "crickboardapi";
const Login = ({
  navigation,
  setLoggedinUser,
  setLoginAuthenticated,

  setShowHeader,
}) => {
  const axios = React.useContext(AxiosContext);

  const { getSubscribedMatches, userLogin } = apiCalls(axios);
  React.useEffect(() => {
    setShowHeader(false);
    return () => {
      setShowHeader(true);
    };
  }, []);
  const [loading, setLoading] = React.useState(false);
  const setToast = useToast();
  const [snackbarData, setSnackbarData] = React.useState({
    visible: false,
    message: "",
    color: "black",
  });
  const { control, errors, handleSubmit } = useForm({
    mode: "onChange",
  });

  const { saveSubscription } = useCrickStore();
  const loginFormDetails = [
    {
      name: "email",
      type: "emailAddress",
      label: "Email Address",
      error: errors.email,
      rules: emailFormValidator(),
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
  ];
  const onLoginSubmit = async (data) => {
    setLoading(true);
    const email = data.email;
    const password = data.password;
    const userDetails = {
      email,
      password,
    };
    let userData = await userLogin(userDetails);
    if (userData.data) {
      let subscribedMatches = await getSubscribedMatches(userData.data.userId);
      saveSubscription(subscribedMatches.data);

      setToast({
        title: userData.message,
        duration: 1000,
        position: "center",
      });

      const date = new Date();
      await setLoggedinUser({
        userId: userData.data.userId,
        userName: userData.data.userName,
        expiredDate: addDays(date, 2),
      });
      await setLoginAuthenticated(true);

      navigation.navigate("Dashboard", {
        screen: "Home",
        params: {
          snackbarData: snackbarData,
          setSnackbarData: setSnackbarData,
        },
      });
      setShowHeader(true);
      //   setSnackbarData(true)
      setLoading(false);
    } else {
      // setSnackbarData({
      //   visible: true,
      //   message: userData.message,
      //   color: "red",
      // });
      setToast({
        title: userData.message,
        duration: 1000,
        position: "center",
      });

      setLoading(false);
    }
  };

  return (
    <>
      <CommonForm
        loading={loading}
        setSnackbarData={setSnackbarData}
        snackbarData={snackbarData}
        control={control}
        Controller={Controller}
        formDetails={loginFormDetails}
        heading={"Login"}
        buttonName={"login"}
        onFormSubmit={handleSubmit(onLoginSubmit)}
      />
    </>
  );
};

export default Login;
