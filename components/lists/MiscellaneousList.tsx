import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
  View,
} from "react-native";
import Colors from "../../constants/Colors";
import globalStyles from "../../constants/Styles";
import { Miscellaneous } from "../../types/Types";
import MiscellaneousItem from "../MiscellaneousItem";

export default class MiscellaneousList extends React.Component {
  state = {
    arrayHolder: [],
    currentItem: "",
  };

  setCurrentItem = (currentItem: string) => {
    this.setState({ currentItem: currentItem });
  };

  handleAddTask = () => {
    let newItem: Miscellaneous = {
      title: this.state.currentItem,
      checked: false,
    };
    this.setState({ arrayHolder: [...this.state.arrayHolder, newItem] });
    this.setState({ currentItem: "" });
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={globalStyles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={globalStyles.rowView}>
          <TextInput
            style={[globalStyles.inputStyle, { marginHorizontal: "auto" }]}
            value={this.state.currentItem}
            onChangeText={(text) => this.setCurrentItem(text)}
            placeholder={"Ajouter un truc utile..."}
            placeholderTextColor={Colors.light.primary}
          />
          <Pressable onPress={() => this.handleAddTask()}>
            <FontAwesome name="plus" size={20} color="black" />
          </Pressable>
        </View>
        <FlatList
          data={this.state.arrayHolder}
          extraData={this.state.arrayHolder}
          keyExtractor={(index: any) => index.toString()}
          renderItem={({ item }) => (
            <MiscellaneousItem
              item={item}
              deleteTask={() => {}}
            ></MiscellaneousItem>
          )}
          style={{
            width: "90%",
            paddingLeft: 5,
          }}
        />
      </KeyboardAvoidingView>
    );
  }
}
