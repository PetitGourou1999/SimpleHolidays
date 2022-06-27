import React from "react";
import { TextInput, View } from "react-native";
import globalStyles from "../../constants/Styles";
import { Spending } from "../../types/Types";

interface Props {
  holidaysSpending: Spending;
}

export default class EditableSpendingsRow extends React.Component<Props> {
  render() {
    return (
      <View style={globalStyles.editableRow}>
        <TextInput style={globalStyles.inputStyle} />
      </View>
    );
  }
}
