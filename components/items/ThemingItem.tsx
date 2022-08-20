import React from "react";
import { View } from "react-native";
import globalStyles from "../../constants/Styles";

export default class ThemingItem extends React.Component {
  state = {
    selectedTheme: {},
  };

  render() {
    return (
      <View style={globalStyles.taskContainer}>
        <View
          style={[globalStyles.rowView, { justifyContent: "flex-start" }]}
        ></View>
      </View>
    );
  }
}
