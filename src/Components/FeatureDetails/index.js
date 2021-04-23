import React from "react";
import { Box, Button, Divider, Flex, Heading, Text } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import { Platform } from "react-native";

function index({ details, navigation, setShowHeader }) {
  return (
    <Box
      pt={10}
      px={3}
      bg="#4caf50"
      shadow={4}
      w="100%"
      h="95%"
      alignItems="center"
    >
      <Divider borderColor="#f8f8ff" />
      <Box
        bg="#689f38"
        w="90%"
        h="10%"
        flexDirection="row"
        justifyContent="space-around"
        alignItems="center"
      >
        <Divider borderColor="#f8f8ff" orientation="vertical" />
        <Heading
          style={{ color: "#ffe0b2" }}
          shadow={4}
          my={3}
          mx={Platform.OS == "ios" ? 1 : 7}
          fontSize={Platform.os === "ios" ? 42 : 40}
        >
          CrickBoard
        </Heading>
        <Divider borderColor="#f8f8ff" orientation="vertical" />
      </Box>
      <Divider borderColor="#f8f8ff" />
      <Box
        bg="#689f38"
        w="90%"
        h="70%"
        flexDirection="row"
        justifyContent="space-around"
        alignItems="center"
      >
        <Divider borderColor="#f8f8ff" orientation="vertical" />
        <Box
          w="60%"
          h="100%"
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Heading my={3} fontSize={25} color="white">
            Details
          </Heading>
          {details.map((detail, index) => (
            <Text key={index} my={3} fontSize={17} color="white">
              {detail}
            </Text>
          ))}
        </Box>
        <Divider borderColor="#f8f8ff" orientation="vertical" />
      </Box>
      <Divider borderColor="#f8f8ff" />
      <Box
        bg="#689f38"
        w="90%"
        h="10%"
        flexDirection="row"
        justifyContent="space-around"
        alignItems="center"
      >
        <Divider borderColor="#f8f8ff" orientation="vertical" />
        <Button
          mb={5}
          onPress={() => {
            navigation.navigate("Login");
            setShowHeader(false);
          }}
          color="white"
          w="100%"
          shadow={6}
          bg="#002884"
        >
          Login
        </Button>
        <Divider borderColor="#f8f8ff" orientation="vertical" />
      </Box>
      <Divider borderColor="#f8f8ff" />
    </Box>
  );
}

export default index;
