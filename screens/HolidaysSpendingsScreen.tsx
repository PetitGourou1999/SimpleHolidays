import React from "react";
import { View } from "react-native";
import ScreenName from "../components/ScreenName";
import globalStyles from "../constants/Styles";

export default class HolidaysSpendingsScreen extends React.Component {
  private data = this.props.route;
  render() {
    return (
      <React.Fragment>
        <View style={globalStyles.container}>
          <ScreenName name={this.data.params.data.title}></ScreenName>
        </View>
      </React.Fragment>
    );
  }
}
