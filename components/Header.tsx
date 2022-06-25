import React from "react";
import { StyleSheet, View } from "react-native";
import DrawerTrigger from "./DrawerTrigger";

export class Header extends React.Component {
  render() {
    return (
      <View style={styles.header}>
        <DrawerTrigger></DrawerTrigger>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 40,
    backgroundColor: "whitesmoke",
  },
});
