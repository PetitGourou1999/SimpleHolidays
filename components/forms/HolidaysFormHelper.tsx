import { diner, lunch } from "../../constants/data/MealTimes";
import {
  defaultDiner,
  defaultLunch,
} from "../../constants/default/DefaultMeal";
import storageHelper from "../../storage/AsyncStorageHelper";
import { Activity, Holidays, MealsOfTheDay, Player } from "../../types/Types";

class HolidaysFormHelper {
  getDates(startDate: Date, stopDate: Date) {
    let dateArray: Date[] = [];
    let currentDate = new Date(startDate);
    while (currentDate <= stopDate) {
      dateArray.push(new Date(currentDate));
      currentDate = new Date(currentDate).setDate(
        new Date(currentDate).getDate() + 1
      );
    }
    return dateArray;
  }

  getUpdatedGroceries = (
    existingHolidays: Holidays,
    mealIndex: number,
    mealTimeIndex: number
  ) => {
    for (
      let index = 0;
      index <
      existingHolidays.meals[mealIndex].meals[mealTimeIndex].meal.ingredients
        .length;
      index++
    ) {
      const element =
        existingHolidays.meals[mealIndex].meals[mealTimeIndex].meal.ingredients[
          index
        ];

      let foundIngredientIndex = existingHolidays.groceries.findIndex(
        (groceriesItem) =>
          groceriesItem.title === element.title && !groceriesItem.checked
      );

      if (foundIngredientIndex != -1) {
        existingHolidays.groceries[foundIngredientIndex] = {
          index: existingHolidays.groceries[foundIngredientIndex].index,
          title: existingHolidays.groceries[foundIngredientIndex].title,
          quantity:
            existingHolidays.groceries[foundIngredientIndex].quantity -
            element.quantity,
          checked: existingHolidays.groceries[foundIngredientIndex].checked,
          addedManually: false,
        };
      }

      if (existingHolidays.groceries[foundIngredientIndex].quantity <= 0) {
        existingHolidays.groceries.splice(foundIngredientIndex, 1);
      }
    }

    return existingHolidays;
  };

  getCorrespondingHolidays = (
    location: string,
    dateStart: Date,
    dateEnd: Date,
    players: Player[],
    existingHolidays?: Holidays
  ) => {
    let defaultMeals: MealsOfTheDay[] = [];
    let defaultActivities: Activity[] = [];

    let holidays: Holidays =
      existingHolidays === undefined
        ? {
            storageKey: storageHelper.makeid(8),
            title: location,
            dateStart: dateStart,
            dateEnd: dateEnd,
            players: players,
            activities: [],
            meals: [],
            groceries: [],
            spendings: [],
          }
        : existingHolidays;

    holidays.players = players;
    holidays.title = location;
    holidays.dateStart = dateStart;
    holidays.dateEnd = dateEnd;

    let allDates = this.getDates(dateStart, dateEnd);

    // Update Groceries : delete Ingredients
    if (existingHolidays !== undefined) {
      for (let index = 0; index < existingHolidays.meals.length; index++) {
        const myMeals = existingHolidays.meals[index];
        let foundIndex = allDates.findIndex(
          (date) =>
            new Date(date).setHours(0, 0, 0, 0).toString() ===
            new Date(myMeals.date).setHours(0, 0, 0, 0).toString()
        );

        // If the meal's date is no longer in the Holidays date range
        if (foundIndex == -1) {
          let foundIndexLunch = existingHolidays.meals[index].meals.findIndex(
            (meal) => meal.time === lunch
          );
          let foundIndexDiner = existingHolidays.meals[index].meals.findIndex(
            (meal) => meal.time === diner
          );

          existingHolidays = this.getUpdatedGroceries(
            existingHolidays,
            index,
            foundIndexLunch
          );
          existingHolidays = this.getUpdatedGroceries(
            existingHolidays,
            index,
            foundIndexDiner
          );
        }
      }
    }

    // Fill Meals
    for (let index = 0; index < allDates.length; index++) {
      const myDate: Date = allDates[index];
      let mealsOfTheDay: MealsOfTheDay = {
        date: myDate,
        meals: [defaultLunch, defaultDiner],
      };

      if (existingHolidays !== undefined) {
        let foundIndex = existingHolidays.meals.findIndex(
          (meal) =>
            new Date(meal.date).setHours(0, 0, 0, 0).toString() ===
            new Date(myDate).setHours(0, 0, 0, 0).toString()
        );
        if (foundIndex !== -1) {
          mealsOfTheDay = existingHolidays.meals[foundIndex];
        }
      }
      defaultMeals.push(mealsOfTheDay);
    }

    holidays.meals = defaultMeals;

    // Fill Activities
    for (let index = 0; index < allDates.length; index++) {
      const myDate: Date = allDates[index];
      let activity: Activity = {
        title: "",
        date: myDate,
        location: location,
      };

      if (existingHolidays !== undefined) {
        let foundIndex = existingHolidays.activities.findIndex(
          (activity) =>
            new Date(activity.date).setHours(0, 0, 0, 0).toString() ===
            new Date(myDate).setHours(0, 0, 0, 0).toString()
        );
        if (foundIndex !== -1) {
          activity = existingHolidays.activities[foundIndex];
        }
      }
      defaultActivities.push(activity);
    }

    holidays.activities = defaultActivities;

    // Edit Spendings
    if (existingHolidays !== undefined) {
      let spendingsLenght = existingHolidays.spendings.length;
      while (spendingsLenght--) {
        const element = existingHolidays.spendings[spendingsLenght];
        let foundIndex = players.findIndex(
          (player) => player.pseudo === element.player.pseudo
        );
        if (foundIndex === -1) {
          existingHolidays.spendings.splice(spendingsLenght, 1);
        }
      }
    }

    return holidays;
  };
}

const holidaysFormHelper = new HolidaysFormHelper();
export default holidaysFormHelper;
