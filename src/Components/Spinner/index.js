import React from "react";
import { Spinner } from "native-base";
function index({ color = "blue.500", size = "lg" }) {
  return <Spinner mt={2} size={size} color={color} />;
}

export default index;
