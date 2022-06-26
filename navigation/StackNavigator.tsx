import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Colors from "../constants/Colors";

import HolidaysActivitiesScreen from "../screens/HolidaysActivitiesScreen";
import HolidaysMealsScreen from "../screens/HolidaysMealsScreen";
import HolidaysScreen from "../screens/HolidaysScreen";
import HolidaysSpendingsScreen from "../screens/HolidaysSpendingsScreen";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Nos Vacances"
      screenOptions={{
        headerBackTitle: "Back",
        headerTintColor: Colors.light.secondary,
        headerStyle: {
          backgroundColor: Colors.light.quaternary,
        },
      }}
    >
      <Stack.Screen name="Nos Vacances" component={HolidaysScreen} />
      <Stack.Screen name="Repas des Vacances" component={HolidaysMealsScreen} />
      <Stack.Screen
        name="Activités des Vacances"
        component={HolidaysActivitiesScreen}
      />
      <Stack.Screen
        name="Dépenses des Vacances"
        component={HolidaysSpendingsScreen}
      />
    </Stack.Navigator>
  );
};

export { MainStackNavigator };
