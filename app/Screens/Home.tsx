import React from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import AndroidSafeArea from "../Components/AndroidSafeArea";
import { Button, ButtonGroup, Text } from "@ui-kitten/components";
import { FontAwesome5 } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerParamList } from "./Drawer";
import * as Animatable from "react-native-animatable";
import { products } from "../models/products";
import ProductCard from "../Components/ProductCard";
import { useEffect } from "react";
import Toast from "react-native-toast-message";
import { useState } from "react";

type HomeNavigationProp = DrawerNavigationProp<DrawerParamList, "Home">;

interface Props {
  navigation: HomeNavigationProp;
}

const Home: React.FC<Props> = ({ navigation }) => {
  const [filter, setFilter] = useState<'tech' | 'home' | 'outdoors'>('tech');


  //filter to only show categorized products
  const filteredProducts = products.filter((p)=> p.category === filter);



  return (
    <AndroidSafeArea style={stl.container}>
      <Animatable.View style={stl.titleContainer} animation="fadeIn">
        <TouchableOpacity onPress={navigation.toggleDrawer}>
          <View style={stl.circle}>
            <FontAwesome5 name="bars" size={24} color="#fff" />
          </View>
        </TouchableOpacity>
        <Text style={stl.title} category="h1">
          Shopr
        </Text>
      </Animatable.View>
      <Text category="h3" style={stl.featuredText}>
        Featured Products:
      </Text>
      <ButtonGroup style={stl.buttonGroup} appearance="ghost">
        <Button onPress={()=> setFilter('tech')}>TECH</Button>
        <Button onPress={()=> setFilter('outdoors')}>OUTDOORS</Button>
        <Button onPress={()=> setFilter('home')}>HOME</Button>
      </ButtonGroup>
      <Animatable.View animation="fadeInUp" duration={1400} style={stl.list}>
        <FlatList
          data={filteredProducts}
          renderItem={(i) => <ProductCard product={i.item} />}
        />
      </Animatable.View>
    </AndroidSafeArea>
  );
};

const stl = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    marginBottom: 15,
  },
  circle: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: "#1939B7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 35,
  },
  title: {
    fontWeight: "bold",
    color: "#3366FF",
    fontSize: 50,
  },
  image: {
    width: 125,
    height: 125,
    resizeMode: "cover",
  },
  featuredText: {
    marginBottom: 10,
  },
  list: {
    flex: 1,
    marginBottom: 60
  },
  buttonGroup: {
    alignSelf: 'center',  
  },
});

export default Home;
