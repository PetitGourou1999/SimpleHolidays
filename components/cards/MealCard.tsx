import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-elements";
import Modal from "react-native-modal";
import Colors from "../../constants/Colors";
import { MyStyles } from "../../constants/MyStyles";
import storageHelper from "../../storage/AsyncStorageHelper";
import { MealIdea } from "../../types/Types";
import DeletionModal from "../DeletionModal";
import MealForm from "../forms/MealForm";
import ActionIcons from "./ActionIcons";

interface Props {
  mealIdea: MealIdea;
  onDelete: any;
  onEdit: any;
}

export default class MealCard extends React.Component<Props> {
  state = {
    isDeletionModalVisible: false,
    isEditModalVisible: false,
  };

  toggleEditModal = (visible: boolean) => {
    this.setState({ isEditModalVisible: visible });
  };

  toggleDeleteModal = (visible: boolean) => {
    this.setState({ isDeletionModalVisible: visible });
  };

  onDelete = () => {
    storageHelper.removeData(this.props.mealIdea.storageKey).then(
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
          <View style={MyStyles.styles().cardHeader}>
            <Text style={[MyStyles.styles().cardTitle, { margin: "auto" }]}>
              {this.props.mealIdea.title}
            </Text>
            <ActionIcons
              onEdit={() => this.toggleEditModal(true)}
              onDelete={() => this.toggleDeleteModal(true)}
            ></ActionIcons>
          </View>
          <Card.Divider color={Colors[MyStyles.selectedTheme].secondary} />
          {this.props.mealIdea.ingredients.map((item, index) => {
            return (
              <View style={styles.ingredientsList}>
                <Text style={MyStyles.styles().cardText}>
                  {item.title + " : "}
                </Text>
                <Text style={MyStyles.styles().itemRow}>{item.quantity}</Text>
              </View>
            );
          })}
        </Card>
        <Modal isVisible={this.state.isEditModalVisible}>
          <View style={[MyStyles.styles().modal, { flex: 0.8 }]}>
            <MealForm
              onCancel={() => this.toggleEditModal(false)}
              onSave={() => this.toggleEditModal(false)}
              mealIdea={this.props.mealIdea}
            />
          </View>
        </Modal>
        <DeletionModal
          isVisible={this.state.isDeletionModalVisible}
          label={"Voulez-vous vraiment supprimer cette idée repas ?"}
          onDelete={() => this.onDelete()}
          onCancel={() => this.toggleDeleteModal(false)}
        ></DeletionModal>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  ingredientsList: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
});
