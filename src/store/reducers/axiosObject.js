import { CREATE_AXIOS_OBJECT } from "../constants";
const axiosObject = (state = {}, action) => {
  switch (action.type) {
    case CREATE_AXIOS_OBJECT:
      return action.payload;
    default:
      return state;
  }
};

export default axiosObject;
