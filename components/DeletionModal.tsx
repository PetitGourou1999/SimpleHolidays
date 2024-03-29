import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import Colors from "../constants/Colors";
import { MyStyles } from "../constants/MyStyles";
import MyStrings from "../constants/text/MyStrings";

interface Props {
  label: string;
  isVisible: boolean;
  onCancel: any;
  onDelete: any;
}

export default class DeletionModal extends React.Component<Props> {
  onCancel = () => {
    this.props.onCancel();
  };

  onDelete = () => {
    this.props.onDelete();
  };

  render() {
    return (
      <Modal isVisible={this.props.isVisible}>
        <View style={[MyStyles.styles().modal, this.styles.modalStyle]}>
          <Text style={[MyStyles.styles().cardText, this.styles.titleText]}>
            {this.props.label}
          </Text>
          <View style={[MyStyles.styles().editableRow, this.styles.buttonBar]}>
            <Pressable onPress={() => this.onCancel()}>
              <View style={[MyStyles.styles().buttonPrimary]}>
                <Text
                  style={[
                    MyStyles.styles().text,
                    { color: Colors[MyStyles.selectedTheme].white },
                  ]}
                >
                  {MyStrings.constants.cancel}
                </Text>
              </View>
            </Pressable>
            <Pressable onPress={() => this.onDelete()}>
              <View
                style={[
                  MyStyles.styles().buttonPrimary,
                  { backgroundColor: Colors[MyStyles.selectedTheme].softRed },
                ]}
              >
                <Text
                  style={[
                    MyStyles.styles().text,
                    { color: Colors[MyStyles.selectedTheme].white },
                  ]}
                >
                  {MyStrings.constants.delete}
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  }

  private styles = StyleSheet.create({
    modalStyle: {
      flex: 0.2,
      alignContent: "center",
      alignItems: "center",
      justifyContent: "center",
    },

    titleText: {
      width: "100%",
      textAlign: "center",
      marginTop: 40,
      paddingHorizontal: 10,
    },

    buttonBar: {
      justifyContent: "space-evenly",
      marginTop: "auto",
      backgroundColor: Colors[MyStyles.selectedTheme].white,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
  });
}
