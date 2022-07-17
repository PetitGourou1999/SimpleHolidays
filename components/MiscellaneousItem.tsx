import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
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
      <View style={styles.taskContainer}>
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
            style={styles.delete}
            name="trash"
            size={20}
            color={Colors.light.primary}
          />
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  taskContainer: {
    ...globalStyles.rowView,
    flex: 1,
    width: "100%",
    borderRadius: 10,
    padding: 5,
    paddingRight: 20,
    marginVertical: 5,
    minHeight: 40,
    backgroundColor: Colors.light.white,
  },
  delete: {
    marginLeft: 10,
  },
});
