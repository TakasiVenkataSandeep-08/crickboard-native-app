import { createSelector } from "reselect";
export const selectPrevScore = (state) => state.prevScore; //array of score from redux store
export const selectsubscriptions = (state) => state.subscriptions; //array of subscriptions from redux store

export const selectPreviousScore = createSelector(
  //reselect function to memoize the selectors
  selectPrevScore,
  (prevScore) => {
    return prevScore;
  }
);
export const allSubscriptions = createSelector(
  //reselect function to memoize the selectors
  selectsubscriptions,
  (subscriptions) => {
    return subscriptions;
  }
);
