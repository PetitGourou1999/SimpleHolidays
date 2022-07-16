import React from "react";
import { FlatList, Text, View } from "react-native";
import EditableMealRow from "../components/rows/EditableMealRow";
import { diner, lunch } from "../constants/data/MealTimes";
import globalStyles from "../constants/Styles";
import storageHelper from "../storage/AsyncStorageHelper";
import { Meal, MealsOfTheDay } from "../types/Types";

export default class HolidaysMealsScreen extends React.Component {
  state = {
    arrayHolder: [] /*(MealsOfTheDay)*/,
    holidays: {},
  };

  private data = this.props.route;
  private holidays = this.data.params.data;

  componentDidMount() {
    this.setState({ arrayHolder: [...this.holidays.meals] });
    this.setState({ holidays: this.holidays });
  }

  onLunchChange = (item: MealsOfTheDay, meal: Meal) => {
    let holidaysMeals: MealsOfTheDay[] = [...this.state.holidays.meals];

    let foundIndexDate = holidaysMeals.findIndex(
      (obj) => obj.date === item.date
    );

    let mealsOfTheDate: Meal[] = [...holidaysMeals[foundIndexDate].meals];

    let foundIndexLunch = mealsOfTheDate.findIndex((obj) => obj.time == lunch);

    mealsOfTheDate[foundIndexLunch] = meal;

    holidaysMeals[foundIndexDate] = {
      date: holidaysMeals[foundIndexDate].date,
      meals: mealsOfTheDate,
    };

    this.holidays.meals = holidaysMeals;

    storageHelper.storeData(this.holidays.storageKey, this.holidays).then(
      () => {},
      (error) => {
        console.log(error);
      }
    );
  };

  onDinerChange = (item: MealsOfTheDay, meal: Meal) => {
    let holidaysMeals: MealsOfTheDay[] = [...this.state.holidays.meals];

    let foundIndexDate = holidaysMeals.findIndex(
      (obj) => obj.date === item.date
    );

    let mealsOfTheDate: Meal[] = [...holidaysMeals[foundIndexDate].meals];

    let foundIndexDinner = mealsOfTheDate.findIndex((obj) => obj.time == diner);

    mealsOfTheDate[foundIndexDinner] = meal;

    holidaysMeals[foundIndexDate] = {
      date: holidaysMeals[foundIndexDate].date,
      meals: mealsOfTheDate,
    };

    this.holidays.meals = holidaysMeals;

    storageHelper.storeData(this.holidays.storageKey, this.holidays).then(
      () => {},
      (error) => {
        console.log(error);
      }
    );
  };

  render() {
    return (
      <React.Fragment>
        <View style={[globalStyles.container]}>
          <Text
            style={[
              globalStyles.rowText,
              globalStyles.rowHintText,
              globalStyles.text,
            ]}
          >
            Pour pouvoir ajouter des repas, il faut ajouter des Idées Repas
            depuis la page dédiée
          </Text>
          <View style={globalStyles.rowBorderStyle}></View>
          <View style={[globalStyles.editableRow]}>
            <Text style={globalStyles.rowText}>Date</Text>
            <Text style={globalStyles.rowText}>Midi</Text>
            <Text style={globalStyles.rowText}>Soir</Text>
          </View>

          <FlatList
            data={this.state.arrayHolder}
            extraData={this.state.arrayHolder}
            keyExtractor={(index: any) => index.toString()}
            renderItem={({ item }) => (
              <EditableMealRow
                holidaysMeal={item}
                onLunchChange={(meal) => this.onLunchChange(item, meal)}
                onDinerChange={(meal) => this.onDinerChange(item, meal)}
              ></EditableMealRow>
            )}
            style={{
              height: "0%",
              width: "90%",
              paddingHorizontal: 5,
              marginBottom: 50,
            }}
          />
        </View>
      </React.Fragment>
    );
  }
}
