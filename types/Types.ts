export type Ingredient = {
  name: string;
  quantity: number;
};

export type Meal = {
  name: string;
  ingredients: Ingredient[];
};

export type Activity = {
  name: string;
  location: string;
};

export type Holidays = {
  name: string;
  activities: Activity[];
  meals: Meal[];
};
