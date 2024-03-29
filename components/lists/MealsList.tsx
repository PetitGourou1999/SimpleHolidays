import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import { MyStyles } from "../../constants/MyStyles";
import MyStrings from "../../constants/text/MyStrings";
import storageHelper from "../../storage/AsyncStorageHelper";
import MealCard from "../cards/MealCard";
import MealForm from "../forms/MealForm";

export default class MealsList extends React.Component {
  state = {
    isModalVisible: false,
    arrayHolder: [],
    textInputHolderAmount: "",
    textInputHolderPlayer: "",
  };

  loadData = () => {
    storageHelper.getAllItems().then(
      (value) => {
        if (value !== undefined) {
          this.setState({
            arrayHolder: [],
          });
          value.forEach((element) => {
            if (element.ingredients !== undefined) {
              this.setState({
                arrayHolder: [...this.state.arrayHolder, element],
              });
            }
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  componentDidMount = () => {
    this.loadData();
  };

  toggleModal = (visible: boolean) => {
    this.setState({ isModalVisible: visible });
  };

  onSave = () => {
    this.toggleModal(false);
    this.loadData();
  };

  render() {
    return (
      <View style={[MyStyles.styles().container, { width: "100%" }]}>
        <Pressable
          style={[MyStyles.styles().buttonPrimary, styles.buttonStyle]}
          onPress={() => this.toggleModal(true)}
        >
          <Text style={MyStyles.styles().bigButtonText}>
            {MyStrings.constants.addRepasLabel}
          </Text>
        </Pressable>
        <Modal isVisible={this.state.isModalVisible}>
          <View style={[MyStyles.styles().modal, { flex: 0.8 }]}>
            <MealForm
              onCancel={() => this.toggleModal(false)}
              onSave={() => this.onSave()}
            />
          </View>
        </Modal>
        <FlatList
          data={this.state.arrayHolder}
          extraData={this.state.arrayHolder}
          keyExtractor={(item: any, index: any) => index.toString()}
          renderItem={({ item }) => (
            <MealCard
              mealIdea={item}
              onDelete={() => this.loadData()}
              onEdit={() => this.loadData()}
            ></MealCard>
          )}
          style={[MyStyles.styles().listStyle, { width: "100%" }]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    marginVertical: 20,
    width: "90%",
  },
});
