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
    holidays: {
      storageKey: "",
      title: "",
      dateStart: new Date(),
      dateEnd: new Date(),
      players: [],
      activities: [],
      meals: [],
      groceries: [],
      spendings: [],
    },
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
        index:
          this.state.arrayHolder.length === 0
            ? 0
            : Math.max(...this.state.arrayHolder.map((o) => o.index)) + 1,
        title: this.state.currentItem,
        quantity: 1,
        checked: false,
        addedManually: true,
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

  handleDeleteTask = (item: Ingredient) => {
    let holidaysFromState: Holidays = this.state.holidays;
    let holidayGroceries = holidaysFromState.groceries;

    let foundIndexOfItem = holidayGroceries.findIndex(
      (groceriesItem) => groceriesItem.index === item.index
    );

    holidayGroceries.splice(foundIndexOfItem, 1);

    holidaysFromState.groceries = [...holidayGroceries];

    storageHelper
      .storeData(this.state.holidays.storageKey, this.state.holidays)
      .then(
        () => {
          this.setState({ holidays: holidaysFromState });
          this.setState({ arrayHolder: [...holidaysFromState.groceries] });
        },
        (error) => {
          console.log(error);
        }
      );
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
          renderItem={({ item }) => (
            <GroceryItem
              holidays={this.state.holidays}
              item={item}
              deleteItem={() => this.handleDeleteTask(item)}
            ></GroceryItem>
          )}
          style={{
            width: "90%",
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
