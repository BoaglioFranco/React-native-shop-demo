import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import AndroidSafeArea from "../Components/AndroidSafeArea";
import { Button, Text } from "@ui-kitten/components";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthParamList } from "../Navigation";
import * as Animatable from 'react-native-animatable';

type IndexNavigationProp = StackNavigationProp<AuthParamList, "Index">;
interface Props {
  navigation: IndexNavigationProp;
}

const Index: React.FC<Props> = ({ navigation }) => {
  return (
    <AndroidSafeArea>
      <ImageBackground
        style={stl.image}
        source={require("../assets/background.jpg")}
      >
        <Animatable.View style={stl.headingContainer} animation="fadeInLeft">
          <Text style={stl.title}>Shopr</Text>
          <Text style={stl.text}>
            Shopping made <Text style={stl.highlight}>easy.</Text>
          </Text>
        </Animatable.View>
        <Animatable.View style={stl.buttonContainer} animation='fadeInUpBig'>
          <Button
            style={stl.button}
            status="primary"
            onPress={() => navigation.push("Login")}
          >
            Log In
          </Button>
          <Button status="success" onPress={() => navigation.push("Register")}>
            Sign Up
          </Button>
        </Animatable.View>
      </ImageBackground>
    </AndroidSafeArea>
  );
};

const stl = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    paddingHorizontal: 45,
    justifyContent: "space-between",
    backgroundColor: "rgba(256, 256, 256, 0.4)",
  },
  headingContainer: {
    marginTop: 60,
  },
  title: {
    fontSize: 65,
    fontFamily: "Roboto-bold",
    color: "#3366FF",
  },
  text: {
    fontFamily: "Roboto-bold",
    fontSize: 30,
  },
  highlight: {
    color: "#3366FF",
    fontFamily: "Roboto-bold",
    fontSize: 30,
  },
  button: {
    marginBottom: 16,
  },
  buttonContainer: {
    marginBottom: 70,
  },
});

export default Index;
