import React from "react";
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
