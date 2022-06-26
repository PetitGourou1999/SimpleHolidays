import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import MealsScreen from "../screens/MealsScreen";
import MiscellaneousScreen from "../screens/MiscellaneousScreen";
import { MainStackNavigator } from "./StackNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Vacances" component={MainStackNavigator} />
      <Drawer.Screen name="Idées Repas" component={MealsScreen} />
      <Drawer.Screen name="Trucs Utiles" component={MiscellaneousScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
