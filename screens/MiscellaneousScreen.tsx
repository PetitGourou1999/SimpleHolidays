import React from "react";
import { Text, View } from "react-native";
import MiscellaneousList from "../components/lists/MiscellaneousList";
import { MyStyles } from "../constants/MyStyles";

export default class MiscellaneousScreen extends React.Component {
  state = {
    currentItem: "",
  };

  render() {
    return (
      <View style={MyStyles.styles().container}>
        <Text
          style={[
            MyStyles.styles().rowText,
            MyStyles.styles().rowHintText,
            MyStyles.styles().text,
          ]}
        >
          Ceci est la liste des choses utiles à emmener à chaque voyage.
        </Text>
        <View style={MyStyles.styles().rowBorderStyle}></View>
        <MiscellaneousList></MiscellaneousList>
      </View>
    );
  }
}
