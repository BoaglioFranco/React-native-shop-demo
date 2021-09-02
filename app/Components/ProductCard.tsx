import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Text, Button } from "@ui-kitten/components";
import { Product } from "../models/products";
import { useContext } from "react";
import { PurchasesContext } from "../Context/PurchasesContext";

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const purchasesCtx = useContext(PurchasesContext);

  return (
    <View style={stl.container}>
      <View style={stl.textContainer}>
        <Text category="h6">{product.name}</Text>
        <Text category="h5" style={stl.price}>
          ${product.price}
        </Text>
        <Button
          style={stl.button}
          appearance="ghost"
          status="danger"
          onPress={()=> purchasesCtx?.addPurchase(product)}
        >
          BUY
        </Button>
      </View>
      <Image
        source={{
          uri: product.photo,
        }}
        style={stl.image}
      />
    </View>
  );
};

const stl = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 14,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.22,

    elevation: 4,
    // borderColor: "#F4F4F4",
    // borderWidth: 2
  },
  textContainer: {
    flex: 1,
  },
  image: {
    width: 110,
    height: 110,
    resizeMode: "cover",
  },
  price: {
    color: "#15801B",
    fontWeight: "bold",
    marginTop: 12,
  },
  button: {},
});

export default React.memo(ProductCard);
