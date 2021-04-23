import React from "react";
import TossModel from "../../../Components/TossModel";
import { socket } from "../../../socket";
import { TOSS_UPDATED } from "../../../Constants/socketEvents";
import OpeningModal from "../Opening";
import AxiosContext from "../../../context/axios";
import { apiCalls } from "crickboardapi";
const Toss = ({
  isOpen,
  action,
  matchId,
  teams,
  navigation,
  setShowHeader,
}) => {
  const axios = React.useContext(AxiosContext);

  const { updateToss } = apiCalls(axios);
  const [wonBy, setWonBy] = React.useState(false);
  const [decision, setDecision] = React.useState("");
  const [openingModal, setOpeningModal] = React.useState(false);
  const [tossResponse, setTossResponse] = React.useState({});

  const handleClose = () => {
    action(false);
  };
  const OpenOpeningModal = () => {
    setOpeningModal(true);
  };
  const handleChangeOnTeam = (value) => {
    setWonBy(value);
  };

  const handleChangeOnDecision = (value) => {
    setDecision(value);
  };

  const handelTossUpdate = async () => {
    const tossStatus = `${wonBy} won the toss and choose to ${decision}`;

    const result = "First Innings In Progress";
    try {
      const data = {
        matchDetails: {
          toss: tossStatus,
          result: result,
        },
        matchDataDetails: {
          current_batting_team:
            (teams.TeamA === wonBy && decision === "BAT") ||
            (teams.TeamB === wonBy && decision === "BOWL")
              ? teams.TeamAId
              : teams.TeamBId,
          current_bowling_team:
            (teams.TeamA === wonBy && decision === "BAT") ||
            (teams.TeamB === wonBy && decision === "BOWL")
              ? teams.TeamBId
              : teams.TeamAId,
        },
      };

      const response = await updateToss(data, matchId);
      socket.emit(TOSS_UPDATED, {
        matchId: matchId,
        result: result,
        toss: tossStatus,
      });
      OpenOpeningModal();
      setTossResponse(response.data);
      handleClose();
    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
      <TossModel
        matchId={matchId}
        openingModal={openingModal}
        setOpeningModal={setOpeningModal}
        isOpen={isOpen}
        teams={teams}
        decision={decision}
        handleChangeOnTeam={handleChangeOnTeam}
        handleChangeOnDecision={handleChangeOnDecision}
        handelTossUpdate={handelTossUpdate}
        tossResponse={tossResponse}
        wonBy={wonBy}
        action={action}
        handleClose={handleClose}
        navigation={navigation}
        setShowHeader={setShowHeader}
      />
      {Object.keys(tossResponse).length !== 0 ? (
        <OpeningModal
          isOpen={openingModal}
          action={setOpeningModal}
          data={{
            battingTeam: tossResponse.currentBattingTeam,
            bowlingTeam: tossResponse.currentBowlingTeam,
          }}
          matchId={matchId}
          navigation={navigation}
          setShowHeader={setShowHeader}
        />
      ) : null}
    </>
  );
};

export default Toss;
