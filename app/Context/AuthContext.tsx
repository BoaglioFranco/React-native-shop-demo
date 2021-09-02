import React from "react";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, UserCredentials } from "../models/User";
import { useEffect } from "react";

type AuthContextValue = null | {
  loggedUser: User | null;
  actions: {
    login: (userInfo: UserCredentials) => boolean;
    logout: () => any;
    register: (newUser: User) => void;
    isUsernameAvailable: (newUser: User) => boolean;
  };
};

export const AuthContext = React.createContext<AuthContextValue>(null);

export const AuthContextProvider: React.FC = (props) => {
  const [loggedUser, setLoggedUser] = useState<null | User>(null);
  const [users, setUsers] = useState<User[]>([]); //obviously not viable in a real app.

  useEffect(() => {
    const getUsersFromAsyncStorage = async () => {
      const value = await AsyncStorage.getItem("@app_registered_users");
      if (value !== null) {
        setUsers(JSON.parse(value));
      }
    };
    const getLoggedUserFromAsyncStorage = async () => {
      const value = await AsyncStorage.getItem("@app_logged_user");
      if (value !== null) {
        setLoggedUser(JSON.parse(value));
      }
    };
    getUsersFromAsyncStorage();
    getLoggedUserFromAsyncStorage();
  }, []);

  useEffect(() => {
    const saveToAsyncStorage = async () => {
      await AsyncStorage.setItem("@app_registered_users", JSON.stringify(users));
      await AsyncStorage.setItem("@app_logged_user", JSON.stringify(loggedUser));
    };
    saveToAsyncStorage();
  }, [users, loggedUser]);

  const login = (userInfo: UserCredentials) => {
    const user = users.find(
      (u) =>
        u.Username === userInfo.Username && u.Password === userInfo.Password
    );
    if (user) {
      setLoggedUser(user);
      return true;
    } else {
      return false;
    }
  };

  const isUsernameAvailable = (newUser: User) => {
    const isTaken = users.some((u) => u.Username === newUser.Username);

    return !isTaken;
  };

  const register = (newUser: User) => {
    setUsers([...users, newUser]);
  };

  const logout = () => {
    setLoggedUser(null);
  };

  let value = {
    loggedUser,
    actions: {
      login,
      logout,
      register,
      isUsernameAvailable,
    },
  };

  console.log("RegisteredUsers", users);
  console.log("LoggedUser", loggedUser);

  return <AuthContext.Provider value={value} {...props} />;
};
