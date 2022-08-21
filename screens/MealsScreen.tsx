import React from "react";
import { View } from "react-native";
import MealsList from "../components/lists/MealsList";
import { MyStyles } from "../constants/MyStyles";

export default class MealsScreen extends React.Component {
  constructor(props: any) {
    super(props);
    MyStyles.loadTheme().finally(() => {
      console.log(MyStyles.selectedTheme);
    });
  }

  render() {
    return (
      <React.Fragment>
        <View style={MyStyles.styles().container}>
          <MealsList></MealsList>
        </View>
      </React.Fragment>
    );
  }
}
