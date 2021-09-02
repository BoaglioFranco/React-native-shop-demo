import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import React from "react";
import Navigation from "./app/Navigation";
import { AuthContextProvider } from "./app/Context/AuthContext";
import Toast from 'react-native-toast-message';

export default function App() {
  let [fontsLoaded] = useFonts({
    "Roboto-bold": Roboto_700Bold,
    Roboto: Roboto_400Regular,
    "Roboto-medium": Roboto_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <>
    <ApplicationProvider {...eva} theme={eva.light}>
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </ApplicationProvider>
    <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
}
