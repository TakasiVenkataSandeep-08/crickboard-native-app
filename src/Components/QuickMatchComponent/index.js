import { Flex, Heading, Divider, Box, Button, Input } from "native-base";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
function index({
  control,
  loading,
  formFieldDetails,
  onFormSubmit,
  Controller,
}) {
  return (
    <>
      <Divider shadow={2} mt={2} borderColor="gray" />
      <Heading textAlign="center" mt="10px" mb="10px" color="teal.500">
        Quick Match
      </Heading>
      <Divider shadow={2} borderColor="gray" />

      <ScrollView style={styles.container}>
        <Flex p="10px" bg="gray" w="100%" justify="flex-start" align="center">
          {formFieldDetails.map((formDetails, outerIndex1) => (
            <Box key={outerIndex1} w="100%" mt="23px">
              {formDetails.map((detail, innerIndex) => (
                <Controller
                  key={innerIndex}
                  control={control}
                  defaultValue=""
                  name={detail.name}
                  rules={detail.rules}
                  render={({ onChange, onBlur, value }) => (
                    <Input
                      color="black"
                      placeholderTextColor="black"
                      paddingX={2}
                      borderColor={"teal.500"}
                      placeholder={detail.label}
                      variant="rounded"
                      mb="15px"
                      value={value}
                      onBlur={onBlur}
                      {...(detail.type && { type: detail.type })}
                      autoCapitalize="none"
                      {...(detail.type === "password" && {
                        secureTextEntry: true,
                      })}
                      onChangeText={(value) => onChange(value)}
                      isInvalid={detail.error}
                      errorMessage={detail.helperText}
                    />
                  )}
                />
              ))}
            </Box>
          ))}
        </Flex>
      </ScrollView>

      <Box mb={3} py={2} px={3}>
        <Button
          shadow={2}
          isLoading={loading}
          color="black"
          isLoadingText="creating match.."
          isDisabled={loading}
          mt="10px"
          width="100%"
          colorScheme="teal"
          mode="contained"
          onPress={onFormSubmit}
        >
          Create Match
        </Button>
      </Box>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});

export default index;
