import { Meal } from "../../types/Types";
import { diner, lunch } from "../data/MealTimes";

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
