import React from "react";
import ScorecardComponent from "../../../Components/Scorecard";
import { socket } from "../../../socket";
import SpinnerComponent from "../../../Components/Spinner";
import AxiosContext from "../../../context/axios";
import { apiCalls } from "crickboardapi";
import {
  BALL_UPDATED,
  JOIN_MATCH,
  LEAVE_MATCH,
  NEW_BATSMANN,
  NEW_BOWLER,
} from "../../../Constants/socketEvents";
const Scorecard = ({ data, matchId }) => {
  const axios = React.useContext(AxiosContext);

  const { getScoreCard } = apiCalls(axios);
  const [scoreCard, setScoreCard] = React.useState();

  React.useEffect(() => {
    socket.emit(JOIN_MATCH, matchId);
    let mounted = true;
    const getFullScoreCard = async () => {
      const CData = await getScoreCard(
        matchId,
        data.battingTeam.id,
        data.bowlingTeam.id,
        data.matchData.current_innings
      );
      if (!mounted) {
        return;
      }
      setScoreCard(CData.data);
    };
    getFullScoreCard();
    return () => {
      socket.emit(LEAVE_MATCH, matchId);
      mounted = false;
    };
  }, [
    data.battingTeam.id,
    data.bowlingTeam.id,
    data.matchData.current_innings,
    matchId,
  ]);

  React.useEffect(() => {
    socket.on(BALL_UPDATED, (newData) => {
      setScoreCard((prevData) => {
        return updateScoreCard(prevData, data, newData);
      });
    });

    socket.on(NEW_BOWLER, (newData) => {
      if (data.matchData.current_innings === 1) {
        setScoreCard((prevData) => {
          const newStateData = { ...prevData };
          newStateData.Innings[0].bowling.push(newData);
          return newStateData;
        });
      } else {
        setScoreCard((prevData) => {
          const newStateData = { ...prevData };
          newStateData.Innings[1].bowling.push(newData);
          return newStateData;
        });
      }
    });
    socket.on(NEW_BATSMANN, (newData) => {
      if (data.matchData.current_innings === 1) {
        setScoreCard((prevData) => {
          const newStateData = { ...prevData };
          newStateData.Innings[0].batting.push(newData);
          return newStateData;
        });
      } else {
        setScoreCard((prevData) => {
          const newStateData = { ...prevData };
          newStateData.Innings[1].batting.push(newData);
          return newStateData;
        });
      }
    });
  }, [data]);
  if (data && scoreCard) {
    return (
      <ScorecardComponent matchId={matchId} data={data} scoreCard={scoreCard} />
    );
  } else {
    return <SpinnerComponent />;
  }
};

export default Scorecard;
