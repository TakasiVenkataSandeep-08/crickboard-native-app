import "react-native-gesture-handler";
import React from "react";
import { AppRegistry } from "react-native";
import { NativeBaseProvider } from "native-base";
import Routers from "./src/Routers";
import { Provider } from "react-redux";
import ConfigureStore from "./src/store/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import AxiosContext from "./src/context/axios";
import { configAxios } from "crickboardapi/axios";
const Router = () => {
  const { store, persistor } = ConfigureStore();
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AxiosContext.Provider
            value={configAxios("https://crickboard.herokuapp.com/api")}
          >
            <Routers />
          </AxiosContext.Provider>
        </PersistGate>
      </Provider>
    </NativeBaseProvider>
  );
};
export default Router;
AppRegistry.registerComponent("Router", () => Router);
