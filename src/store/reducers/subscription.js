import {
  SUBSCRIBE_MATCH,
  DELETE_SUBSCRIPTION,
  SAVE_SUBSCRIPTIONS,
} from "../constants";

const subscription = (state = [], action) => {
  switch (action.type) {
    case SUBSCRIBE_MATCH:
      return [...state, action.payload];
    case DELETE_SUBSCRIPTION: {
      let newState = [...state];
      return newState.filter(
        (subscription) => subscription.id !== action.payload
      );
    }
    case SAVE_SUBSCRIPTIONS: {
      return action.payload;
    }
    default:
      return state;
  }
};

export default subscription;
