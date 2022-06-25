import { createDrawerNavigator } from "react-navigation-drawer";

import HolidaysScreen from "../screens/HolidaysScreen";
import MealsScreen from "../screens/MealsScreen";

const DrawerNavigator = createDrawerNavigator(
  {
    Vancances: HolidaysScreen,
    Repas: MealsScreen,
  },
  {
    initialRouteName: "Vancances",
    contentOptions: {
      activeTintColor: "#e91e63",
      itemsContainerStyle: {
        marginVertical: 75,
      },
    },
    screenContainerStyle: {
      drawerStyle: {
        backgroundColor: "red",
      },
    },
  }
);

export default DrawerNavigator;
