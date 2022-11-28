import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";
import { MyStyles } from "../../constants/MyStyles";
import MyStrings from "../../constants/text/MyStrings";

interface Props {
  cancelLabel: string;
  saveLabel: string;
  onCancel: any;
  onSave: any;
}

export default class ButtonBar extends React.Component<Props> {
  render() {
    return (
      <View style={[MyStyles.styles().editableRow, styles.buttonBar]}>
        <Pressable onPress={() => this.props.onCancel()}>
          <View style={[MyStyles.styles().buttonPrimary]}>
            <Text
              style={[
                MyStyles.styles().text,
                { color: Colors[MyStyles.selectedTheme].white },
              ]}
            >
              {MyStrings.constants.cancel}
            </Text>
          </View>
        </Pressable>
        <Pressable onPress={() => this.props.onSave()}>
          <View style={[MyStyles.styles().buttonPrimary]}>
            <Text
              style={[
                MyStyles.styles().text,
                { color: Colors[MyStyles.selectedTheme].white },
              ]}
            >
              {MyStrings.constants.add}
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
