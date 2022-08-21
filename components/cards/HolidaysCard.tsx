import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-elements";
import Modal from "react-native-modal";
import Colors from "../../constants/Colors";
import { MyStyles } from "../../constants/MyStyles";
import storageHelper from "../../storage/AsyncStorageHelper";
import { Holidays } from "../../types/Types";
import DeletionModal from "../DeletionModal";
import HolidaysForm from "../forms/HolidaysForm";

interface Props {
  holidays: Holidays;
  navigation: any;
  onDelete: any;
  onEdit: any;
}

export default class HolidaysCard extends React.Component<Props> {
  state = {
    loaded: false,
    isDeleteModalVisible: false,
    isEditModalVisible: false,
  };

  constructor(props: any) {
    super(props);
    MyStyles.loadTheme().finally(() => {
      console.log(MyStyles.selectedTheme);
    });
  }

  toggleDeleteModal = (visible: boolean) => {
    this.setState({ isDeleteModalVisible: visible });
  };

  toggleEditModal = (visible: boolean) => {
    this.setState({ isEditModalVisible: visible });
  };

  onPressButton = (screenName: string) => {
    this.props.navigation.navigate(screenName, { data: this.props.holidays });
  };

  onDelete = () => {
    storageHelper.removeData(this.props.holidays.storageKey).then(
      () => {
        this.props.onDelete();
        this.toggleDeleteModal(false);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  render() {
    return (
      <React.Fragment>
        <Card
          wrapperStyle={MyStyles.styles().cardWrapper}
          containerStyle={MyStyles.styles().cardContainer}
        >
          <View style={[MyStyles.styles().cardHeader]}>
            <Text style={[MyStyles.styles().cardTitle, { margin: "auto" }]}>
              {this.props.holidays.title}
            </Text>
            <View style={this.styles.iconsRow}>
              <Pressable onPress={() => this.toggleEditModal(true)}>
                <FontAwesome
                  name="pencil"
                  size={20}
                  color={Colors[MyStyles.selectedTheme].secondary}
                />
              </Pressable>
              <Pressable onPress={() => this.toggleDeleteModal(true)}>
                <FontAwesome
                  name="trash"
                  size={20}
                  color={Colors[MyStyles.selectedTheme].secondary}
                  style={{ marginLeft: 15 }}
                />
              </Pressable>
            </View>
          </View>
          <Card.Divider color={Colors[MyStyles.selectedTheme].secondary} />
          <Pressable
            style={[this.styles.pressable]}
            onPress={() => this.onPressButton("Activités des Vacances")}
          >
            <Text style={this.styles.pressableText}>Activités</Text>
          </Pressable>
          <Pressable
            style={[this.styles.pressable]}
            onPress={() => this.onPressButton("Repas des Vacances")}
          >
            <Text style={this.styles.pressableText}>Repas</Text>
          </Pressable>
          <Pressable
            style={[this.styles.pressable]}
            onPress={() => this.onPressButton("Dépenses des Vacances")}
          >
            <Text style={this.styles.pressableText}>Dépenses</Text>
          </Pressable>
        </Card>
        <Modal isVisible={this.state.isEditModalVisible}>
          <View style={[MyStyles.styles().modal, { flex: 0.7 }]}>
            <HolidaysForm
              onSave={() => this.toggleEditModal(false)}
              onCancel={() => this.toggleEditModal(false)}
              holidays={this.props.holidays}
            />
          </View>
        </Modal>
        <DeletionModal
          isVisible={this.state.isDeleteModalVisible}
          label={"Voulez-vous vraiment supprimer ces vacances ?"}
          onDelete={() => this.onDelete()}
          onCancel={() => this.toggleDeleteModal(false)}
        ></DeletionModal>
      </React.Fragment>
    );
  }

  private styles = StyleSheet.create({
    iconsRow: {
      flexDirection: "row",
      justifyContent: "flex-end",
      position: "absolute",
      right: 0,
    },

    pressable: {
      ...MyStyles.styles().buttonSecondary,
      marginVertical: 5,
    },

    pressableText: {
      color: Colors[MyStyles.selectedTheme].white,
      fontWeight: "bold",
      fontFamily: "WorkSans",
      fontSize: 15,
    },
  });
}
