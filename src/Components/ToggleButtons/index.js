import React from "react";
import {
  Flex,
  HStack,
  Text,
  Button,
  Stack,
  Heading,
  Divider,
} from "native-base";
function index({
  buttonGroupDetails,
  heading,
  buttonGroupState,
  handleToggleFunction,
  color = "blue",
  size = "sm",
  py = 0,
  px = 0,
}) {
  return (
    <Stack>
      <Flex w="100%" h="100px" justify="center" align="center">
        <Text fontSize="16px" color="green.900">
          {heading}
        </Text>

        <HStack spacing={0} mt={3}>
          {buttonGroupDetails.map((detail, index) => {
            return (
              <Button
                size={size}
                py={py}
                px={px}
                key={index}
                variant={
                  (detail.type ? detail.type : detail) === buttonGroupState
                    ? "solid"
                    : "outline"
                }
                onPress={() =>
                  handleToggleFunction(detail.type ? index : detail)
                }
                colorScheme={color}
              >
                <Text>{detail.type ? detail.type : detail}</Text>
              </Button>
            );
          })}
        </HStack>
      </Flex>
    </Stack>
  );
}

export default index;
