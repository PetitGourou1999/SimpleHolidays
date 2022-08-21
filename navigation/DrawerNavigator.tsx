import { FontAwesome5, Fontisto } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useFonts } from "expo-font";
import React from "react";
import Colors from "../constants/Colors";
import { MyStyles } from "../constants/MyStyles";
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
        name="Vacances"
        component={MainStackNavigator}
        options={{
          title: "Vacances",
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
        name="Idées Repas"
        component={MealsScreen}
        options={{
          title: "Idées Repas",
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
        name="Trucs Utiles"
        component={MiscellaneousScreen}
        options={{
          title: "Trucs Utiles",
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
        name="Préférences"
        component={PreferencesScreen}
        options={{
          title: "Préférences",
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
