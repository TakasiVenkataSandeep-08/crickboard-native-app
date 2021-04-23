import * as React from "react";
import LoginScreen from "./Containers/Login";
import SignupScreen from "./Containers/SignUp";
import DashboardScreen from "./Containers/Dashboard";
import MatchDetailScreen from "./Containers/MatchDetail";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import VerifyScreen from "./Containers/VerifyUser";
import QuickMatchScreen from "./Containers/QuickMatch";
import AdminDashboardScreen from "./Containers/AdminDashboard";
import MySubscriptionScreen from "./Containers/SubscribedMatches";
import RespondToChallengeScreen from "./Containers/RespondToChallenge";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import ChallengeAccepted from "./Containers/ChallengeAccepted";
import AxiosContext from "../src/context/axios";
import { apiCalls } from "crickboardapi";
import { Icon } from "native-base";
import useAsyncStorage from "./customHooks/useAsyncStorage";
import ChallengeMatchScreen from "./Containers/ChallengeMatch";
import { prefix } from "./Constants/linkingConstants";
import Todo from "../src/Containers/Todo";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const App = () => {
  const [showHeader, setShowHeader] = React.useState(true);
  const axios = React.useContext(AxiosContext);
  const { userLogout } = apiCalls(axios);
  const config = {
    screens: {
      MatchDetail: "Match/:id",
      Home: "Home",
      Dashboard: "Dashboard",
      Login: "Login",
      Signup: "Signup",
    },
  };

  const linking = {
    prefixes: prefix,
    config: {
      Home: "Home",
      Dashboard: {
        screens: {
          MatchDetail: {
            path: "Match/:id",
            params: {
              id: null,
            },
          },
          VerifyUser: {
            path: "VerifyUser/:id",
            params: {
              id: null,
            },
          },
          Challenge: {
            path: "Respond/challenge/:id/:teamName/:teamAId/:teamBId",
            params: {
              id: null,
              teamName: null,
              teamAId: null,
              teamBId: null,
            },
          },
          ChallengeAccepted: {
            path:
              "Challenge/callback/:matchId/:teamAName/:teamBName/:teamAId/:teamBId",
            params: {
              matchId: null,
              teamAId: null,
              teamBId: null,
              teamAName: null,
              teamBName: null,
            },
          },
        },
      },
      Login: "Login",
      MySubscriptions: "MySubscriptions",
      Signup: "Signup",
    },
  };
  const [loggedinUser, setLoggedinUser, userHydrated] = useAsyncStorage(
    "user",
    {}
  );
  const [
    loginAuthenticated,
    setLoginAuthenticated,
    authHydrated,
  ] = useAsyncStorage("loginAuthenticated", false);
  const handleLogout = async (navigation) => {
    const response = await userLogout();
    await setLoggedinUser({});
    await setLoginAuthenticated(false);
    alert("logged out");
    navigation.navigate("Dashboard");
  };

  const LoginScreenWithProps = ({ navigation }) => (
    <LoginScreen
      setLoggedinUser={setLoggedinUser}
      setLoginAuthenticated={setLoginAuthenticated}
      loggedinUser={loggedinUser}
      navigation={navigation}
      setShowHeader={setShowHeader}
    />
  );
  const SignupScreenWithProps = ({ navigation }) => (
    <SignupScreen navigation={navigation} setShowHeader={setShowHeader} />
  );

  const DashboardHomeScreenWithProps = ({ navigation, route }) => (
    <DashboardScreen
      navigation={navigation}
      {...(route && { route: route })}
      setShowHeader={setShowHeader}
      loggedinUser={loggedinUser}
      setLoggedinUser={setLoggedinUser}
      setLoginAuthenticated={setLoginAuthenticated}
    />
  );

  const DashboardMatchDetailScreenWithProps = ({ navigation, route }) => (
    <MatchDetailScreen
      loggedinUser={loggedinUser}
      navigation={navigation}
      route={route}
      setShowHeader={setShowHeader}
      setLoggedinUser={setLoggedinUser}
      setLoginAuthenticated={setLoginAuthenticated}
    />
  );

  const AdminDashboardScreenWithProps = ({ navigation, route }) => {
    return (
      <AdminDashboardScreen
        navigation={navigation}
        id={route.params.id}
        loggedinUser={loggedinUser}
        setLoggedinUser={setLoggedinUser}
        setLoginAuthenticated={setLoginAuthenticated}
      />
    );
  };

  const VerifyUserScreenWithProps = ({ navigation, route }) => {
    return (
      <VerifyScreen
        navigation={navigation}
        id={route.params.id}
        setShowHeader={setShowHeader}
      />
    );
  };

  const RespondToChallengeScreenWithProps = ({ navigation, route }) => {
    return (
      <RespondToChallengeScreen
        loggedinUser={loggedinUser}
        navigation={navigation}
        id={route.params.id}
        teamName={route.params.teamName}
        teamAId={route.params.teamAId}
        teamBId={route.params.teamBId}
        setShowHeader={setShowHeader}
      />
    );
  };

  const TossProcessScreenWithProps = ({ navigation, route }) => (
    <ChallengeAccepted
      setShowHeader={setShowHeader}
      navigation={navigation}
      teamAId={route.params.teamAId}
      teamBId={route.params.teamBId}
      teamAName={route.params.teamAName}
      teamBName={route.params.teamBName}
      matchId={route.params.matchId}
      route={route}
      loggedinUser={loggedinUser}
    />
  );

  const QuickMatchScreenWithProps = ({ navigation }) => (
    <QuickMatchScreen
      navigation={navigation}
      setShowHeader={setShowHeader}
      loginAuthenticated={loginAuthenticated}
      loggedinUser={loggedinUser}
      setLoggedinUser={setLoggedinUser}
      setLoginAuthenticated={setLoginAuthenticated}
    />
  );

  const MySubscriptionScreenWithProps = ({ navigation, route }) => (
    <MySubscriptionScreen
      loggedinUser={loggedinUser}
      navigation={navigation}
      route={route}
      setShowHeader={setShowHeader}
      loginAuthenticated={loginAuthenticated}
    />
  );
  const ChallengeMatchScreenWithProps = ({ navigation }) => (
    <ChallengeMatchScreen
      setLoggedinUser={setLoggedinUser}
      loginAuthenticated={loginAuthenticated}
      setLoginAuthenticated={setLoginAuthenticated}
      loggedinUser={loggedinUser}
      navigation={navigation}
      setShowHeader={setShowHeader}
    />
  );

  function DashboardStackScreen({ navigation }) {
    return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={DashboardHomeScreenWithProps}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MatchDetail"
          component={DashboardMatchDetailScreenWithProps}
          options={{
            headerLeftContainerStyle: { marginLeft: 10 },
            headerLeft: () => (
              <Icon
                color="teal.400"
                type="Ionicons"
                name="home"
                onPress={() => {
                  setShowHeader(true);
                  navigation.navigate("Home");
                }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="AdminDashboard"
          component={AdminDashboardScreenWithProps}
          options={{
            headerLeftContainerStyle: { marginLeft: 10 },
            headerLeft: () => (
              <Icon
                color="teal.400"
                type="Ionicons"
                name="home"
                onPress={() => {
                  setShowHeader(true);
                  navigation.navigate("Home");
                }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="VerifyUser"
          component={VerifyUserScreenWithProps}
          options={{
            headerLeftContainerStyle: { marginLeft: 10 },
            headerLeft: () => (
              <Icon
                color="teal.400"
                type="Ionicons"
                name="home"
                onPress={() => {
                  setShowHeader(true);
                  navigation.navigate("Home");
                }}
              />
            ),
          }}
        />

        <Stack.Screen
          name="Challenge"
          component={RespondToChallengeScreenWithProps}
          options={{
            headerLeftContainerStyle: { marginLeft: 10 },
            headerLeft: () => (
              <Icon
                color="teal.400"
                type="Ionicons"
                name="home"
                onPress={() => {
                  setShowHeader(true);
                  navigation.navigate("Home");
                }}
              />
            ),
          }}
        />

        <Stack.Screen
          name="ChallengeAccepted"
          component={TossProcessScreenWithProps}
          options={{
            headerLeftContainerStyle: { marginLeft: 10 },
            headerLeft: () => (
              <Icon
                color="teal.400"
                type="Ionicons"
                name="home"
                onPress={() => {
                  setShowHeader(true);
                  navigation.navigate("Home");
                }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreenWithProps}
          options={{
            headerLeftContainerStyle: { marginLeft: 10 },
            headerLeft: () => (
              <Icon
                color="teal.400"
                type="Ionicons"
                name="home"
                onPress={() => {
                  setShowHeader(true);
                  navigation.navigate("Home");
                }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreenWithProps}
          options={{
            headerLeftContainerStyle: { marginLeft: 10 },
            headerLeft: () => (
              <Icon
                color="teal.400"
                type="Ionicons"
                name="home"
                onPress={() => {
                  setShowHeader(true);
                  navigation.navigate("Home");
                }}
              />
            ),
          }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer linking={linking}>
      <Drawer.Navigator
        drawerContentOptions={{ labelStyle: { color: "white", fontSize: 16 } }}
        drawerStyle={{ backgroundColor: "#183B59" }}
        initialRouteName="Dashboard"
        {...(loginAuthenticated && {
          drawerContent: (props) => {
            return (
              <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem
                  inactiveBackgroundColor="#f4511e"
                  labelStyle={{
                    alignSelf: "center",
                    color: "#f8f8ff",
                  }}
                  label="Logout"
                  onPress={() => handleLogout(props.navigation)}
                />
              </DrawerContentScrollView>
            );
          },
        })}
        {...(!loginAuthenticated && {
          drawerContent: (props) => {
            return (
              <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem
                  inactiveBackgroundColor="#0097a7"
                  labelStyle={{
                    alignSelf: "center",
                    color: "#f8f8ff",
                  }}
                  label="Login"
                  onPress={() => {
                    setShowHeader(false);
                    props.navigation.navigate("Login");
                  }}
                />
                <DrawerItem
                  inactiveBackgroundColor="#0097a7"
                  labelStyle={{
                    alignSelf: "center",
                    color: "#f8f8ff",
                  }}
                  label="Signup"
                  onPress={() => {
                    setShowHeader(false);
                    props.navigation.navigate("Signup");
                  }}
                />
              </DrawerContentScrollView>
            );
          },
        })}
      >
        <Drawer.Screen
          name="Dashboard"
          component={DashboardStackScreen}
          options={{
            drawerLabel: "Live Matches",
            headerShown: showHeader,
            headerTitle: "CrickBoard",
            headerTitleStyle: { color: "green", fontSize: 20 },

            drawerIcon: ({ focused }) => (
              <Icon
                type="Ionicons"
                name="home"
                size={7}
                color={focused ? "#E0EEEE" : "#f8f8ff"}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="MySubscriptions"
          component={MySubscriptionScreenWithProps}
          options={{
            headerTitle: "My Subscriptions",
            drawerLabel: "My Subscriptions",

            headerShown: true,
            drawerIcon: ({ focused }) => (
              <Icon
                type="Ionicons"
                name="bookmark"
                size={7}
                color={focused ? "#E0EEEE" : "#f8f8ff"}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="QuickMatch"
          component={QuickMatchScreenWithProps}
          options={{
            headerTitle: "Quick Match",
            drawerLabel: "Quick Match",

            headerShown: true,
            drawerIcon: ({ focused }) => (
              <Icon
                type="Ionicons"
                name="speedometer"
                size={7}
                color={focused ? "#E0EEEE" : "#f8f8ff"}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="ChallengeMatch"
          component={ChallengeMatchScreenWithProps}
          options={{
            headerTitle: "Challenge Match",
            drawerLabel: "Challenge Match",
            headerShown: true,
            drawerIcon: ({ focused }) => (
              <Icon
                type="Ionicons"
                name="trophy"
                size={7}
                color={focused ? "#E0EEEE" : "#f8f8ff"}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="todo"
          component={Todo}
          options={{
            headerTitle: "Geek Todos",
            drawerLabel: "Geek Todos",
            headerShown: true,
            drawerIcon: ({ focused }) => (
              <Icon
                type="Ionicons"
                name="trophy"
                size={7}
                color={focused ? "#E0EEEE" : "#f8f8ff"}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
