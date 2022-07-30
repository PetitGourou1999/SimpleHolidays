import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import EditableMealRow from "../components/rows/EditableMealRow";
import { diner, lunch } from "../constants/data/MealTimes";
import globalStyles from "../constants/Styles";
import storageHelper from "../storage/AsyncStorageHelper";
import { Holidays, Ingredient, Meal, MealsOfTheDay } from "../types/Types";

export default class HolidaysMealsScreen extends React.Component {
  state = {
    arrayHolder: [] /*(MealsOfTheDay)*/,
    holidays: {},
  };

  private data = this.props.route;
  private holidays: Holidays = this.data.params.data;

  componentDidMount() {
    this.setState({ arrayHolder: [...this.holidays.meals] });
    this.setState({ holidays: this.holidays });
  }

  onMealChange = (item: MealsOfTheDay, meal: Meal, theTime: string) => {
    let holidaysMeals: MealsOfTheDay[] = [...this.state.holidays.meals];
    let holidaysGroceries: Ingredient[] = [...this.state.holidays.groceries];

    let foundIndexDate = holidaysMeals.findIndex(
      (obj) => obj.date === item.date
    );

    let mealsOfTheDate: Meal[] = [...holidaysMeals[foundIndexDate].meals];

    let foundIndexTime = mealsOfTheDate.findIndex((obj) => obj.time == theTime);

    mealsOfTheDate[foundIndexTime] = meal;

    holidaysMeals[foundIndexDate] = {
      date: holidaysMeals[foundIndexDate].date,
      meals: mealsOfTheDate,
    };

    this.holidays.meals = holidaysMeals;

    for (let k = 0; k < meal.meal.ingredients.length; k++) {
      let foundIndex = holidaysGroceries.findIndex(
        (ingredient) => ingredient.title === meal.meal.ingredients[k].title
      );
      if (foundIndex != -1) {
        holidaysGroceries[foundIndex] = {
          title: holidaysGroceries[foundIndex].title,
          quantity:
            holidaysGroceries[foundIndex].quantity +
            meal.meal.ingredients[k].quantity,
          checked: holidaysGroceries[foundIndex].checked,
          addedManually: false,
        };
      } else {
        if (meal.meal.ingredients[k].title !== "") {
          holidaysGroceries.push(meal.meal.ingredients[k]);
        }
      }
    }

    this.holidays.groceries = [...holidaysGroceries];

    storageHelper.storeData(this.holidays.storageKey, this.holidays).then(
      () => {
        this.setState({ holidays: this.holidays });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  render() {
    return (
      <React.Fragment>
        <View style={[globalStyles.container]}>
          <Pressable
            style={[
              globalStyles.buttonPrimary,
              { marginVertical: 20, width: "90%" },
            ]}
            onPress={() =>
              this.props.navigation.navigate("Liste de Courses", {
                data: this.state.holidays,
              })
            }
          >
            <Text style={globalStyles.bigButtonText}>
              Voir la liste de courses
            </Text>
          </Pressable>
          <View style={[globalStyles.editableRow]}>
            <Text style={[globalStyles.rowText, { flex: 0, width: "33%" }]}>
              Date
            </Text>
            <Text style={[globalStyles.rowText, { flex: 1 }]}>Repas</Text>
          </View>

          <FlatList
            data={this.state.arrayHolder}
            extraData={this.state.arrayHolder}
            keyExtractor={(index: any) => index.toString()}
            renderItem={({ item }) => (
              <EditableMealRow
                holidaysMeal={item}
                onLunchChange={(meal) => this.onMealChange(item, meal, lunch)}
                onDinerChange={(meal) => this.onMealChange(item, meal, diner)}
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
