import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Pressable, View } from "react-native";
import Colors from "../../constants/Colors";
import { MyStyles } from "../../constants/MyStyles";

interface Props {
  onEdit: any;
  onDelete: any;
}

export default class ActionIcons extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <View style={MyStyles.styles().iconsRow}>
        <Pressable onPress={() => this.props.onEdit()}>
          <FontAwesome
            name="pencil"
            size={20}
            color={Colors[MyStyles.selectedTheme].secondary}
          />
        </Pressable>
        <Pressable onPress={() => this.props.onDelete()}>
          <FontAwesome
            name="trash"
            size={20}
            color={Colors[MyStyles.selectedTheme].secondary}
            style={{ marginLeft: 15 }}
          />
        </Pressable>
      </View>
    );
  }
}
