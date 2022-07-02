import React from "react";
import { StyleSheet, Text, View } from "react-native";
import EditableMealRow from "../components/rows/EditableMealRow";
import Colors from "../constants/Colors";
import globalStyles from "../constants/Styles";

export default class HolidaysMealsScreen extends React.Component {
  private data = this.props.route;
  private meals = this.data.params.data.meals;

  render() {
    return (
      <React.Fragment>
        <View style={[globalStyles.container]}>
          <Text style={[styles.text, styles.hintText]}>
            Pour pouvoir ajouter des repas, il faut ajouter des Idées Repas
            depuis la page dédiée
          </Text>
          <View style={styles.borderStyle}></View>
          <View style={[globalStyles.editableRow]}>
            <Text style={styles.text}>Date</Text>
            <Text style={styles.text}>Midi</Text>
            <Text style={styles.text}>Soir</Text>
          </View>
          {this.meals.map((item: any, index: any) => {
            return <EditableMealRow holidaysMeal={item}></EditableMealRow>;
          })}
        </View>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    flex: 1,
    textAlign: "center",
    color: Colors.light.darkestBlue,
    fontWeight: "bold",
  },

  hintText: {
    flex: 0.15,
    padding: 20,
    paddingBottom: 0,
    color: Colors.light.darkBlue,
    fontSize: 12,
  },

  borderStyle: {
    width: "60%",
    borderTopWidth: 0.5,
    borderColor: Colors.light.primary,
    paddingTop: 30,
  },
});
