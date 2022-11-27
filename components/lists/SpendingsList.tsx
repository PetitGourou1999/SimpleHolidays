import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import { MyStyles } from "../../constants/MyStyles";
import { Holidays } from "../../types/Types";
import SpendingsCard from "../cards/SpendingsCard";
import TotalSpendingsCard from "../cards/TotalSpendingsCard";
import SpendingsForm from "../forms/SpendingsForm";

interface Props {
  holidays: Holidays;
}

export default class SpendingsList extends React.Component<Props> {
  state = {
    isModalVisible: false,
    arrayHolder: [],
    textInputHolderAmount: "",
    textInputHolderPlayer: "",
  };

  loadData = () => {
    this.setState({ arrayHolder: [...this.props.holidays.spendings] });
  };

  componentDidMount() {
    this.loadData();
  }

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
            Ajouter une dépense
          </Text>
        </Pressable>
        <Modal isVisible={this.state.isModalVisible}>
          <View style={MyStyles.styles().modal}>
            <SpendingsForm
              holidays={this.props.holidays}
              onCancel={() => this.toggleModal(false)}
              onSave={() => this.onSave()}
            />
          </View>
        </Modal>
        <TotalSpendingsCard holidays={this.props.holidays}></TotalSpendingsCard>

        <FlatList
          data={this.state.arrayHolder}
          extraData={this.state.arrayHolder}
          keyExtractor={(item: any, index: any) => index.toString()}
          renderItem={({ item }) => (
            <SpendingsCard spending={item}></SpendingsCard>
          )}
          style={MyStyles.styles().listStyle}
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
