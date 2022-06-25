import React from "react";
import { StyleSheet, View } from "react-native";
import { Header } from "../components/Header";
import ScreenName from "../components/ScreenName";

export default class HolidaysScreen extends React.Component {
  static navigationOptions = {};

  render() {
    return (
      <React.Fragment>
        <Header></Header>
        <View style={styles.container}>
          <ScreenName name={"Nos Vacances"} />
        </View>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});
