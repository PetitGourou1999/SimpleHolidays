import React from "react";
import { Text, View } from "react-native";
import { CheckBox } from "react-native-elements";
import NumericInput from "react-native-numeric-input";
import Colors from "../constants/Colors";
import globalStyles from "../constants/Styles";
import storageHelper from "../storage/AsyncStorageHelper";
import { Holidays, Ingredient } from "../types/Types";

interface Props {
  holidays: Holidays;
  item: Ingredient;
  deleteItem: any;
}

export default class GroceryItem extends React.Component<Props> {
  state = {
    checked: false,
    holidays: {},
    item: {},
  };

  componentWillMount = () => {
    this.setState({ checked: this.props.item.checked });
    this.setState({ holidays: this.props.holidays });
    this.setState({ item: this.props.item });
  };

  editItem = (value: number, editType: string) => {
    let holidaysFromState: Holidays = this.state.holidays;
    let holidayGroceries = holidaysFromState.groceries;

    let foundIndexOfItem = holidayGroceries.findIndex(
      (groceriesItem) => groceriesItem.index === this.state.item.index
    );

    if (foundIndexOfItem != -1) {
      holidayGroceries[foundIndexOfItem] = {
        index: holidayGroceries[foundIndexOfItem].index,
        title: holidayGroceries[foundIndexOfItem].title,
        quantity:
          editType === "quantity"
            ? value
            : holidayGroceries[foundIndexOfItem].quantity,
        checked:
          editType === "checked"
            ? !this.state.checked
            : holidayGroceries[foundIndexOfItem].checked,
        addedManually: holidayGroceries[foundIndexOfItem].addedManually,
      };

      storageHelper
        .storeData(this.state.holidays.storageKey, this.state.holidays)
        .then(
          () => {
            this.setState({ holidays: holidaysFromState });
            if (editType === "checked") {
              this.setState({ checked: !this.state.checked });
            }
            this.setState({ item: holidayGroceries[foundIndexOfItem] });
          },
          (error) => {
            console.log(error);
          }
        );
    }
  };

  deleteItem = () => {
    this.props.deleteItem();
  };

  render() {
    return (
      <View style={globalStyles.taskContainer}>
        <View style={[globalStyles.rowView, { justifyContent: "flex-start" }]}>
          <CheckBox
            title=""
            checked={this.state.checked}
            onPress={() => this.editItem(0, "checked")}
          />
          <View style={[globalStyles.rowView]}>
            <Text
              style={[
                globalStyles.text,
                { fontSize: 16, color: Colors.light.primary },
              ]}
            >
              {this.props.item.title}
            </Text>
            <NumericInput
              onChange={(value) => this.editItem(value, "quantity")}
              value={this.state.item.quantity}
              totalHeight={35}
              totalWidth={70}
              minValue={0}
              rounded
              rightButtonBackgroundColor={Colors.light.mediumBlue}
              leftButtonBackgroundColor={Colors.light.lightBlue}
              borderColor={"transparent"}
              inputStyle={{ backgroundColor: Colors.light.white }}
            />
          </View>
        </View>
      </View>
    );
  }
}
