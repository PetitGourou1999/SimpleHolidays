import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CheckBox } from "react-native-elements";
import Colors from "../constants/Colors";
import globalStyles from "../constants/Styles";
import { Ingredient } from "../types/Types";

interface Props {
  item: Ingredient;
  deleteItem: any;
}

export default class GroceryItem extends React.Component<Props> {
  state = {
    checked: false,
  };

  componentDidMount = () => {
    this.setState({ checked: this.props.item.checked });
  };

  checkItem = () => {
    this.setState({ checked: !this.state.checked });
  };

  deleteItem = () => {
    this.props.deleteItem();
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
          <View style={[globalStyles.rowView]}>
            <Text
              style={[
                globalStyles.text,
                { fontSize: 16, color: Colors.light.primary },
              ]}
            >
              {this.props.item.title}
            </Text>
            <View
              style={[
                globalStyles.rowView,
                {
                  justifyContent: "flex-end",
                  width: "auto",
                  alignItems: "baseline",
                },
              ]}
            >
              <Text
                style={[
                  globalStyles.text,
                  { fontSize: 16, color: Colors.light.primary },
                ]}
              >
                {this.props.item.quantity}
              </Text>
              {this.props.item.addedManually ? (
                <Pressable onPress={() => this.deleteItem()}>
                  <FontAwesome
                    style={styles.delete}
                    name="trash"
                    size={20}
                    color={Colors.light.primary}
                  />
                </Pressable>
              ) : (
                <View style={{ width: 0 }}></View>
              )}
            </View>
          </View>
        </View>
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
