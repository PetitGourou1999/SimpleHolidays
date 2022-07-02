import React from "react";
import { Text, TextInput, View } from "react-native";
import Colors from "../../constants/Colors";
import globalStyles from "../../constants/Styles";
import { Activity } from "../../types/Types";

interface Props {
  holidaysActivity: Activity;
}

export default class EditableActivityRow extends React.Component<Props> {
  render() {
    return (
      <View style={globalStyles.editableRow}>
        <Text
          style={{
            paddingRight: 10,
            minWidth: "25%",
            color: Colors.light.darkBlue,
            fontWeight: "bold",
          }}
        >
          {this.props.holidaysActivity.date.toLocaleDateString([], {
            weekday: "long",
            day: "numeric",
          })}
        </Text>
        <TextInput style={[globalStyles.inputStyle, { width: "70%" }]} />
      </View>
    );
  }
}
