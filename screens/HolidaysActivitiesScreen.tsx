import React from "react";
import { View } from "react-native";
import ScreenName from "../components/ScreenName";
import globalStyles from "../constants/Styles";

export default class HolidaysActivitiesScreen extends React.Component {
  static navigationOptions = {};

  render() {
    return (
      <React.Fragment>
        <View style={globalStyles.container}>
          <ScreenName name={"Nos Activités de Vacances"} />
        </View>
      </React.Fragment>
    );
  }
}
