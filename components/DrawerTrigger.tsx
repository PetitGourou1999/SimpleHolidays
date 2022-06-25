import { Ionicons } from "@expo/vector-icons";
import React, { Props } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { DrawerActions } from "react-navigation-drawer";

interface Props {
  navigation: any;
}

class DrawerTrigger extends React.Component<Props> {
  render() {
    return (
      <TouchableOpacity
        style={styles.trigger}
        onPress={() => {
          this.props.navigation.dispatch(DrawerActions.openDrawer());
        }}
      >
        <Ionicons name={"menu"} size={47} color={"grey"}></Ionicons>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  trigger: {
    marginLeft: 27.5,
    borderRadius: 30,
    width: 60,
    height: 60,
  },
});

export default withNavigation(DrawerTrigger);
