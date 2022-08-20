export type SelectedTheme = {
  storageKey: string;
  themeName: string;
};

export type Player = {
  pseudo: string;
};

export type Miscellaneous = {
  storageKey: string;
  title: string;
  checked: boolean;
};

export type Ingredient = {
  index: number;
  title: string;
  quantity: number;
  checked: boolean;
  addedManually: boolean;
};

export type MealIdea = {
  storageKey: string;
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
  player: Player;
};

export type PlayerSpendings = {
  player: Player;
  total: number;
};

export type PlayerDebt = {
  player: Player;
  otherPlayer: Player;
  debt: number;
};

export type Holidays = {
  storageKey: string;
  title: string;
  dateStart: Date;
  dateEnd: Date;
  players: Player[];
  activities: Activity[];
  meals: MealsOfTheDay[];
  groceries: Ingredient[];
  spendings: Spending[];
};
