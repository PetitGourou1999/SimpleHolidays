import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import Colors from "../../constants/Colors";
import globalStyles from "../../constants/Styles";
import storageHelper from "../../storage/AsyncStorageHelper";
import { Holidays, Ingredient } from "../../types/Types";
import GroceryItem from "../GroceryItem";

interface Props {
  holidays: Holidays;
}

export default class GroceriesList extends React.Component<Props> {
  state = {
    holidays: {},
    arrayHolder: [],
    currentItem: "",
  };

  componentDidMount = () => {
    this.setState({ holidays: this.props.holidays });
    this.setState({ arrayHolder: [...this.props.holidays.groceries] });
  };

  setCurrentItem = (currentItem: string) => {
    this.setState({ currentItem: currentItem });
  };

  handleAddTask = () => {
    if (this.state.currentItem.trim() != "") {
      let newItem: Ingredient = {
        title: this.state.currentItem,
        quantity: 1,
        checked: false,
      };

      let holidaysFromState: Holidays = this.state.holidays;
      holidaysFromState.groceries.push(newItem);

      storageHelper
        .storeData(this.state.holidays.storageKey, this.state.holidays)
        .then(
          () => {
            this.setState({ holidays: holidaysFromState });
            this.setState({ arrayHolder: [...holidaysFromState.groceries] });
            this.setState({ currentItem: "" });
          },
          (error) => {
            console.log(error);
          }
        );
    }
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={globalStyles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={[globalStyles.rowView]}>
          <TextInput
            style={[
              globalStyles.inputStyle,
              globalStyles.inputText,
              { marginHorizontal: "auto" },
            ]}
            value={this.state.currentItem}
            onChangeText={(text) => this.setCurrentItem(text)}
            placeholder={"Ajouter quelque chose à acheter..."}
            placeholderTextColor={Colors.light.primary}
          />

          <View style={[styles.buttonsContainer]}>
            <Pressable onPress={() => this.handleAddTask()}>
              <FontAwesome name="plus" size={20} color="black" />
            </Pressable>
          </View>
        </View>

        <FlatList
          data={this.state.arrayHolder}
          extraData={this.state.arrayHolder}
          keyExtractor={(index: any) => index.toString()}
          renderItem={({ item }) => <GroceryItem item={item}></GroceryItem>}
          style={{
            width: "90%",
            //paddingLeft: 5,
          }}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginLeft: "auto",
  },
});
