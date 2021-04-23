import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import AsyncStorage from "@react-native-community/async-storage";
async function saveMatchId() {
  return await AsyncStorage.getItem("matchId");
}
const matchId = saveMatchId();
const persistConfig = {
  key: `match-${matchId}`,
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = createStore(persistedReducer, composeWithDevTools());
  let persistor = persistStore(store);
  return { store, persistor };
};
