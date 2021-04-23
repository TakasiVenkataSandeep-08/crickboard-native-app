import * as React from "react";
import { StyleSheet } from "react-native";
import { Snackbar, Box, View } from "native-base";
const SnackbarComponent = ({ snackbarData }) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: snackbarData.color,
      position: "absolute",
      bottom: 0,
    },
  });

  return (
    <View>
      <Snackbar duration={3000} offset={((x = 100), (y = 100))}>
        <Box p="10px" color="white" mt="4" bg={snackbarData.color} rounded="md">
          {snackbarData.message}
        </Box>
      </Snackbar>
    </View>
  );
};

export default SnackbarComponent;
