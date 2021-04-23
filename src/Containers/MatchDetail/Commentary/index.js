import React from "react";
import { Text } from "native-base";
import CommentaryComponent from "../../../Components/Commentary";
import { socket } from "../../../socket";
import SpinnerComponent from "../../../Components/Spinner";
import AxiosContext from "../../../context/axios";
import { apiCalls } from "crickboardapi";
import {
  BALL_UPDATED,
  JOIN_MATCH,
  LEAVE_MATCH,
} from "../../../Constants/socketEvents";
const Commentary = ({ matchId }) => {
  const axios = React.useContext(AxiosContext);

  const { getCommentary } = apiCalls(axios);

  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    socket.emit(JOIN_MATCH, matchId);
    let mounted = true;
    const getData = async () => {
      setLoading(true);
      const CommentaryData = await getCommentary(matchId);
      if (!mounted) {
        setLoading(false);
        return;
      }
      setData(CommentaryData.data);
      setLoading(false);
    };
    getData();
    return () => {
      mounted = false;
      socket.emit(LEAVE_MATCH, matchId);
    };
  }, [matchId]);
  React.useEffect(() => {
    socket.on(BALL_UPDATED, (newData) => {
      if (newData.ballData) {
        const { ballData } = newData;
        setData((prevData) => {
          const newData = [...prevData];
          newData.unshift({
            ball_summary: ballData.ball_summary,
            ball_number: ballData.ball_number,
            commentary: ballData.commentary,
            score_summary: ballData.score_summary,
            innings: ballData.innings,
          });
          return newData;
        });
      } else {
        setData((prevData) => {
          const newData = [...prevData];
          return newData.slice(1);
        });
      }
    });
  }, []);
  if (!loading) {
    if (data.length !== 0) {
      return <CommentaryComponent data={data} />;
    } else {
      return <Text>No Ball have been bowled yet</Text>;
    }
  } else {
    return <SpinnerComponent />;
  }
};

export default Commentary;
