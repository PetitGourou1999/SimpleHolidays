import React from "react";
import HolidaysMealsList from "../components/lists/HolidaysMealsList";
import { Holidays } from "../types/Types";

export default class HolidaysMealsScreen extends React.Component {
  private data = this.props.route;
  private holidays: Holidays = this.data.params.data;

  render() {
    return (
      <HolidaysMealsList
        holidays={this.holidays}
        navigation={this.props.navigation}
      ></HolidaysMealsList>
    );
  }
}
