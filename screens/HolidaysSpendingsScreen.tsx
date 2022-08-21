import React from "react";
import { View } from "react-native";
import SpendingsList from "../components/lists/SpendingsList";
import { MyStyles } from "../constants/MyStyles";

export default class HolidaysSpendingsScreen extends React.Component {
  private data = this.props.route;
  private holidays = this.data.params.data;

  render() {
    return (
      <React.Fragment>
        <View style={MyStyles.styles().container}>
          <SpendingsList holidays={this.holidays}></SpendingsList>
        </View>
      </React.Fragment>
    );
  }
}
