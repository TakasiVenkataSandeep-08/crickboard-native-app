import React from "react";
import { ScrollView } from "react-native";
import Banner from "../../Components/Banner";
import Tabs from "../../Components/Tabs";
import { socket } from "../../socket";
import {
  BALL_UPDATED,
  CHANGE_INNINGS,
  JOIN_MATCH,
  LEAVE_MATCH,
} from "../../Constants/socketEvents";
import AxiosContext from "../../context/axios";
import { apiCalls } from "crickboardapi";
const MatchDetail = ({
  navigation,
  route,
  matchId,
  loggedinUser,
  setLoggedinUser,
  setLoginAuthenticated,
  setShowHeader,
}) => {
  const axios = React.useContext(AxiosContext);

  const { checkMatchAdmin, getMatchData } = apiCalls(axios);
  const [matchData, setMatchData] = React.useState();
  const [isAdmin, setIsAdmin] = React.useState(false);
  React.useEffect(() => {
    setShowHeader(false);
    return () => {
      setShowHeader(true);
    };
  }, []);
  React.useEffect(() => {
    socket.emit(JOIN_MATCH, matchId);
    let mounted = true;
    const getData = async () => {
      const matchId = route.params.id;
      const MatchData = await getMatchData(route.params.id);
      if (!mounted) {
        return;
      } else {
        if (Object.keys(loggedinUser).length !== 0) {
          const response = await checkMatchAdmin(matchId, loggedinUser.userId);
          setIsAdmin(response);
        }
        setMatchData(MatchData.data);
      }
    };
    if (new Date(loggedinUser.expiredDate) <= new Date()) {
      setLoggedinUser({});
      setLoginAuthenticated(false);
    }

    getData();

    return () => {
      mounted = false;
      socket.emit(LEAVE_MATCH, matchId);
    };
  }, [route.params.id]);
  React.useEffect(() => {
    socket.on(BALL_UPDATED, (data) => {
      setMatchData((prevData) => {
        const updatedData = { ...prevData };
        updatedData.matchData = { ...updatedData.matchData, ...data.matchData };
        return updatedData;
      });
    });
    socket.on(CHANGE_INNINGS, (data) => {
      setMatchData((prevData) => {
        const updatedData = { ...prevData };
        updatedData.matchData = {
          ...updatedData.matchData,
          currentInnings: data,
        };
        return updatedData;
      });
    });
  }, []);
  return (
    <ScrollView>
      <Banner
        setShowHeader={setShowHeader}
        isAdmin={isAdmin}
        matchId={route.params.id}
        data={matchData}
        navigation={navigation}
      />
      <Tabs matchId={route.params.id} data={matchData} />
    </ScrollView>
  );
};

export default MatchDetail;
