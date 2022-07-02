import React from "react";
import { View } from "react-native";
import MealsList from "../components/lists/MealsList";
import globalStyles from "../constants/Styles";
import { MealIdeas } from "../default/Bouchon";

export default class MealsScreen extends React.Component {
  render() {
    return (
      <React.Fragment>
        <View style={globalStyles.container}>
          <MealsList mealIdeas={MealIdeas}></MealsList>
        </View>
      </React.Fragment>
    );
  }
}
