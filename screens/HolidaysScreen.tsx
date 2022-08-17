import React from "react";
import { View } from "react-native";
import HolidaysList from "../components/lists/HolidaysList";
import globalStyles from "../constants/Styles";

export default class HolidaysScreen extends React.Component {
  render() {
    return (
      <View style={globalStyles.container}>
        <HolidaysList navigation={this.props.navigation}></HolidaysList>
      </View>
    );
  }
}
