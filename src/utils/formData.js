import { numberValidator, textFormValidator } from "../FormValidations";

export function getFormDetails(errors) {
  const teamAFormDetails = [
    {
      name: "teamAName",
      type: "text",
      label: "Team A Name*",
      error: errors.teamAName,
      helperText: errors.teamAName ? errors.teamAName.message : null,
      rules: textFormValidator(),
      firstElement: true,
    },
    {
      name: "teamA.player1",
      type: "text",
      label: "Player 1*",
      error: errors.teamA && errors.teamA.player1,
      helperText:
        errors.teamA && errors.teamA.player1
          ? errors.teamA.player1.message
          : null,
      rules: textFormValidator(),
      firstElement: false,
    },
    {
      name: "teamA.player2",
      type: "text",
      label: "Player 2*",
      error: errors.teamA && errors.teamA.player2,
      helperText:
        errors.teamA && errors.teamA.player2
          ? errors.teamA.player2.message
          : null,
      rules: textFormValidator(),
      firstElement: false,
    },
    {
      name: "teamA.player3",
      type: "text",
      label: "Player 3*",
      error: errors.teamA && errors.teamA.player3,
      helperText:
        errors.teamA && errors.teamA.player3
          ? errors.teamA.player3.message
          : null,
      rules: textFormValidator(),
      firstElement: false,
    },
    {
      name: "teamA.player4",
      type: "text",
      label: "Player 4*",
      error: errors.teamA && errors.teamA.player4,
      helperText:
        errors.teamA && errors.teamA.player4
          ? errors.teamA.player4.message
          : null,
      rules: textFormValidator(),
      firstElement: false,
    },
    {
      name: "teamA.player5",
      type: "text",
      label: "Player 5*",
      error: errors.teamA && errors.teamA.player5,
      helperText:
        errors.teamA && errors.teamA.player5
          ? errors.teamA.player5.message
          : null,
      rules: textFormValidator(),
      firstElement: false,
    },
    {
      name: "teamA.player6",
      type: "text",
      label: "Player 6*",
      error: errors.teamA && errors.teamA.player6,
      helperText:
        errors.teamA && errors.teamA.player6
          ? errors.teamA.player6.message
          : null,
      rules: textFormValidator(),
      firstElement: false,
    },
    {
      name: "teamA.player7",
      type: "text",
      label: "Player 7*",
      error: errors.teamA && errors.teamA.player7,
      helperText:
        errors.teamA && errors.teamA.player7
          ? errors.teamA.player7.message
          : null,
      rules: textFormValidator(),
      firstElement: false,
    },
    {
      name: "teamA.player8",
      type: "text",
      label: "Player 8*",
      error: errors.teamA && errors.teamA.player8,
      helperText:
        errors.teamA && errors.teamA.player8
          ? errors.teamA.player8.message
          : null,
      rules: textFormValidator(),
    },
    {
      name: "teamA.player9",
      type: "text",
      label: "Player 9*",
      error: errors.teamA && errors.teamA.player9,
      helperText:
        errors.teamA && errors.teamA.player9
          ? errors.teamA.player9.message
          : null,
      rules: textFormValidator(),
      firstElement: false,
    },
    {
      name: "teamA.player10",
      type: "text",
      label: "Player 10*",
      error: errors.teamA && errors.teamA.player10,
      helperText:
        errors.teamA && errors.teamA.player10
          ? errors.teamA.player10.message
          : null,
      rules: textFormValidator(),
      firstElement: false,
    },
    {
      name: "teamA.player11",
      type: "text",
      label: "Player 11*",
      error: errors.teamA && errors.teamA.player11,
      helperText:
        errors.teamA && errors.teamA.player11
          ? errors.teamA.player11.message
          : null,
      rules: textFormValidator(),
      firstElement: false,
    },
    {
      name: "teamA.player12",
      type: "text",
      label: "Player 12",
      error: false,
      helperText: null,
      rules: null,
      firstElement: false,
    },
    {
      name: "teamA.player13",
      type: "text",
      label: "Player 13",
      error: false,
      helperText: null,
      rules: null,
      firstElement: false,
    },
    {
      name: "teamA.player14",
      type: "text",
      label: "Player 14",
      error: false,
      helperText: null,
      rules: null,
      firstElement: false,
    },
    {
      name: "teamA.player15",
      type: "text",
      label: "Player 15",
      error: false,
      helperText: null,
      rules: null,
      firstElement: false,
    },
  ];
  const teamBFormDetails = [
    {
      name: "teamBName",
      type: "text",
      label: "Team B Name*",
      error: errors.teamBName,
      helperText: errors.teamBName ? errors.teamBName.message : null,
      rules: textFormValidator(),
    },
    {
      name: "teamB.player1",
      type: "text",
      label: "Player 1*",
      error: errors.teamB && errors.teamB.player1,
      helperText:
        errors.teamB && errors.teamB.player1
          ? errors.teamB.player1.message
          : null,
      rules: textFormValidator(),
    },
    {
      name: "teamB.player2",
      type: "text",
      label: "Player 2*",
      error: errors.teamB && errors.teamB.player2,
      helperText:
        errors.teamB && errors.teamB.player2
          ? errors.teamB.player2.message
          : null,
      rules: textFormValidator(),
    },
    {
      name: "teamB.player3",
      type: "text",
      label: "Player 3*",
      error: errors.teamB && errors.teamB.player3,
      helperText:
        errors.teamB && errors.teamB.player3
          ? errors.teamB.player3.message
          : null,
      rules: textFormValidator(),
    },
    {
      name: "teamB.player4",
      type: "text",
      label: "Player 4*",
      error: errors.teamB && errors.teamB.player4,
      helperText:
        errors.teamB && errors.teamB.player4
          ? errors.teamB.player4.message
          : null,
      rules: textFormValidator(),
    },
    {
      name: "teamB.player5",
      type: "text",
      label: "Player 5*",
      error: errors.teamB && errors.teamB.player5,
      helperText:
        errors.teamB && errors.teamB.player5
          ? errors.teamB.player5.message
          : null,
      rules: textFormValidator(),
    },
    {
      name: "teamB.player6",
      type: "text",
      label: "Player 6*",
      error: errors.teamB && errors.teamB.player6,
      helperText:
        errors.teamB && errors.teamB.player6
          ? errors.teamB.player6.message
          : null,
      rules: textFormValidator(),
    },
    {
      name: "teamB.player7",
      type: "text",
      label: "Player 7*",
      error: errors.teamB && errors.teamB.player7,
      helperText:
        errors.teamB && errors.teamB.player7
          ? errors.teamB.player7.message
          : null,
      rules: textFormValidator(),
    },
    {
      name: "teamB.player8",
      type: "text",
      label: "Player 8*",
      error: errors.teamB && errors.teamB.player8,
      helperText:
        errors.teamB && errors.teamB.player8
          ? errors.teamB.player8.message
          : null,
      rules: textFormValidator(),
    },
    {
      name: "teamB.player9",
      type: "text",
      label: "Player 9*",
      error: errors.teamB && errors.teamB.player9,
      helperText:
        errors.teamB && errors.teamB.player9
          ? errors.teamB.player9.message
          : null,
      rules: textFormValidator(),
    },
    {
      name: "teamB.player10",
      type: "text",
      label: "Player 10*",
      error: errors.teamB && errors.teamB.player10,
      helperText:
        errors.teamB && errors.teamB.player10
          ? errors.teamB.player10.message
          : null,
      rules: textFormValidator(),
    },
    {
      name: "teamB.player11",
      type: "text",
      label: "Player 11*",
      error: errors.teamB && errors.teamB.player11,
      helperText:
        errors.teamB && errors.teamB.player11
          ? errors.teamB.player11.message
          : null,
      rules: textFormValidator(),
    },
    {
      name: "teamB.player12",
      type: "text",
      label: "Player 12",
      error: false,
      helperText: null,
      rules: null,
      firstElement: false,
    },
    {
      name: "teamB.player13",
      type: "text",
      label: "Player 13",
      error: false,
      helperText: null,
      rules: null,
      firstElement: false,
    },
    {
      name: "teamB.player14",
      type: "text",
      label: "Player 14",
      error: false,
      helperText: null,
      rules: null,
      firstElement: false,
    },
    {
      name: "teamB.player15",
      type: "text",
      label: "Player 15",
      error: false,
      helperText: null,
      rules: null,
      firstElement: false,
    },
  ];
  const matchFormDetails = [
    {
      name: "matchDetails.match_name",
      type: "text",
      label: "Match Name*",
      error: errors.matchDetails && errors.matchDetails.match_name,
      helperText:
        errors.matchDetails && errors.matchDetails.match_name
          ? errors.matchDetails.match_name.message
          : null,
      rules: textFormValidator(),
    },
    {
      name: "matchDetails.venue",
      type: "text",
      label: "Venue*",
      error: errors.matchDetails && errors.matchDetails.venue,
      helperText:
        errors.matchDetails && errors.matchDetails.venue
          ? errors.matchDetails.venue.message
          : null,
      rules: textFormValidator(),
    },
    {
      name: "matchDetails.max_overs",
      type: "number",
      label: "overs*",
      error: errors.matchDetails && errors.matchDetails.max_overs,
      helperText:
        errors.matchDetails && errors.matchDetails.max_overs
          ? errors.matchDetails.max_overs.message
          : null,
      rules: numberValidator(),
    },
  ];
  return [teamAFormDetails, teamBFormDetails, matchFormDetails];
}
