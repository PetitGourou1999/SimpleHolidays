import React from "react";
import { Text, View } from "react-native";
import ThemingList from "../components/lists/ThemingList";
import { MyStyles } from "../constants/MyStyles";
import MyStrings from "../constants/text/MyStrings";

export default class PreferencesScreen extends React.Component {
  render() {
    return (
      <View style={MyStyles.styles().container}>
        <Text style={[MyStyles.styles().cardTitle, { paddingVertical: 15 }]}>
          {MyStrings.constants.preferencesLabel}
        </Text>
        <ThemingList></ThemingList>
      </View>
    );
  }
}
