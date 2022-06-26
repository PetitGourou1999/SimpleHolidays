import React from "react";
import { Text, TextInput, View } from "react-native";
import Colors from "../../constants/Colors";
import globalStyles from "../../constants/Styles";
import CustomDatePicker from "../CustomDatePicker";

export default class HolidaysForm extends React.Component {
  state = {
    selectedDateStart: new Date(),
    selectedDateEnd: new Date(),
  };

  setSelectedDateStart = (date: any) => {
    this.setState({ selectedDateStart: date });
  };

  setSelectedDateEnd = (date: any) => {
    this.setState({ selectedDateEnd: date });
  };

  render() {
    return (
      <View style={[globalStyles.container, { borderRadius: 20, padding: 10 }]}>
        <Text>Lieu</Text>
        <TextInput style={globalStyles.inputStyle} />
        <Text style={{ paddingTop: 10 }}>Date de début</Text>
        <CustomDatePicker
          initialDate={this.state.selectedDateStart}
          onChange={() => (date: Date) => this.setSelectedDateStart(date)}
        />
        <Text style={{ paddingTop: 20 }}>Date de fin</Text>
        <CustomDatePicker
          initialDate={this.state.selectedDateStart}
          onChange={() => (date: Date) => this.setSelectedDateEnd(date)}
        />
      </View>
    );
  }
}

const datePickerStyles = {
  dateIcon: {
    position: "absolute",
    left: 0,
    top: 4,
    marginLeft: 0,
  },
  dateInput: {
    marginLeft: 40,
    backgroundColor: Colors.light.white,
    borderRadius: 5,
    borderWidth: 0,
  },
  datePickerCon: {
    backgroundColor: Colors.light.white,
  },
};
