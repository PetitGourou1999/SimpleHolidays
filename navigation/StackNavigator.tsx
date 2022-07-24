import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Colors from "../constants/Colors";

import HolidaysActivitiesScreen from "../screens/HolidaysActivitiesScreen";
import HolidaysGroceriesScreen from "../screens/HolidaysGroceriesScreen";
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
        headerTintColor: Colors.light.primary,
        headerStyle: {
          backgroundColor: Colors.light.white,
          shadowColor: "transparent",
        },
        headerTitleStyle: {
          fontFamily: "WorkSans",
          fontSize: 18,
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
      <Stack.Screen
        name="Liste de Courses"
        component={HolidaysGroceriesScreen}
      />
    </Stack.Navigator>
  );
};

export { MainStackNavigator };
