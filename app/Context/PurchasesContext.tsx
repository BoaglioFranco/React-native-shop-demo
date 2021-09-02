import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { useCallback } from "react";
import Toast from "react-native-toast-message";
import { Purchase } from "../models/Purchase";
import { AuthContext } from "./AuthContext";

export type PurchasesContextValue = {
  purchases: Purchase[];
  addPurchase: (purchase: any) => void;
};

export const PurchasesContext =
  React.createContext<PurchasesContextValue | null>(null);

export const PurchasesProvider: React.FC = (props) => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const authCtx = useContext(AuthContext);

  const loggedUser = authCtx?.loggedUser?.Username;

  useEffect(() => {
    const getPurchasesFromAsyncStorage = async () => {
      const value = await AsyncStorage.getItem(`@app_transactions_${loggedUser}`);
      if (value !== null) {
        setPurchases(JSON.parse(value));
      }
    };
    getPurchasesFromAsyncStorage();
  }, [authCtx?.loggedUser?.Username]);

  useEffect(() => {
    const saveToAsyncStorage = async () => {
      await AsyncStorage.setItem(
        `@app_transactions_${loggedUser}`,
        JSON.stringify(purchases)
      );
    };
    saveToAsyncStorage();
  }, [purchases, loggedUser]);

  const addPurchase = useCallback((product: any) => {
    const purchase: Purchase = {
      product,
      date: new Date(),
      buyer: authCtx!.loggedUser!.Username,
      key: Math.random().toString()
    };

    setPurchases([...purchases, purchase]);
    Toast.show({
      type: "success",
      position: "bottom",
      text1: "Purchase Successful",
      text2: `${product.name}`,
    });
  }, [purchases]);

  return (
    <PurchasesContext.Provider value={{ purchases, addPurchase }} {...props} />
  );
};
