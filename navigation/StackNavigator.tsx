import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Colors from "../constants/Colors";
import { MyStyles } from "../constants/MyStyles";
import MyStrings from "../constants/text/MyStrings";

import HolidaysActivitiesScreen from "../screens/HolidaysActivitiesScreen";
import HolidaysGroceriesScreen from "../screens/HolidaysGroceriesScreen";
import HolidaysMealsScreen from "../screens/HolidaysMealsScreen";
import HolidaysScreen from "../screens/HolidaysScreen";
import HolidaysSpendingsScreen from "../screens/HolidaysSpendingsScreen";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={MyStrings.constants.nosVacancesTitle}
      screenOptions={{
        headerBackTitle: MyStrings.constants.back,
        headerTintColor: Colors[MyStyles.selectedTheme].primary,
        headerStyle: {
          backgroundColor: Colors[MyStyles.selectedTheme].white,
          shadowColor: "transparent",
        },
        headerTitleStyle: {
          fontFamily: "WorkSans",
          fontSize: 18,
        },
      }}
    >
      <Stack.Screen
        name={MyStrings.constants.nosVacancesTitle}
        component={HolidaysScreen}
      />
      <Stack.Screen
        name={MyStrings.constants.repasVacancesTitle}
        component={HolidaysMealsScreen}
      />
      <Stack.Screen
        name={MyStrings.constants.activitesVacancesTitle}
        component={HolidaysActivitiesScreen}
      />
      <Stack.Screen
        name={MyStrings.constants.depensesVacancesTitle}
        component={HolidaysSpendingsScreen}
      />
      <Stack.Screen
        name={MyStrings.constants.listeCoursesTitle}
        component={HolidaysGroceriesScreen}
      />
    </Stack.Navigator>
  );
};

export { MainStackNavigator };
