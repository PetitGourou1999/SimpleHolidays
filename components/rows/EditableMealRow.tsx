import React from "react";
import { Text, View } from "react-native";
import Colors from "../../constants/Colors";
import { diner, lunch } from "../../constants/data/MealTimes";
import globalStyles from "../../constants/Styles";
import { defaultDiner, defaultLunch } from "../../default/DefaultMeal";
import storageHelper from "../../storage/AsyncStorageHelper";
import { Meal, MealIdea, MealsOfTheDay } from "../../types/Types";
import CustomDropdown from "../CustomDropdown";

interface Props {
  holidaysMeal: MealsOfTheDay;
  onLunchChange(meal: Meal): any;
  onDinerChange(meal: Meal): any;
}

export default class EditableMealRow extends React.Component<Props> {
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

  setValuDinner = (item: MealIdea) => {
    let myDiner: Meal = {
      meal: item,
      time: diner,
    };

    this.setState({ valueDiner: myDiner });
    this.props.onDinerChange(myDiner);
  };

  render() {
    return (
      <View style={globalStyles.editableRow}>
        <Text
          style={{
            paddingRight: 10,
            minWidth: "33%",
            color: Colors.light.darkBlue,
            fontWeight: "bold",
            ...globalStyles.text,
          }}
        >
          {new Date(this.props.holidaysMeal.date).toLocaleDateString([], {
            weekday: "long",
            day: "numeric",
          })}
        </Text>
        <CustomDropdown
          style={{ marginRight: 10 }}
          label={this.state.valueLunch.meal.title}
          data={this.state.items}
          onSelect={(item) => this.setValueLunch(item.value)}
        ></CustomDropdown>
        <CustomDropdown
          style={{}}
          label={this.state.valueDiner.meal.title}
          data={this.state.items}
          onSelect={(item) => this.setValuDinner(item.value)}
        ></CustomDropdown>
      </View>
    );
  }
}
