import React from "react";
import { FlatList, Text, View } from "react-native";
import EditableActivityRow from "../components/rows/EditableActivityRow";
import globalStyles from "../constants/Styles";
import storageHelper from "../storage/AsyncStorageHelper";
import { Activity } from "../types/Types";

export default class HolidaysActivitiesScreen extends React.Component {
  state = {
    arrayHolder: [],
    holidays: {},
  };

  private data = this.props.route;
  private holidays = this.data.params.data;

  componentDidMount() {
    this.setState({ arrayHolder: [...this.holidays.activities] });
    this.setState({ holidays: this.holidays });
  }

  onActivityChange = (activity: Activity, text: string) => {
    let holidaysActivities: Activity[] = [...this.state.holidays.activities];
    let foundIndex = holidaysActivities.findIndex(
      (obj) => obj.date === activity.date
    );

    // Update Activity
    holidaysActivities[foundIndex] = {
      date: holidaysActivities[foundIndex].date,
      location: holidaysActivities[foundIndex].location,
      title: text,
    };

    this.holidays.activities = holidaysActivities;

    storageHelper.storeData(this.holidays.storageKey, this.holidays).then(
      () => {},
      (error) => {
        console.log(error);
      }
    );
  };

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
            <EditableActivityRow
              holidaysActivity={item}
              onTextChange={(text) => this.onActivityChange(item, text)}
            ></EditableActivityRow>
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
