import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import HolidaysActivitiesScreen from "../screens/HolidaysActivitiesScreen";
import HolidaysMealsScreen from "../screens/HolidaysMealsScreen";
import HolidaysScreen from "../screens/HolidaysScreen";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Nos Vacances"
      screenOptions={{
        headerBackTitle: "Back",
      }}
    >
      <Stack.Screen name="Nos Vacances" component={HolidaysScreen} />
      <Stack.Screen name="Repas des Vacances" component={HolidaysMealsScreen} />
      <Stack.Screen
        name="Activités des Vacances"
        component={HolidaysActivitiesScreen}
      />
    </Stack.Navigator>
  );
};

export { MainStackNavigator };
