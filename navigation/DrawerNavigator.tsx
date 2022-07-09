import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import Colors from "../constants/Colors";
import MealsScreen from "../screens/MealsScreen";
import MiscellaneousScreen from "../screens/MiscellaneousScreen";
import ResetScreen from "../screens/ResetScreen";
import { MainStackNavigator } from "./StackNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTintColor: Colors.light.quaternary,
        headerStyle: {
          backgroundColor: Colors.light.secondary,
        },
        drawerActiveBackgroundColor: Colors.light.quaternary,
        drawerActiveTintColor: Colors.light.secondary,
        drawerInactiveTintColor: Colors.light.primary,
        drawerContentStyle: { backgroundColor: Colors.light.background },
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
