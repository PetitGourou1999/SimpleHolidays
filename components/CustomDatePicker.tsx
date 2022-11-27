import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";
import "moment/locale/fr";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Colors from "../constants/Colors";
import { MyStyles } from "../constants/MyStyles";

interface Props {
  initialDate: Date;
  onChange(date: Date): any;
}

export default class CustomDatePicker extends React.Component<Props> {
  state = {
    isDatePickerVisible: false,
    selectedDate: new Date(),
  };

  componentDidMount = () => {
    this.setState({ selectedDate: this.props.initialDate });
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
      <View style={[MyStyles.styles().inputStyle, styles.datePickerContainer]}>
        <DateTimePickerModal
          isVisible={this.state.isDatePickerVisible}
          mode="date"
          onConfirm={(date) => this.onDateChange(date)}
          onCancel={(date) => this.onDateChange(date)}
          locale="fr-FR"
        />
        <Text style={{ fontFamily: "WorkSansRegular" }}>
          {moment(this.state.selectedDate).format("LL")}
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
            color={Colors[MyStyles.selectedTheme].text}
          ></FontAwesome>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  datePickerContainer: {
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
