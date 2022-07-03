import React from "react";
import { Text, View } from "react-native";
import EditableActivityRow from "../components/rows/EditableActivityRow";
import globalStyles from "../constants/Styles";

export default class HolidaysActivitiesScreen extends React.Component {
  private data = this.props.route;
  private activities = this.data.params.data.activities;

  render() {
    return (
      <View style={[globalStyles.container]}>
        <Text style={[globalStyles.rowText, globalStyles.rowHintText]}>
          Ici sont centralisées les activités à faire pendant les vacances
        </Text>
        <View style={globalStyles.rowBorderStyle}></View>
        <View style={[globalStyles.editableRow]}>
          <Text style={[globalStyles.rowText, { flex: 0, width: "33%" }]}>
            Date
          </Text>
          <Text style={[globalStyles.rowText, { flex: 1 }]}>Activité</Text>
        </View>
        {this.activities.map((item: any, index: any) => {
          return (
            <EditableActivityRow holidaysActivity={item}></EditableActivityRow>
          );
        })}
      </View>
    );
  }
}
