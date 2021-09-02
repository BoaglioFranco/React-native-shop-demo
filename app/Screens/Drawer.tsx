import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { StyleSheet, View } from "react-native";
import DrawerContent from "../Components/DrawerContent";
import { PurchasesProvider } from "../Context/PurchasesContext";
import Home from "./Home";
import MyPurchases from "./MyPurchases";

interface Props {}

export type DrawerParamList = {
  Home: undefined;
};
const DrawerNav = createDrawerNavigator();

const Drawer: React.FC<Props> = (props) => {
  return (
    <PurchasesProvider>
      <DrawerNav.Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
      >
        <DrawerNav.Screen name="Home" component={Home} />
        <DrawerNav.Screen
          name="My Purchases"
          component={MyPurchases}
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: "#1939B7" },
            headerTintColor: "#fff",
          }}
        />
      </DrawerNav.Navigator>
    </PurchasesProvider>
  );
};

const stl = StyleSheet.create({});

export default Drawer;
