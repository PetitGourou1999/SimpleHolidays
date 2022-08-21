import React from "react";
import HolidaysActivitiesList from "../components/lists/HolidaysActivitiesList";
import { MyStyles } from "../constants/MyStyles";
import { Holidays } from "../types/Types";

export default class HolidaysActivitiesScreen extends React.Component {
  private data = this.props.route;
  private holidays: Holidays = this.data.params.data;

  constructor(props: any) {
    super(props);
    MyStyles.loadTheme().finally(() => {
      console.log(MyStyles.selectedTheme);
    });
  }

  render() {
    return (
      <HolidaysActivitiesList holidays={this.holidays}></HolidaysActivitiesList>
    );
  }
}
