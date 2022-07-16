import React from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import CurrencyInput from "react-native-currency-input";
import Colors from "../../constants/Colors";
import globalStyles from "../../constants/Styles";
import storageHelper from "../../storage/AsyncStorageHelper";
import { Holidays, Player, Spending } from "../../types/Types";
import CustomDropdown from "../CustomDropdown";

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
    this.setState({ amount: amount });
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
          console.log(JSON.stringify(this.props.holidays));
          this.props.onSave();
        },
        (error) => {
          console.log(error);
        }
      );
  };

  render() {
    return (
      <View style={[globalStyles.container, { borderRadius: 20, padding: 10 }]}>
        <Text>Nom / Type</Text>
        <TextInput
          style={globalStyles.inputStyle}
          onChangeText={(text) => this.setType(text)}
        />
        <Text>Montant</Text>
        <CurrencyInput
          value={this.state.amount}
          onChangeValue={(value) => this.setAmount(value)}
          style={globalStyles.inputStyle}
          suffix=" € "
          delimiter="."
          separator=","
          precision={2}
        />
        <Text>Payé par : </Text>
        <View style={globalStyles.editableRow}>
          <CustomDropdown
            style={globalStyles.inputStyle}
            label={this.state.player.pseudo}
            data={this.state.items}
            onSelect={(item) => this.setPlayer(item.value)}
          ></CustomDropdown>
        </View>
        <View
          style={[
            globalStyles.editableRow,
            {
              justifyContent: "space-evenly",
              marginTop: "auto",
            },
          ]}
        >
          <Pressable onPress={() => this.props.onCancel()}>
            <View style={[globalStyles.buttonPrimary]}>
              <Text style={{ color: Colors.light.white }}>Cancel</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => this.saveSpending()}>
            <View style={[globalStyles.buttonPrimary]}>
              <Text style={{ color: Colors.light.white }}>Save</Text>
            </View>
          </Pressable>
        </View>
      </View>
    );
  }
}
