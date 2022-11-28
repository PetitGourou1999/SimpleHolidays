import React from "react";
import { Text, View } from "react-native";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import EditableActivityRow from "../../components/rows/EditableActivityRow";
import { MyStyles } from "../../constants/MyStyles";
import MyStrings from "../../constants/text/MyStrings";
import storageHelper from "../../storage/AsyncStorageHelper";
import { Activity, Holidays } from "../../types/Types";

interface Props {
  holidays: Holidays;
}

export default class HolidaysActivitiesList extends React.Component<Props> {
  state = {
    arrayHolder: [],
    holidays: {},
  };

  componentDidMount() {
    this.setState({ arrayHolder: [...this.props.holidays.activities] });
    this.setState({ holidays: this.props.holidays });
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

    this.props.holidays.activities = holidaysActivities;

    storageHelper
      .storeData(this.props.holidays.storageKey, this.props.holidays)
      .then(
        () => {},
        (error) => {
          console.log(error);
        }
      );
  };

  render() {
    return (
      <View style={[MyStyles.styles().container]}>
        <Text
          style={[
            MyStyles.styles().rowText,
            MyStyles.styles().rowHintText,
            MyStyles.styles().text,
          ]}
        >
          {MyStrings.constants.activitiesDescriptionLabel}
        </Text>
        <View style={MyStyles.styles().rowBorderStyle}></View>
        <View style={[MyStyles.styles().editableRow]}>
          <Text style={[MyStyles.styles().rowText, { flex: 0, width: "33%" }]}>
            {MyStrings.constants.date}
          </Text>
          <Text style={[MyStyles.styles().rowText, { flex: 1 }]}>
            {MyStrings.constants.activiteLabel}
          </Text>
        </View>

        <KeyboardAwareFlatList
          removeClippedSubviews={false}
          data={this.state.arrayHolder}
          extraData={this.state.arrayHolder}
          keyExtractor={(item: any, index: any) => index.toString()}
          renderItem={({ item }) => (
            <EditableActivityRow
              holidaysActivity={item}
              onTextChange={(text) => this.onActivityChange(item, text)}
            ></EditableActivityRow>
          )}
          style={MyStyles.styles().listStyleScreen}
        />
      </View>
    );
  }
}
