import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { CheckBox } from "react-native-elements";
import Colors from "../../constants/Colors";
import { MyStyles } from "../../constants/MyStyles";
import { Miscellaneous } from "../../types/Types";

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
      <View style={MyStyles.styles().taskContainer}>
        <View
          style={[MyStyles.styles().rowView, { justifyContent: "flex-start" }]}
        >
          <CheckBox
            title=""
            checked={this.state.checked}
            onPress={() => this.checkItem()}
          />
          <Text
            style={[
              MyStyles.styles().text,
              { fontSize: 16, color: Colors[MyStyles.selectedTheme].primary },
            ]}
          >
            {this.props.item.title}
          </Text>
        </View>
        <Pressable onPress={() => this.props.deleteTask()}>
          <FontAwesome
            style={MyStyles.styles().taskDelete}
            name="trash"
            size={20}
            color={Colors[MyStyles.selectedTheme].primary}
          />
        </Pressable>
      </View>
    );
  }
}
