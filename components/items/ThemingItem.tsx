import React from "react";
import { View } from "react-native";
import { MyStyles } from "../../constants/MyStyles";

export default class ThemingItem extends React.Component {
  state = {
    selectedTheme: {},
  };

  constructor(props: any) {
    super(props);
    MyStyles.loadTheme().finally(() => {
      console.log(MyStyles.selectedTheme);
    });
  }

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
