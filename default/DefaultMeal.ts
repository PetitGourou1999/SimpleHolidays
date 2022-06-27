import { diner, lunch } from "../constants/data/MealTimes";
import { Meal } from "../types/Types";

export const defaultLunch: Meal = {
  meal: {
    title: "",
    ingredients: [],
  },
  date: new Date(),
  time: lunch,
};

export const defaultDiner: Meal = {
  meal: {
    title: "",
    ingredients: [],
  },
  date: new Date(),
  time: diner,
};
