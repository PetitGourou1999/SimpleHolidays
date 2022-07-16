import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import React from "react";
import { useColorScheme } from "react-native";
import DrawerNavigator from "./navigation/DrawerNavigator";

export default function App() {
  const colorScheme = useColorScheme();

  const customFonts = {
    WorkSans: require("./assets/fonts/WorkSans-Bold.ttf"),
    WorkSansRegular: require("./assets/fonts/WorkSans-Regular.ttf"),
  };

  const [isLoaded] = useFonts(customFonts);

  if (!isLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <DrawerNavigator />
    </NavigationContainer>
  );
}
