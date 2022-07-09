import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import Modal from "react-native-modal";
import Colors from "../../constants/Colors";
import globalStyles from "../../constants/Styles";
import storageHelper from "../../storage/AsyncStorageHelper";
import { MealIdea } from "../../types/Types";
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
              console.log(JSON.stringify(element));
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

  joinData = (meal: MealIdea) => {
    var tmpArray: MealIdea[] = [...this.state.arrayHolder];
    tmpArray.push(meal);
    this.setState({ arrayHolder: [...tmpArray] });
  };

  render() {
    return (
      <View style={[globalStyles.container, { width: "100%" }]}>
        <Pressable
          style={[
            globalStyles.buttonPrimary,
            { marginVertical: 20, width: "90%" },
          ]}
          onPress={() => this.toggleModal(true)}
        >
          <Text
            style={{
              color: Colors.light.white,
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Ajouter une Idée Repas
          </Text>
        </Pressable>
        <Modal isVisible={this.state.isModalVisible}>
          <View style={globalStyles.modal}>
            <MealForm
              onCancel={() => this.toggleModal(false)}
              onSave={() => this.loadData()}
            />
          </View>
        </Modal>
        <FlatList
          data={this.state.arrayHolder}
          extraData={this.state.arrayHolder}
          keyExtractor={(index: any) => index.toString()}
          renderItem={({ item }) => <MealCard mealIdea={item}></MealCard>}
          style={{
            width: "90%",
            paddingLeft: 5,
          }}
        />
      </View>
    );
  }
}
