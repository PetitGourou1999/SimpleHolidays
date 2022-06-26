import React from "react";
import { View } from "react-native";
import ScreenName from "../components/ScreenName";
import globalStyles from "../constants/Styles";

export default class HolidaysSpendingsScreen extends React.Component {
  render() {
    return (
      <React.Fragment>
        <View style={globalStyles.container}>
          <ScreenName name={"Dépenses"}></ScreenName>
        </View>
      </React.Fragment>
    );
  }
}
