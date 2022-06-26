import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Colors from "../constants/Colors";

interface Props {
  initialDate: Date;
  onChange(date: Date): void;
}

export default class CustomDatePicker extends React.Component<Props> {
  state = {
    isDatePickerVisible: false,
    selectedDate: new Date(),
  };

  showDatePicker = (visible: boolean) => {
    this.setState({ isDatePickerVisible: visible });
  };

  onDateChange = (date: Date) => {
    if (date !== undefined) this.setState({ selectedDate: date });
    this.setState({ isDatePickerVisible: false });
    this.props.onChange(date);
  };

  render() {
    return (
      <View style={[styles.datePickerContainer]}>
        <DateTimePickerModal
          isVisible={this.state.isDatePickerVisible}
          mode="datetime"
          onConfirm={(date) => this.onDateChange(date)}
          onCancel={(date) => this.onDateChange(date)}
          minimumDate={new Date()}
          locale="fr-FR"
        />
        <Text>
          {this.state.selectedDate.toLocaleTimeString([], {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
        <TouchableOpacity
          onPress={() => {
            this.showDatePicker(!this.state.isDatePickerVisible);
          }}
          style={[styles.calendarButton]}
        >
          <FontAwesome
            name="calendar"
            size={25}
            color={Colors.light.text}
          ></FontAwesome>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  datePickerContainer: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },
  calendarButton: {
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 20,
    marginLeft: -50,
  },
});
