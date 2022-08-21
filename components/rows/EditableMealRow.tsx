import React from "react";
import { Text, View } from "react-native";
import { diner, lunch } from "../../constants/data/MealTimes";
import {
  defaultDiner,
  defaultLunch,
} from "../../constants/default/DefaultMeal";
import { MyStyles } from "../../constants/MyStyles";
import storageHelper from "../../storage/AsyncStorageHelper";
import { Meal, MealIdea, MealsOfTheDay } from "../../types/Types";
import CustomDropdown from "../CustomDropdown";

interface Props {
  holidaysMeal: MealsOfTheDay;
  onLunchChange(meal: Meal): any;
  onDinerChange(meal: Meal): any;
}

export default class EditableMealRow extends React.Component<Props> {
  constructor(props: any) {
    super(props);
    MyStyles.loadTheme().finally(() => {
      console.log(MyStyles.selectedTheme);
    });
  }

  findMealByTime = (time: string) => {
    let foundValue = this.props.holidaysMeal.meals.find((meal) => {
      return meal.time === time;
    });
    return foundValue === undefined
      ? time === lunch
        ? defaultLunch
        : defaultDiner
      : foundValue;
  };

  state = {
    valueLunch: this.findMealByTime(lunch) /*(Meal)*/,
    valueDiner: this.findMealByTime(diner) /*(Meal)*/,
    allMealIdeas: [],
    items: [],
  };

  componentDidMount = () => {
    storageHelper.getAllItems().then(
      (value) => {
        if (value !== undefined) {
          value.forEach((element) => {
            if (element.ingredients !== undefined) {
              this.setState({
                allMealIdeas: [...this.state.allMealIdeas, element],
              });
            }
            this.setState({
              items: this.state.allMealIdeas.map((item, index) => {
                return { label: item.title, value: item };
              }),
            });
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  setValueLunch = (item: MealIdea) => {
    let myLunch: Meal = {
      meal: item,
      time: lunch,
    };

    this.setState({ valueLunch: myLunch });
    this.props.onLunchChange(myLunch);
  };

  setValueDinner = (item: MealIdea) => {
    let myDiner: Meal = {
      meal: item,
      time: diner,
    };

    this.setState({ valueDiner: myDiner });
    this.props.onDinerChange(myDiner);
  };

  render() {
    return (
      <View style={MyStyles.styles().editableRow}>
        <Text style={MyStyles.styles().dateText}>
          {new Date(this.props.holidaysMeal.date).toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
          })}
        </Text>
        <View style={MyStyles.styles().container}>
          <CustomDropdown
            iconLeft="sun-o"
            style={{ marginBottom: 10 }}
            label={this.state.valueLunch.meal.title}
            data={this.state.items}
            onSelect={(item) => this.setValueLunch(item.value)}
          ></CustomDropdown>
          <CustomDropdown
            iconLeft="moon-o"
            style={{}}
            label={this.state.valueDiner.meal.title}
            data={this.state.items}
            onSelect={(item) => this.setValueDinner(item.value)}
          ></CustomDropdown>
        </View>
      </View>
    );
  }
}
