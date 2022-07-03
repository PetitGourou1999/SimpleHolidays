import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CheckBox } from "react-native-elements";
import Colors from "../constants/Colors";
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
      <View style={styles.taskContainer}>
        <CheckBox
          title=""
          checked={this.state.checked}
          onPress={() => this.checkItem()}
        />
        <Text style={styles.task}>{this.props.item.title}</Text>
        <Pressable onPress={() => this.props.deleteTask()}>
          <FontAwesome
            style={styles.delete}
            name="trash"
            size={20}
            color={Colors.light.white}
          />
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  taskContainer: {
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginVertical: 5,
    minHeight: 40,
    backgroundColor: Colors.light.white,
  },
  task: {
    width: "90%",
    color: Colors.light.primary,
    fontWeight: "bold",
  },
  delete: {
    marginLeft: 10,
  },
});
