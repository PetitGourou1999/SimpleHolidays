import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { CheckBox } from "react-native-elements";
import Colors from "../constants/Colors";
import globalStyles from "../constants/Styles";
import { Miscellaneous } from "../types/Types";

interface Props {
  item: Miscellaneous;
  deleteTask: any;
}

export default class MiscellaneousItem extends React.Component<Props> {
  state = {
    checked: false,
  };

  componentDidMount = () => {
    this.setState({ checked: this.props.item.checked });
  };

  checkItem = () => {
    this.setState({ checked: !this.state.checked });
  };

  render() {
    return (
      <View style={globalStyles.taskContainer}>
        <View style={[globalStyles.rowView, { justifyContent: "flex-start" }]}>
          <CheckBox
            title=""
            checked={this.state.checked}
            onPress={() => this.checkItem()}
          />
          <Text
            style={[
              globalStyles.text,
              { fontSize: 16, color: Colors.light.primary },
            ]}
          >
            {this.props.item.title}
          </Text>
        </View>
        <Pressable onPress={() => this.props.deleteTask()}>
          <FontAwesome
            style={globalStyles.taskDelete}
            name="trash"
            size={20}
            color={Colors.light.primary}
          />
        </Pressable>
      </View>
    );
  }
}
