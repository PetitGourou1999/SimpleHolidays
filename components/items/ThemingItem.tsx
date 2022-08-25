import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";
import { MyStyles } from "../../constants/MyStyles";

interface Props {
  themeName: string;
  selected: boolean;
  onPressTheme: any;
}
export default class ThemingItem extends React.Component<Props> {
  render() {
    return (
      <Pressable
        style={[this.styles.componentWrapper]}
        onPress={() => {
          this.props.onPressTheme();
        }}
      >
        <Text style={[this.styles.colorsTitle]}>{this.props.themeName}</Text>
        <View style={this.styles.colorsContainer}>
          <View
            style={[
              this.styles.colorCircle,
              { backgroundColor: Colors[this.props.themeName].primary },
            ]}
          ></View>
          <View
            style={[
              this.styles.colorCircle,
              { backgroundColor: Colors[this.props.themeName].secondary },
            ]}
          ></View>
          <View
            style={[
              this.styles.colorCircle,
              { backgroundColor: Colors[this.props.themeName].tertiary },
            ]}
          ></View>
          <View
            style={[
              this.styles.colorCircle,
              { backgroundColor: Colors[this.props.themeName].quaternary },
            ]}
          ></View>
        </View>
      </Pressable>
    );
  }

  private styles = StyleSheet.create({
    componentWrapper: {
      ...MyStyles.styles().overlayShadow,
      flex: 0.4,
      borderRadius: 10,
      marginTop: 5,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: Colors[this.props.themeName].background,
    },

    colorsTitle: {
      ...MyStyles.styles().cardTitle,
      paddingVertical: 10,
      fontSize: 17,
      color: Colors[this.props.themeName].tertiary,
    },

    colorsContainer: {
      ...MyStyles.styles().rowView,
      flex: 1,
      justifyContent: "space-around",
    },

    colorCircle: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
  });
}
