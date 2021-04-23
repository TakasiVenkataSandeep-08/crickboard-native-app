import React, { useState, useEffect } from "react";
import MatchCard from "../../Components/MatchCard";
import { useCrickStore } from "../../store";
import { Flex, Heading } from "native-base";
import Spinner from "../../Components/Spinner";
import { socket } from "../../socket";
import {
  BALL_UPDATED,
  JOIN_MATCH,
  LEAVE_MATCH,
  LIVE_MATCHES_ROOM,
  MATCH_CREATED,
  TOSS_UPDATED,
} from "../../Constants/socketEvents";
import AxiosContext from "../../context/axios";
import { apiCalls } from "crickboardapi";
const Dashboard = ({
  route,
  navigation,
  filter = false,
  setShowHeader,
  loggedinUser,
  setLoggedinUser,
  setLoginAuthenticated,
}) => {
  const axios = React.useContext(AxiosContext);

  const { getAllMatchData } = apiCalls(axios);
  const [matches, setMatches] = useState();
  const [loading, setLoading] = useState(false);
  const { subscriptions } = useCrickStore();
  const [blink, setBlink] = useState([]);

  useEffect(() => {
    if (!filter) {
      setShowHeader(true);
    }
  }, []);

  useEffect(() => {
    socket.emit(JOIN_MATCH, LIVE_MATCHES_ROOM);
    let mounted = true;
    const initializeDashboard = async () => {
      setLoading(true);
      const matchesData = await getAllMatchData();
      if (!mounted) {
        setLoading(false);
        return;
      }

      setMatches(matchesData.data);
      setLoading(false);
    };
    initializeDashboard();
    if (new Date(loggedinUser.expiredDate) <= new Date()) {
      setLoggedinUser({});
      setLoginAuthenticated(false);
    }
    return () => {
      socket.emit(LEAVE_MATCH, LIVE_MATCHES_ROOM);
      mounted = false;
    };
  }, [loggedinUser.expiredDate]);

  useEffect(() => {
    socket.on(BALL_UPDATED, (data) => {
      setBlink((prevState) => {
        const newBlinkState = !blink.includes(data.matchId)
          ? [...prevState, data.matchId]
          : blink;

        return newBlinkState;
      });
      setMatches((prevMatches) => {
        const updatedMatchIndex = prevMatches.findIndex(
          (match) => match.matchId === data.matchId
        );
        const newMatches = [...prevMatches];
        newMatches[updatedMatchIndex] = {
          ...newMatches[updatedMatchIndex],
          ...data.matchData,
        };
        return newMatches;
      });

      setTimeout(function () {
        setBlink((prevState) => {
          const newState = prevState.filter((item) => item !== data.matchId);
          return newState;
        });
      }, 4000);
    });
    socket.on(MATCH_CREATED, (data) => {
      setMatches((prevMatches) => {
        const newMatches = [...prevMatches, data.matchData];
        return newMatches;
      });
    });
    socket.on(TOSS_UPDATED, (data) => {
      setMatches((prevMatches) => {
        const updatedMatchIndex = prevMatches.findIndex(
          (match) => match.matchId === data.matchId
        );
        const newMatches = [...prevMatches];
        newMatches[updatedMatchIndex] = {
          ...newMatches[updatedMatchIndex],
          result: data.result,
          toss: data.toss,
        };

        return newMatches;
      });
    });
  }, []);

  if (!loading && matches) {
    var filteredMatches = filter
      ? matches.filter((match) =>
          subscriptions.some((sub) => sub.matchId === match.matchId)
        )
      : matches;
    filteredMatches.sort((a, b) =>
      a.matchId > b.matchId ? -1 : b.matchId > a.matchId ? 1 : 0
    );
    if (filteredMatches.length !== 0) {
      return (
        <>
          <MatchCard
            route={route}
            blink={blink}
            filter={filter}
            navigation={navigation}
            matchesData={filteredMatches}
            loggedinUser={loggedinUser}
            setShowHeader={setShowHeader}
          />
        </>
      );
    } else {
      return (
        <Flex mt={5} w="100%" h="100%" justify="flex-start" align="center">
          <Heading color="orange.600">No Matches Found</Heading>
        </Flex>
      );
    }
  } else {
    return (
      <Flex w="100%" h="100%" mt={10} justify="flex-start" align="center">
        <Spinner />
      </Flex>
    );
  }
};
export default Dashboard;
