import React from "react";
import { StyleSheet } from "react-native";
import HolidaysActivitiesList from "../components/lists/HolidaysActivitiesList";
import { Holidays } from "../types/Types";

export default class HolidaysActivitiesScreen extends React.Component {
  private data = this.props.route;
  private holidays: Holidays = this.data.params.data;

  render() {
    return (
      <HolidaysActivitiesList holidays={this.holidays}></HolidaysActivitiesList>
    );
  }
}

const styles = StyleSheet.create({
  listStyles: {
    height: "0%",
    width: "90%",
    paddingHorizontal: 5,
    marginBottom: 50,
  },
});
