import moment from "moment";
import "moment/locale/fr";
import React from "react";
import { Text, TextInput, View } from "react-native";
import { MyStyles } from "../../constants/MyStyles";
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
      <View style={MyStyles.styles().editableRow}>
        <Text style={MyStyles.styles().dateText}>
          {moment(new Date(this.props.holidaysActivity.date)).format("dddd Do")}
        </Text>
        <TextInput
          removeClippedSubviews={false}
          blurOnSubmit={true}
          value={this.state.activity}
          onChangeText={(text) => this.setActivity(text)}
          style={[MyStyles.styles().inputStyle, { width: "66%" }]}
        />
      </View>
    );
  }
}
