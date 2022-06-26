import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import DrawerNavigator from "./navigation/DrawerNavigator";

export default function App() {
  return (
    <React.Fragment>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </React.Fragment>
  );
}
