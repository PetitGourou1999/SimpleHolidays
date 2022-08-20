import React from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import CurrencyInput from "react-native-currency-input";
import { ScrollView } from "react-native-gesture-handler";
import globalStyles from "../../constants/Styles";
import storageHelper from "../../storage/AsyncStorageHelper";
import { Holidays, Player, Spending } from "../../types/Types";
import CustomDropdown from "../CustomDropdown";
import ButtonBar from "./ButtonBar";

interface Props {
  holidays: Holidays;
  onCancel: any;
  onSave: any;
}

export default class SpendingsForm extends React.Component<Props> {
  state = {
    type: "",
    amount: 0,
    player: {
      pseudo: "",
    },
    items: [],
  };

  componentDidMount = () => {
    this.setState({
      items: this.props.holidays.players.map((item, index) => {
        return { label: item.pseudo, value: item };
      }),
    });
  };

  setType = (type: string) => {
    this.setState({ type: type });
  };

  setAmount = (amount: number | null) => {
    if (amount === null) {
      this.setState({ amount: 0 });
    } else {
      this.setState({ amount: amount });
    }
  };

  setPlayer = (player: Player) => {
    this.setState({ player: player });
  };

  saveSpending = () => {
    if (this.state.type.trim() === "") {
      Alert.alert("Veuillez saisir le type de dépense");
      return;
    }

    if (this.state.amount === 0) {
      Alert.alert("Veuillez saisir un montant pour cette dépense");
      return;
    }

    let spending: Spending = {
      title: this.state.type,
      amount: this.state.amount,
      player: this.state.player,
    };

    this.props.holidays.spendings = [
      ...this.props.holidays.spendings,
      spending,
    ];

    storageHelper
      .storeData(this.props.holidays.storageKey, this.props.holidays)
      .then(
        () => {
          this.props.onSave();
        },
        (error) => {
          console.log(error);
        }
      );
  };

  render() {
    return (
      <ScrollView contentContainerStyle={[styles.contentContainer]}>
        <Text style={[globalStyles.formTitle]}>Nouvelle dépense :</Text>
        <Text style={[styles.textPadding10]}>Nom / Type</Text>
        <TextInput
          style={globalStyles.inputStyle}
          onChangeText={(text) => this.setType(text)}
        />
        <Text style={[styles.textPadding10]}>Montant</Text>
        <CurrencyInput
          value={this.state.amount}
          minValue={0}
          onChangeValue={(value) => this.setAmount(value)}
          style={globalStyles.inputStyle}
          suffix=" € "
          delimiter="."
          separator=","
          precision={2}
          keyboardType={"numbers-and-punctuation"}
        />
        <Text style={[styles.textPadding10]}>Payé par : </Text>
        <View style={globalStyles.editableRow}>
          <CustomDropdown
            style={globalStyles.inputStyle}
            label={this.state.player.pseudo}
            data={this.state.items}
            onSelect={(item) => this.setPlayer(item.value)}
          ></CustomDropdown>
        </View>
        <ButtonBar
          cancelLabel="Annuler"
          saveLabel="Ajouter"
          onSave={() => this.saveSpending()}
          onCancel={() => this.props.onCancel()}
        ></ButtonBar>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    ...globalStyles.container,
    borderRadius: 20,
    padding: 10,
  },

  textPadding10: {
    ...globalStyles.text,
    paddingTop: 10,
  },
});
