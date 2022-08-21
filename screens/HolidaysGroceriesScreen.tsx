import React from "react";
import GroceriesList from "../components/lists/GroceriesList";
import { MyStyles } from "../constants/MyStyles";
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

  constructor(props: any) {
    super(props);
    MyStyles.loadTheme().finally(() => {
      console.log(MyStyles.selectedTheme);
    });
  }

  render() {
    return <GroceriesList holidays={this.holidays}></GroceriesList>;
  }
}
