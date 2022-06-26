import React from "react";
import { View } from "react-native";
import ScreenName from "../components/ScreenName";
import globalStyles from "../constants/Styles";

export default class HolidaysMealsScreen extends React.Component {
  render() {
    return (
      <React.Fragment>
        <View style={globalStyles.container}>
          <ScreenName name={"Nos Repas de Vacances"} />
        </View>
      </React.Fragment>
    );
  }
}
