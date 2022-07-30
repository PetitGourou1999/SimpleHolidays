import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Colors from "../../constants/Colors";
import globalStyles from "../../constants/Styles";
import { Activity } from "../../types/Types";

interface Props {
  holidaysActivity: Activity;
  onTextChange(text: string): any;
}

export default class EditableActivityRow extends React.Component<Props> {
  state = {
    activity: "",
  };

  componentDidMount = () => {
    this.setState({ activity: this.props.holidaysActivity.title });
  };

  setActivity = (text: string) => {
    this.setState({ activity: text });
    this.props.onTextChange(text);
  };

  render() {
    return (
      <View style={globalStyles.editableRow}>
        <Text style={styles.dateText}>
          {new Date(this.props.holidaysActivity.date).toLocaleDateString([], {
            weekday: "long",
            day: "numeric",
          })}
        </Text>
        <TextInput
          value={this.state.activity}
          onChangeText={(text) => this.setActivity(text)}
          style={[globalStyles.inputStyle, { width: "66%" }]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dateText: {
    paddingRight: 10,
    minWidth: "33%",
    color: Colors.light.darkBlue,
    fontWeight: "bold",
    ...globalStyles.text,
  },
});
