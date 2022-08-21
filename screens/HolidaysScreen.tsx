import React from "react";
import { View } from "react-native";
import HolidaysList from "../components/lists/HolidaysList";
import { MyStyles } from "../constants/MyStyles";

export default class HolidaysScreen extends React.Component {
  constructor(props: any) {
    super(props);
    MyStyles.loadTheme().finally(() => {
      console.log(MyStyles.selectedTheme);
    });
  }

  render() {
    return (
      <View style={MyStyles.styles().container}>
        <HolidaysList navigation={this.props.navigation}></HolidaysList>
      </View>
    );
  }
}
