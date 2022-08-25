import React from "react";
import { Text, View } from "react-native";
import ThemingList from "../components/lists/ThemingList";
import { MyStyles } from "../constants/MyStyles";

export default class PreferencesScreen extends React.Component {
  render() {
    return (
      <View style={MyStyles.styles().container}>
        <Text style={[MyStyles.styles().cardTitle, { paddingVertical: 15 }]}>
          Couleurs de l'Application :
        </Text>
        <ThemingList></ThemingList>
      </View>
    );
  }
}
