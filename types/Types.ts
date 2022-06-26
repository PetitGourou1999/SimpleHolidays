export type Ingredient = {
  title: string;
  quantity: number;
};

export type Meal = {
  title: string;
  ingredients: Ingredient[];
};

export type Activity = {
  title: string;
  location: string;
};

export type Spending = {
  title: string;
  amount: number;
};

export type Holidays = {
  title: string;
  activities: Activity[];
  meals: Meal[];
  spendings: Spending[];
};
