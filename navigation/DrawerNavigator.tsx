import { createDrawerNavigator } from "@react-navigation/drawer";
import { useFonts } from "expo-font";
import React from "react";
import Colors from "../constants/Colors";
import MealsScreen from "../screens/MealsScreen";
import MiscellaneousScreen from "../screens/MiscellaneousScreen";
import ResetScreen from "../screens/ResetScreen";
import { MainStackNavigator } from "./StackNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const customFonts = {
    WorkSans: require("../assets/fonts/WorkSans-Bold.ttf"),
  };

  const [isLoaded] = useFonts(customFonts);

  return (
    <Drawer.Navigator
      screenOptions={{
        headerTintColor: Colors.light.white,
        headerStyle: {
          backgroundColor: Colors.light.primary,
          shadowColor: "transparent",
        },
        headerTitleStyle: {
          fontFamily: "WorkSans",
          fontSize: 18,
        },
        drawerActiveBackgroundColor: Colors.light.tertiary,
        drawerActiveTintColor: Colors.light.primary,
        drawerInactiveTintColor: Colors.light.primary,
        drawerContentStyle: { backgroundColor: Colors.light.white },
        drawerLabelStyle: { fontFamily: "WorkSans", fontSize: 18 },
      }}
    >
      <Drawer.Screen name="Vacances" component={MainStackNavigator} />
      <Drawer.Screen name="Idées Repas" component={MealsScreen} />
      <Drawer.Screen name="Trucs Utiles" component={MiscellaneousScreen} />
      <Drawer.Screen name="Reset" component={ResetScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
