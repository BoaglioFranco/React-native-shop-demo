import React from "react";
import { Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native";

interface Props {
  style?: any;
}

const AndroidSafeArea: React.FC<Props> = ({ style, children }) => {
  return (
    <SafeAreaView style={[stl.androidSafeArea, style]}>{children}</SafeAreaView>
  );
};

const stl = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default AndroidSafeArea;
