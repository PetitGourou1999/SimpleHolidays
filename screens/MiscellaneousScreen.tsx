import React from "react";
import { Text, View } from "react-native";
import MiscellaneousList from "../components/lists/MiscellaneousList";
import globalStyles from "../constants/Styles";

export default class MiscellaneousScreen extends React.Component {
  state = {
    currentItem: "",
  };

  setCurrentItem = (currentItem: string) => {
    this.setState({ currentItem: currentItem });
  };

  handleAddTask = () => {
    //props.addTask(value);
    this.setState({ currentItem: "" });
  };

  render() {
    return (
      <View style={globalStyles.container}>
        <Text
          style={[
            globalStyles.rowText,
            globalStyles.rowHintText,
            globalStyles.text,
          ]}
        >
          Ceci est la liste des choses utiles à emmener à chaque voyage.
        </Text>
        <View style={globalStyles.rowBorderStyle}></View>
        <MiscellaneousList></MiscellaneousList>
      </View>
    );
  }
}
