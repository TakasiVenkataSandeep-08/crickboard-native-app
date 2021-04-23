import { Flex, Button, Box, Text } from "native-base";
import React from "react";

function index({ headingText, buttonDetails, loading }) {
  return (
    <Flex
      mt="40px"
      p="10px"
      w="100%"
      h="100%"
      justify="flex-start"
      align="center"
    >
      <Box shadow={true} backgroundColor="teal.100" p="15px" height="25%">
        <Text fontSize="16px" color="indigo.400">
          Note: {headingText}
        </Text>
        <Flex mt="10px" justify="space-around" align="center">
          {buttonDetails.map((button, index) => (
            <Button
              key={index}
              isLoading={loading}
              isLoadingText="submitting..."
              isDisabled={loading}
              mt="16px"
              colorScheme={index === 0 ? "blue" : "red"}
              variant="solid"
              onPress={button.handler}
            >
              {button.name}
            </Button>
          ))}
        </Flex>
      </Box>
    </Flex>
  );
}

export default index;
