import { useFonts, WorkSans_400Regular } from "@expo-google-fonts/work-sans";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import React from "react";
import { useColorScheme } from "react-native";
import DrawerNavigator from "./navigation/DrawerNavigator";

export default function App() {
  const colorScheme = useColorScheme();

  let [fontsLoaded] = useFonts({
    WorkSans_400Regular,
  });

  if (!fontsLoaded) {
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
