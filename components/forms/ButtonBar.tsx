import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";
import globalStyles from "../../constants/Styles";

interface Props {
  onCancel: any;
  onSave: any;
}

export default class ButtonBar extends React.Component<Props> {
  render() {
    return (
      <View style={[globalStyles.editableRow, styles.buttonBar]}>
        <Pressable onPress={() => this.props.onCancel()}>
          <View style={[globalStyles.buttonPrimary]}>
            <Text style={[globalStyles.text, { color: Colors.light.white }]}>
              Annuler
            </Text>
          </View>
        </Pressable>
        <Pressable onPress={() => this.props.onSave()}>
          <View style={[globalStyles.buttonPrimary]}>
            <Text style={[globalStyles.text, { color: Colors.light.white }]}>
              Ajouter
            </Text>
          </View>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonBar: {
    justifyContent: "space-evenly",
  },
});
