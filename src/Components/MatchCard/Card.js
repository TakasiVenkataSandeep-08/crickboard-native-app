import React from "react";
import {
  Flex,
  Text,
  Heading,
  Box,
  View,
  Badge,
  Avatar,
  Center,
  Icon,
  Divider,
} from "native-base";
import { TouchableOpacity } from "react-native";
import Clipboard from "expo-clipboard";
import getAvatar from "../../utils/createAvatar";
import moment from "moment";

function Card({
  match,
  goToMatchDetail,
  handleSubscribeChange,
  isSubscribed,
  blinkCard,
}) {
  const [isCopied, setIsCopied] = React.useState(false);

  const copyClipboard = () => {
    setIsCopied(true);
    Clipboard.setString(`crickboard://Match/${match.matchId}`);
    setTimeout(function () {
      setIsCopied(false);
    }, 4000);
  };

  const resetClipboard = () => {
    setIsCopied(false);
  };
  return (
    <>
      <View m={2}>
        <Box
          border={blinkCard ? "5px solid green" : "transparent"}
          borderRadius={15}
          width="100%"
          bg="#fff"
          p={4}
          shadow={4}
        >
          <TouchableOpacity
            {...(!(
              match.currentInnings === 1 &&
              match.result === "Match yet to start"
            ) && { onPress: () => goToMatchDetail(match.matchId) })}
          >
            <Heading mt={3} size="sm" textAlign="center">
              {match.result !== "Match yet to start"
                ? "Live Score: " + match.matchName
                : "Live At: " +
                  moment(match.startTime).format("MMMM Do YYYY, h:mm a")}
            </Heading>
            <Badge shadow={1} m={3} colorScheme="success" borderRadius="20">
              <Text textAlign="center" textTransform="none">
                {match.result === "Match yet to start"
                  ? "Venue: " + match.venue
                  : match.currentInnings === 1
                  ? match.toss
                  : parseFloat(match.max_overs.toString()) !==
                      parseFloat(match.overs.toString()) &&
                    match.wickets !== 10 &&
                    match.score < match.target
                  ? getAvatar(match.currentBattingTeam) +
                    " need " +
                    match.target +
                    " runs in " +
                    match.max_overs * 6 +
                    " balls to win"
                  : match.result}
              </Text>
            </Badge>

            <Flex direction="row" justifyContent="center">
              <Box
                width="25%"
                bg="#fff"
                px={1}
                color="#fff"
                alignContent="flex-end"
              >
                <Center>
                  <Avatar shadow={2} size="lg">
                    {getAvatar(match.teamOneName)}
                  </Avatar>
                </Center>
              </Box>
              <Box mt={4} width="50%" bg="#fff" px={2} textAlign="center">
                <Heading textAlign="center" size="lg" color="#EB4133">
                  VS
                </Heading>
                {match.result !== "Match yet to start" ? (
                  <>
                    <Text bold fontSize="md" textAlign="center">
                      Score: {match.score}/{match.wickets}
                    </Text>
                    <Text bold fontSize="md" textAlign="center">
                      Overs: {match.overs}/{match.max_overs}
                    </Text>
                  </>
                ) : null}
              </Box>
              <Box width="25%" bg="#fff" px={1} color="#fff">
                <Center>
                  <Avatar shadow={2} size="lg">
                    {getAvatar(match.teamTwoName)}
                  </Avatar>
                </Center>
              </Box>
            </Flex>
            <Divider shadow={1} border="0.3px solid gray" mt={4} />
          </TouchableOpacity>
          <Flex
            justify="space-between"
            align="center"
            direction="row"
            my={4}
            px={5}
          >
            {!isSubscribed.value ? (
              <Icon
                onPress={() => handleSubscribeChange()}
                type="Ionicons"
                name="heart-outline"
                size={7}
              />
            ) : (
              <Icon
                onPress={() => handleSubscribeChange()}
                color="red.400"
                type="Ionicons"
                name="heart"
                size={7}
              />
            )}
            {!isCopied ? (
              <Icon
                onPress={copyClipboard}
                type="Ionicons"
                name="copy-outline"
                size={7}
              />
            ) : (
              <>
                <Text color="green.700">copied</Text>
                <Icon
                  color="green.700"
                  onPress={resetClipboard}
                  type="Ionicons"
                  name="copy"
                  size={7}
                />
              </>
            )}
          </Flex>
        </Box>
      </View>
    </>
  );
}

export default Card;
