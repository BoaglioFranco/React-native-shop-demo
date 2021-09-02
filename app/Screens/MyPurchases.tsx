import React from "react";
import { useContext } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { PurchasesContext } from "../Context/PurchasesContext";
import { Divider, Text } from "@ui-kitten/components";
import PurchasesTableRow from "../Components/PurchasesTableRow";

interface Props {}

const MyPurchases: React.FC<Props> = (props) => {
  const purchasesCtx = useContext(PurchasesContext);

  const totalSpent = purchasesCtx?.purchases.reduce(
    (c, p) => c + p.product.price,
    0
  );
  const totalTransactions = purchasesCtx?.purchases.length;
  return (
    <View style={stl.container}>
      {!!purchasesCtx?.purchases.length && (
        <View style={stl.header}>
          <Text category="h4" style={stl.t1}>
            Total Spent: ${`${totalSpent}`}
          </Text>
          <Text category="h4">Purchases Made: {`${totalTransactions}`}</Text>
        </View>
      )}
      <FlatList
        style={stl.list}
        data={purchasesCtx?.purchases}
        renderItem={(i) => <PurchasesTableRow purchase={i.item} />}
        ItemSeparatorComponent={() => <Divider style={stl.divider} />}
        ListEmptyComponent={() => (
          <Text style={stl.empty} category="c1">
            No purchases yet
          </Text>
        )}
      />
    </View>
  );
};

const stl = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    backgroundColor: "#F8F8F8",
    flex: 1,
    marginBottom: 40,
  },
  divider: {
    marginVertical: 6,
  },
  header: {
    marginTop: 30,
  },
  list: {
    marginTop: 30,
  },
  t1: {
    marginBottom: 16,
  },
  empty: {
    opacity: 0.6,
    textAlign: "center",
  },
});

export default MyPurchases;
