import React from "react";
import { configAxios } from "crickboardapi/axios";
export const axios = React.createContext(
  configAxios("https://crickboard.herokuapp.com/api")
);
export default axios;
