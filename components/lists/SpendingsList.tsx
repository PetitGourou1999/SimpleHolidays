import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import globalStyles from "../../constants/Styles";
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
      <View style={[globalStyles.container, { width: "100%" }]}>
        <Pressable
          style={[globalStyles.buttonPrimary, styles.buttonStyle]}
          onPress={() => this.toggleModal(true)}
        >
          <Text style={globalStyles.bigButtonText}>Ajouter une dépense</Text>
        </Pressable>
        <Modal isVisible={this.state.isModalVisible}>
          <View style={globalStyles.modal}>
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
          keyExtractor={(index: any) => index.toString()}
          renderItem={({ item }) => (
            <SpendingsCard spending={item}></SpendingsCard>
          )}
          style={styles.listStyle}
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

  listStyle: {
    width: "90%",
    paddingLeft: 5,
  },
});
