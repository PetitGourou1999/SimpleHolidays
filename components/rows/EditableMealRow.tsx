import React from "react";
import { Text, View } from "react-native";
import Colors from "../../constants/Colors";
import { diner, lunch } from "../../constants/data/MealTimes";
import globalStyles from "../../constants/Styles";
import { MealIdeas } from "../../default/Bouchon";
import { defaultDiner, defaultLunch } from "../../default/DefaultMeal";
import { MealsOfTheDay } from "../../types/Types";
import CustomDropdown from "../CustomDropdown";

interface Props {
  holidaysMeal: MealsOfTheDay;
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
    valueLunch: this.findMealByTime(lunch),
    valueDiner: this.findMealByTime(diner),
    //TODO : load meal ideas componentDidMount
    items: MealIdeas.map((item, index) => {
      return { label: item.title, value: item };
    }),
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
          }}
        >
          {new Date(this.props.holidaysMeal.date).toLocaleDateString([], {
            weekday: "long",
            day: "numeric",
          })}
        </Text>
        <CustomDropdown
          style={{ marginRight: 10 }}
          label={""}
          data={this.state.items}
          onSelect={() => {}}
        ></CustomDropdown>
        <CustomDropdown
          style={{}}
          label={""}
          data={this.state.items}
          onSelect={() => {}}
        ></CustomDropdown>
      </View>
    );
  }
}
