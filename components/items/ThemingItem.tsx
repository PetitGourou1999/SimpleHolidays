import React from "react";
import { View } from "react-native";
import { MyStyles } from "../../constants/MyStyles";

export default class ThemingItem extends React.Component {
  state = {
    selectedTheme: {},
  };

  render() {
    return (
      <View style={MyStyles.styles().taskContainer}>
        <View
          style={[MyStyles.styles().rowView, { justifyContent: "flex-start" }]}
        ></View>
      </View>
    );
  }
}
