import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Index from "./Screens/Index";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
import Drawer from "./Screens/Drawer";

interface Props {
  isAuth?: boolean;
}

export type AuthParamList = {
  Index: undefined;
  Login: { username: string } | undefined;
  Register: undefined;
};

const AuthStack = createStackNavigator<AuthParamList>();
const HomeStack = createStackNavigator();

const Navigation: React.FC<Props> = (props) => {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx?.loggedUser && (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
          <AuthStack.Screen name="Index" component={Index}></AuthStack.Screen>
          <AuthStack.Screen name="Login" component={Login}></AuthStack.Screen>
          <AuthStack.Screen
            name="Register"
            component={Register}
            options={{
              headerShown: true,
              headerStyle: { backgroundColor: "#3366FF" },
              headerTintColor: "#fff",
            }}
          ></AuthStack.Screen>
        </AuthStack.Navigator>
      )}
      {authCtx?.loggedUser && (
        <HomeStack.Navigator screenOptions={{ headerShown: false }}>
          <HomeStack.Screen name="Drawer" component={Drawer}></HomeStack.Screen>
        </HomeStack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Navigation;
