import React from "react";
import { Text, TextInput, View } from "react-native";
import CurrencyInput from "react-native-currency-input";
import globalStyles from "../../constants/Styles";

export default class SpendingsForm extends React.Component {
  state = {
    type: "",
    amount: 0,
  };

  setType = (type: string) => {
    this.setState({ type: type });
  };

  setAmount = (amount: number | null) => {
    this.setState({ amount: amount });
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
          onChangeText={(formattedValue) => {
            console.log(formattedValue); // $2,310.46
          }}
        />
      </View>
    );
  }
}
