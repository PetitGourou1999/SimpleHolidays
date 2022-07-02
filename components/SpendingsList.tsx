import React from "react";
import { Button, FlatList, Pressable, Text, View } from "react-native";
import Modal from "react-native-modal";
import Colors from "../constants/Colors";
import globalStyles from "../constants/Styles";
import { Holidays, Spending } from "../types/Types";
import SpendingsCard from "./cards/SpendingsCard";
import TotalSpendingsCard from "./cards/TotalSpendingsCard";
import SpendingsForm from "./forms/SpendingsForm";

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

  componentDidMount() {
    this.setState({ arrayHolder: [...this.props.holidays.spendings] });
  }

  toggleModal = (visible: boolean) => {
    this.setState({ isModalVisible: visible });
  };

  joinData = (spending: Spending) => {
    var tmpArray: Spending[] = [...this.state.arrayHolder];
    tmpArray.push(spending);
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
            Ajouter une dépense
          </Text>
        </Pressable>
        <Modal isVisible={this.state.isModalVisible}>
          <View style={globalStyles.modal}>
            <SpendingsForm />
            <Button
              title="Hide modal"
              onPress={() => this.toggleModal(false)}
            />
          </View>
        </Modal>
        <TotalSpendingsCard holidays={this.props.holidays}></TotalSpendingsCard>
        <Text style={{ marginVertical: 10, fontWeight: "bold", fontSize: 16 }}>
          Détail
        </Text>
        <FlatList
          data={this.state.arrayHolder}
          extraData={this.state.arrayHolder}
          keyExtractor={(index: any) => index.toString()}
          //ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={({ item }) => (
            <SpendingsCard spending={item}></SpendingsCard>
          )}
          style={{
            width: "90%",
            paddingLeft: 5,
          }}
        />
      </View>
    );
  }
}
