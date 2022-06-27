import React from "react";
import { Text, View } from "react-native";
import EditableMealRow from "../components/rows/EditableMealRow";
import globalStyles from "../constants/Styles";

export default class HolidaysMealsScreen extends React.Component {
  private data = this.props.route;
  private meals = this.data.params.data.meals;

  render() {
    return (
      <React.Fragment>
        <View style={globalStyles.container}>
          <View style={globalStyles.editableRow}>
            <Text>Jour</Text>
            <Text>Midi</Text>
            <Text>Soir</Text>
          </View>
          {this.meals.map((item: any, index: any) => {
            return <EditableMealRow holidaysMeal={item}></EditableMealRow>;
          })}
        </View>
      </React.Fragment>
    );
  }
}
