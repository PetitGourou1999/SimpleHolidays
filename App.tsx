import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import React from "react";
import { useColorScheme } from "react-native";
import DrawerNavigator from "./navigation/DrawerNavigator";

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <DrawerNavigator />
    </NavigationContainer>
  );
}
