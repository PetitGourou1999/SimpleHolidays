import React from "react";
import { FlatList, Text, View } from "react-native";
import EditableActivityRow from "../components/rows/EditableActivityRow";
import globalStyles from "../constants/Styles";

export default class HolidaysActivitiesScreen extends React.Component {
  state = {
    arrayHolder: [],
  };

  private data = this.props.route;
  private activities = this.data.params.data.activities;

  componentDidMount() {
    this.setState({ arrayHolder: [...this.activities] });
  }

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

        <FlatList
          data={this.state.arrayHolder}
          extraData={this.state.arrayHolder}
          keyExtractor={(index: any) => index.toString()}
          renderItem={({ item }) => (
            <EditableActivityRow holidaysActivity={item}></EditableActivityRow>
          )}
          style={{
            height: "0%",
            width: "90%",
            paddingHorizontal: 5,
            marginBottom: 50,
          }}
        />
      </View>
    );
  }
}
