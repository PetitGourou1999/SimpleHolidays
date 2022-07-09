import { diner, lunch } from "../constants/data/MealTimes";
import { Meal } from "../types/Types";

export const defaultLunch: Meal = {
  meal: {
    storageKey: "DEFAULTLUNCH",
    title: "",
    ingredients: [],
  },
  time: lunch,
};

export const defaultDiner: Meal = {
  meal: {
    storageKey: "DEFAULTDINNER",
    title: "",
    ingredients: [],
  },
  time: diner,
};
