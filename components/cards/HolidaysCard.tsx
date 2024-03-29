import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-elements";
import Modal from "react-native-modal";
import Colors from "../../constants/Colors";
import { MyStyles } from "../../constants/MyStyles";
import MyStrings from "../../constants/text/MyStrings";
import storageHelper from "../../storage/AsyncStorageHelper";
import { Holidays } from "../../types/Types";
import DeletionModal from "../DeletionModal";
import HolidaysForm from "../forms/HolidaysForm";
import ActionIcons from "./ActionIcons";

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
            <ActionIcons
              onEdit={() => this.toggleEditModal(true)}
              onDelete={() => this.toggleDeleteModal(true)}
            ></ActionIcons>
          </View>
          <Card.Divider color={Colors[MyStyles.selectedTheme].secondary} />
          <Pressable
            style={[this.styles.pressable]}
            onPress={() =>
              this.onPressButton(MyStrings.constants.activitesVacancesTitle)
            }
          >
            <Text style={this.styles.pressableText}>
              {MyStrings.constants.activitesLabel}
            </Text>
          </Pressable>
          <Pressable
            style={[this.styles.pressable]}
            onPress={() =>
              this.onPressButton(MyStrings.constants.repasVacancesTitle)
            }
          >
            <Text style={this.styles.pressableText}>
              {MyStrings.constants.repasLabel}
            </Text>
          </Pressable>
          <Pressable
            style={[this.styles.pressable]}
            onPress={() =>
              this.onPressButton(MyStrings.constants.depensesVacancesTitle)
            }
          >
            <Text style={this.styles.pressableText}>
              {MyStrings.constants.depensesLabel}
            </Text>
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
          label={MyStrings.constants.promptSupprimerVacances}
          onDelete={() => this.onDelete()}
          onCancel={() => this.toggleDeleteModal(false)}
        ></DeletionModal>
      </React.Fragment>
    );
  }

  private styles = StyleSheet.create({
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
