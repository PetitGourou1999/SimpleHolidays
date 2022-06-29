import React from "react";
import { View } from "react-native";
import SpendingsList from "../components/SpendingsList";
import globalStyles from "../constants/Styles";

export default class HolidaysSpendingsScreen extends React.Component {
  private data = this.props.route;
  private holidays = this.data.params.data;

  render() {
    return (
      <React.Fragment>
        <View style={globalStyles.container}>
          <SpendingsList holidays={this.holidays}></SpendingsList>
        </View>
      </React.Fragment>
    );
  }
}
