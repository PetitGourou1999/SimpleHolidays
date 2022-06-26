import React from "react";
import { View } from "react-native";
import HolidaysCard from "../components/HolidaysCard";
import globalStyles from "../constants/Styles";

export default class HolidaysScreen extends React.Component {
  static navigationOptions = {};

  render() {
    return (
      <React.Fragment>
        <View style={globalStyles.container}>
          <HolidaysCard
            title="Nos vacances à Erquy"
            navigation={this.props.navigation}
          ></HolidaysCard>
        </View>
      </React.Fragment>
    );
  }
}
