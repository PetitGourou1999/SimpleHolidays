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
        <View style={[globalStyles.container]}>
          <Text style={[globalStyles.rowText, globalStyles.rowHintText]}>
            Pour pouvoir ajouter des repas, il faut ajouter des Idées Repas
            depuis la page dédiée
          </Text>
          <View style={globalStyles.rowBorderStyle}></View>
          <View style={[globalStyles.editableRow]}>
            <Text style={globalStyles.rowText}>Date</Text>
            <Text style={globalStyles.rowText}>Midi</Text>
            <Text style={globalStyles.rowText}>Soir</Text>
          </View>
          {this.meals.map((item: any, index: any) => {
            return <EditableMealRow holidaysMeal={item}></EditableMealRow>;
          })}
        </View>
      </React.Fragment>
    );
  }
}
