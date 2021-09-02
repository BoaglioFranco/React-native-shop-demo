import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Button, Divider } from "@ui-kitten/components";
import React, { useContext } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { AuthContext } from "../Context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

interface Props extends DrawerContentComponentProps {}

const DrawerContent: React.FC<Props> = (props) => {
  const authCtx = useContext(AuthContext);

  const onLogOut = () =>{
    authCtx?.actions.logout();
  }

  return (
    <DrawerContentScrollView
      {...props}
      style={stl.scrollView}
      contentContainerStyle={stl.container}
    >
      <View>
        <View style={stl.user}>
          <View style={stl.circle}>
            <Text style={stl.circleText}>
              {authCtx?.loggedUser?.Username.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View>
            <Text style={stl.userName}>{authCtx?.loggedUser?.Username}</Text>
            <Text style={stl.email}>{authCtx?.loggedUser?.Email}</Text>
          </View>
        </View>
        <Divider />
        <DrawerItemList {...props} />
      </View>
      <Button
        style={stl.button}
        accessoryLeft={() => (
          <Ionicons name="md-exit-outline" size={24} color="#fff" />
        )}
        status="danger"
        onPress={onLogOut}
      >
        LOG OUT
      </Button>
    </DrawerContentScrollView>
  );
};  

const stl = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  scrollView: {
    paddingTop: 30,
  },
  user: {
    flexDirection: "row",
    marginHorizontal: 12,
    marginBottom: 16,
    alignItems: "center",
  },
  userName: {
    fontWeight: "bold",
  },
  email: {
    opacity: 0.6,
  },
  circle: {
    width: 60,
    height: 60,
    margin: 10,
    marginBottom: 5,
    marginLeft: 0,
    borderRadius: 30,
    backgroundColor: "#84A9FF",
    alignItems: "center",
    justifyContent: "center",
  },
  circleText: {
    fontWeight: "bold",
    color: "#fff",
  },
  button: {
    marginHorizontal: 30,
    marginBottom: 20,
  },
});

export default DrawerContent;
