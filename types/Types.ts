export type Player = {
  pseudo: string;
};

export type Ingredient = {
  title: string;
  quantity: number;
};

export type MealIdea = {
  title: string;
  ingredients: Ingredient[];
};

export type Meal = {
  meal: MealIdea;
  time: string;
};

export type MealsOfTheDay = {
  date: Date;
  meals: Meal[];
};

export type Activity = {
  title: string;
  location: string;
  date: Date;
};

export type Spending = {
  title: string;
  amount: number;
};

export type Holidays = {
  title: string;
  dateStart: Date;
  dateEnd: Date;
  players: Player[];
  activities: Activity[];
  meals: MealsOfTheDay[];
  spendings: Spending[];
};
