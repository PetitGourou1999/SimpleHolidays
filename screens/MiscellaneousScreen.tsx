import React from "react";
import { View } from "react-native";
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
        <MiscellaneousList></MiscellaneousList>
      </View>
    );
  }
}
