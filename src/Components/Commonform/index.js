import React from "react";
import Snackbar from "../Snackbar";
import { Button, Input, Avatar, Heading, Flex, Box } from "native-base";
function CommonForm({
  formDetails,
  heading,
  buttonName,
  onFormSubmit,
  control,
  Controller,
  snackbarData,
  setSnackbarData,
  loading,
}) {
  return (
    <>
      <Flex backgroundColor="#ffffff" w="100%" h="100%" py="20px" px="10px">
        {snackbarData.visible && (
          <Flex marginTop={5}>
            <Snackbar
              setSnackbarData={setSnackbarData}
              snackbarData={snackbarData}
              handleCloseSnackbar={() =>
                setSnackbarData({ visible: false, message: "", color: "black" })
              }
            />
          </Flex>
        )}
        <Avatar
          mb="10px"
          alignSelf="center"
          name="C B"
          source={{
            uri: "https://img.icons8.com/color/2x/security-checked--v2.gif",
          }}
          backgroundColor="blue.400"
          size="md"
        />
        <Heading mb="10px" alignSelf="center" size="lg" color="blue.400">
          {heading}
        </Heading>
        {formDetails.map((detail, index) => {
          return (
            <Box key={index}>
              <Controller
                control={control}
                defaultValue=""
                name={detail.name}
                rules={detail.rules}
                render={({ onChange, onBlur, value }) => (
                  <Input
                    placeholder={detail.label}
                    mb="20px"
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
            </Box>
          );
        })}
        <Button
          isLoading={loading}
          color="black"
          isLoadingText={
            buttonName === "login" ? "logging in..." : "signing up..."
          }
          mt="10px"
          colorScheme="blue"
          mode="contained"
          onPress={onFormSubmit}
        >
          {buttonName}
        </Button>
      </Flex>
    </>
  );
}

export default CommonForm;
