import { FontAwesome5, Fontisto } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useFonts } from "expo-font";
import React from "react";
import Colors from "../constants/Colors";
import { MyStyles } from "../constants/MyStyles";
import MyStrings from "../constants/text/MyStrings";
import MealsScreen from "../screens/MealsScreen";
import MiscellaneousScreen from "../screens/MiscellaneousScreen";
import PreferencesScreen from "../screens/PreferencesScreen";
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
        headerTintColor: Colors[MyStyles.selectedTheme].white,
        headerStyle: {
          backgroundColor: Colors[MyStyles.selectedTheme].primary,
          shadowColor: "transparent",
        },
        headerTitleStyle: {
          fontFamily: "WorkSans",
          fontSize: 18,
        },
        drawerActiveBackgroundColor: Colors[MyStyles.selectedTheme].tertiary,
        drawerActiveTintColor: Colors[MyStyles.selectedTheme].primary,
        drawerInactiveTintColor: Colors[MyStyles.selectedTheme].primary,
        drawerContentStyle: {
          backgroundColor: Colors[MyStyles.selectedTheme].white,
        },
        drawerLabelStyle: { fontFamily: "WorkSans", fontSize: 18 },
      }}
    >
      <Drawer.Screen
        name={MyStrings.constants.vacancesTitle}
        component={MainStackNavigator}
        options={{
          title: MyStrings.constants.vacancesTitle,
          drawerIcon: ({ focused, size }) => (
            <Fontisto
              name="holiday-village"
              size={size}
              color={Colors[MyStyles.selectedTheme].primary}
            />
          ),
        }}
      />
      <Drawer.Screen
        name={MyStrings.constants.repasTitle}
        component={MealsScreen}
        options={{
          title: MyStrings.constants.repasTitle,
          drawerIcon: ({ focused, size }) => (
            <FontAwesome5
              name="pizza-slice"
              size={size}
              color={Colors[MyStyles.selectedTheme].primary}
            />
          ),
        }}
      />
      <Drawer.Screen
        name={MyStrings.constants.miscellaneousTitle}
        component={MiscellaneousScreen}
        options={{
          title: MyStrings.constants.miscellaneousTitle,
          drawerIcon: ({ focused, size }) => (
            <FontAwesome5
              name="suitcase"
              size={size}
              color={Colors[MyStyles.selectedTheme].primary}
            />
          ),
        }}
      />
      <Drawer.Screen
        name={MyStrings.constants.preferencesTitle}
        component={PreferencesScreen}
        options={{
          title: MyStrings.constants.preferencesTitle,
          drawerIcon: ({ focused, size }) => (
            <FontAwesome5
              name="tools"
              size={size}
              color={Colors[MyStyles.selectedTheme].primary}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
