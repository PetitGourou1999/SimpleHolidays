import React from "react";
import GroceriesList from "../components/lists/GroceriesList";
import { Holidays } from "../types/Types";

interface Props {
  navigation: any;
}

export default class HolidaysGroceriesScreen extends React.Component<Props> {
  state = {
    allIngredients: [],
  };

  private data = this.props.route;
  private holidays: Holidays = this.data.params.data;

  render() {
    return <GroceriesList holidays={this.holidays}></GroceriesList>;
  }
}
