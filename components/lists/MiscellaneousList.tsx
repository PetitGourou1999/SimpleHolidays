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
import { MyStyles } from "../../constants/MyStyles";
import MyStrings from "../../constants/text/MyStrings";
import storageHelper from "../../storage/AsyncStorageHelper";
import { Miscellaneous } from "../../types/Types";
import MiscellaneousItem from "../items/MiscellaneousItem";

export default class MiscellaneousList extends React.Component {
  state = {
    refresh: false,
    arrayHolder: [],
    currentItem: "",
  };

  loadData = () => {
    storageHelper.getAllItems().then(
      (value) => {
        if (value !== undefined) {
          this.setState({
            arrayHolder: [],
          });
          value.forEach((element) => {
            if (element.checked !== undefined) {
              this.setState({
                arrayHolder: [...this.state.arrayHolder, element],
              });
            }
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  componentDidMount = () => {
    this.loadData();
  };

  setCurrentItem = (currentItem: string) => {
    this.setState({ currentItem: currentItem });
  };

  handleAddTask = () => {
    if (this.state.currentItem.trim() != "") {
      let newItem: Miscellaneous = {
        storageKey: storageHelper.makeid(8),
        title: this.state.currentItem,
        checked: false,
      };

      storageHelper.storeData(newItem.storageKey, newItem).then(
        () => {
          this.loadData();
          this.setState({ currentItem: "" });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  };

  handleRefresh = () => {
    let tmpArray: Miscellaneous[] = this.state.arrayHolder;
    for (let index = 0; index < tmpArray.length; index++) {
      const element = tmpArray[index];
      element.checked = false;
      storageHelper.storeData(element.storageKey, element).then(
        () => {
          this.loadData();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  };

  handleDeleteTask = (item: Miscellaneous) => {
    storageHelper.removeData(item.storageKey).then(
      () => {
        this.loadData();
      },
      (error) => {
        console.log(error);
      }
    );
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={MyStyles.styles().container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={[MyStyles.styles().rowView]}>
          <TextInput
            style={[
              MyStyles.styles().inputStyle,
              MyStyles.styles().inputText,
              { marginHorizontal: "auto" },
            ]}
            value={this.state.currentItem}
            onChangeText={(text) => this.setCurrentItem(text)}
            placeholder={MyStrings.constants.addMiscellaneousPlaceholder}
            placeholderTextColor={Colors[MyStyles.selectedTheme].primary}
          />

          <View style={[styles.buttonsContainer]}>
            <Pressable onPress={() => this.handleAddTask()}>
              <FontAwesome name="plus" size={20} color="black" />
            </Pressable>
            <Pressable onPress={() => this.handleRefresh()}>
              <FontAwesome name="refresh" size={20} color="black" />
            </Pressable>
          </View>
        </View>
        <FlatList
          data={this.state.arrayHolder}
          extraData={this.state.arrayHolder}
          keyExtractor={(item: any, index: any) => index.toString()}
          renderItem={({ item }) => (
            <MiscellaneousItem
              item={item}
              deleteTask={() => this.handleDeleteTask(item)}
            ></MiscellaneousItem>
          )}
          style={[MyStyles.styles().listStyle, { paddingLeft: 0 }]}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 7,
  },
});
