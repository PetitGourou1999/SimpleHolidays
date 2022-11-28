import React from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import CurrencyInput from "react-native-currency-input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MyStyles } from "../../constants/MyStyles";
import MyStrings from "../../constants/text/MyStrings";
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
      <KeyboardAwareScrollView
        contentContainerStyle={this.styles.borderRadius}
        style={[this.styles.borderRadius]}
      >
        <ScrollView
          contentContainerStyle={[
            MyStyles.styles().container,
            this.styles.borderRadius,
          ]}
          style={[this.styles.borderRadius]}
        >
          <Text style={[MyStyles.styles().formTitle]}>
            {MyStrings.constants.newDepenseLabel}
          </Text>
          <Text style={[this.styles.textPadding10]}>
            {MyStrings.constants.typeDepenseLabel}
          </Text>
          <TextInput
            style={MyStyles.styles().inputStyle}
            onChangeText={(text) => this.setType(text)}
          />
          <Text style={[this.styles.textPadding10]}>
            {MyStrings.constants.montantLabel}
          </Text>
          <CurrencyInput
            value={this.state.amount}
            minValue={0}
            onChangeValue={(value) => this.setAmount(value)}
            style={MyStyles.styles().inputStyle}
            suffix=" € "
            delimiter="."
            separator=","
            precision={2}
            keyboardType={"numbers-and-punctuation"}
          />
          <Text style={[this.styles.textPadding10]}>
            {MyStrings.constants.paidLabel}
          </Text>
          <View style={[MyStyles.styles().editableRow, { width: 320 }]}>
            <CustomDropdown
              style={MyStyles.styles().inputStyle}
              label={this.state.player.pseudo}
              isModal={true}
              data={this.state.items}
              onSelect={(item) => this.setPlayer(item.value)}
            ></CustomDropdown>
          </View>
          <ButtonBar
            cancelLabel={MyStrings.constants.cancel}
            saveLabel={MyStrings.constants.add}
            onSave={() => this.saveSpending()}
            onCancel={() => this.props.onCancel()}
          ></ButtonBar>
        </ScrollView>
      </KeyboardAwareScrollView>
    );
  }

  private styles = StyleSheet.create({
    borderRadius: {
      borderRadius: 20,
    },

    textPadding10: {
      ...MyStyles.styles().text,
      paddingTop: 10,
    },
  });
}
