import React from "react";
import { View } from "react-native";
import MealsList from "../components/lists/MealsList";
import globalStyles from "../constants/Styles";

export default class MealsScreen extends React.Component {
  render() {
    return (
      <React.Fragment>
        <View style={globalStyles.container}>
          <MealsList></MealsList>
        </View>
      </React.Fragment>
    );
  }
}
