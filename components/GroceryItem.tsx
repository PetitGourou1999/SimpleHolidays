import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { CheckBox } from "react-native-elements";
import Colors from "../constants/Colors";
import globalStyles from "../constants/Styles";
import { Ingredient } from "../types/Types";

interface Props {
  item: Ingredient;
}

export default class GroceryItem extends React.Component<Props> {
  state = {
    checked: false,
  };

  componentDidMount = () => {
    //this.setState({ checked: this.props.item.checked });
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
          <View style={[globalStyles.rowView]}>
            <Text
              style={[
                globalStyles.text,
                { fontSize: 16, color: Colors.light.primary },
              ]}
            >
              {this.props.item.title}
            </Text>
            <Text
              style={[
                globalStyles.text,
                { fontSize: 16, color: Colors.light.primary },
              ]}
            >
              {this.props.item.quantity}
            </Text>
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
