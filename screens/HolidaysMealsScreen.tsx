import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
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

    let savedMeal = mealsOfTheDate[foundIndexTime];

    mealsOfTheDate[foundIndexTime] = meal;

    holidaysMeals[foundIndexDate] = {
      date: holidaysMeals[foundIndexDate].date,
      meals: mealsOfTheDate,
    };

    this.holidays.meals = holidaysMeals;

    let indexCount =
      holidaysGroceries.length === 0
        ? 0
        : Math.max(
            ...this.state.holidays.groceries.map((o: Ingredient) => o.index)
          ) + 1;

    // Update Groceries : add Ingredients
    for (let k = 0; k < meal.meal.ingredients.length; k++) {
      let foundIndex = holidaysGroceries.findIndex(
        (ingredient) =>
          ingredient.title === meal.meal.ingredients[k].title &&
          ingredient.checked === false
      );

      if (foundIndex != -1) {
        holidaysGroceries[foundIndex] = {
          index: holidaysGroceries[foundIndex].index,
          title: holidaysGroceries[foundIndex].title,
          quantity:
            holidaysGroceries[foundIndex].quantity +
            meal.meal.ingredients[k].quantity,
          checked: holidaysGroceries[foundIndex].checked,
          addedManually: false,
        };
      } else {
        if (meal.meal.ingredients[k].title !== "") {
          let ingredientToAdd = meal.meal.ingredients[k];
          ingredientToAdd.index = indexCount;
          holidaysGroceries.push(ingredientToAdd);
          indexCount++;
        }
      }
    }

    // Update Groceries : delete Ingredients
    for (let k = 0; k < savedMeal.meal.ingredients.length; k++) {
      let foundIndex = holidaysGroceries.findIndex(
        (ingredient) => ingredient.title === savedMeal.meal.ingredients[k].title
      );
      if (foundIndex != -1) {
        holidaysGroceries[foundIndex] = {
          index: holidaysGroceries[foundIndex].index,
          title: holidaysGroceries[foundIndex].title,
          quantity:
            holidaysGroceries[foundIndex].quantity -
            savedMeal.meal.ingredients[k].quantity,
          checked: holidaysGroceries[foundIndex].checked,
          addedManually: false,
        };

        if (holidaysGroceries[foundIndex].quantity <= 0) {
          holidaysGroceries.splice(foundIndex, 1);
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
            style={[globalStyles.buttonPrimary, styles.buttonStyle]}
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
            style={styles.listStyles}
          />
        </View>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    marginVertical: 20,
    width: "90%",
  },

  listStyles: {
    height: "0%",
    width: "90%",
    paddingHorizontal: 5,
    marginBottom: 50,
  },
});
