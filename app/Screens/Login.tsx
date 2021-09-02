import { Button, Input, Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { Keyboard, StyleSheet, View } from "react-native";
import AndroidSafeArea from "../Components/AndroidSafeArea";
import * as Animatable from "react-native-animatable";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useEffect } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthParamList } from "../Navigation";
import { RouteProp, useRoute } from "@react-navigation/native";

type LoginRouteProp = RouteProp<AuthParamList, "Login">;
type LoginNavigationProp = StackNavigationProp<AuthParamList, "Login">;

interface Props {
  navigation: LoginNavigationProp;
  route: LoginRouteProp;
}

const Login: React.FC<Props> = ({ navigation, route }) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const authCtx = useContext(AuthContext);

  useEffect(() => { //If I get username via navigation params, set it as the input value
    if (route.params?.username) {
      setUsername(route.params?.username);
    }
  }, []);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const UserIconLeft = () => (
    <Ionicons name="person" size={24} color="#363770" />
  );

  const PasswordIconLeft = () => (
    <FontAwesome5 name="lock" size={24} color="#363770" />
  );

  const PasswordIconRight = () => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Ionicons
        size={24}
        name={secureTextEntry ? "eye-off" : "eye"}
        color="#363770"
      />
    </TouchableWithoutFeedback>
  );

  const login = () => {
    const authSuccessful = authCtx?.actions.login({
      Username: username,
      Password: password,
    });
    if (!authSuccessful) {
      setError(true);
    }
  };

  return (
    <AndroidSafeArea style={stl.background}>
      <View style={stl.space}>
        <Text category="h1" style={stl.text}>
          Welcome back
        </Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={stl.card} duration={1350}>
        <Input
          value={username}
          onFocus={() => setError(false)}
          onBlur={() => setError(false)}
          onChangeText={(e) => setUsername(e)}
          status={error ? "danger" : "basic"}
          style={stl.userInput}
          textStyle={{ color: "#363770" }}
          accessoryLeft={UserIconLeft}
          placeholder="Username"
        />
        <Input
          onFocus={() => setError(false)}
          onBlur={() => setError(false)}
          value={password}
          onChangeText={(e) => setPassword(e)}
          status={error ? "danger" : "basic"}
          style={stl.passwordInput}
          textStyle={{ color: "#363770" }}
          accessoryLeft={PasswordIconLeft}
          placeholder="Password"
          accessoryRight={PasswordIconRight}
          secureTextEntry={secureTextEntry}
        />
        <Text style={stl.errorText} category="s1">
          {error ? "Invalid credentials" : ""}
        </Text>
        <Button style={stl.buttonContainer} status="success" onPress={login}>
          LOG IN
        </Button>
      </Animatable.View>
    </AndroidSafeArea>
  );
};

const stl = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    padding: 45,
    paddingTop: 68,
    flex: 1,
  },
  background: {
    backgroundColor: "#3366FF",
  },
  space: {
    marginVertical: 65,
    marginLeft: 12,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
  userInput: {
    marginBottom: 24,
  },
  passwordInput: {
    marginBottom: 8,
  },
  buttonContainer: {
    marginTop: 80,
  },
  errorText: {
    color: "red",
  },
});

export default Login;
