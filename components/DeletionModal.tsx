import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import Colors from "../constants/Colors";
import globalStyles from "../constants/Styles";

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
        <View style={[globalStyles.modal, styles.modalStyle]}>
          <Text style={[globalStyles.cardText, styles.titleText]}>
            {this.props.label}
          </Text>
          <View style={[globalStyles.editableRow, styles.buttonBar]}>
            <Pressable onPress={() => this.onCancel()}>
              <View style={[globalStyles.buttonPrimary]}>
                <Text
                  style={[globalStyles.text, { color: Colors.light.white }]}
                >
                  Annuler
                </Text>
              </View>
            </Pressable>
            <Pressable onPress={() => this.onDelete()}>
              <View
                style={[
                  globalStyles.buttonPrimary,
                  { backgroundColor: Colors.light.softRed },
                ]}
              >
                <Text
                  style={[globalStyles.text, { color: Colors.light.white }]}
                >
                  Supprimer
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
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
    backgroundColor: Colors.light.white,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});
