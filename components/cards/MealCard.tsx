import React from "react";
import { StyleSheet, Text } from "react-native";
import { Card } from "react-native-elements";
import Colors from "../../constants/Colors";
import { MealIdea } from "../../types/Types";

interface Props {
  mealIdea: MealIdea;
}

export default class MealCard extends React.Component<Props> {
  render() {
    return (
      <Card
        wrapperStyle={styles.cardWrapper}
        containerStyle={styles.cardContainer}
      >
        <Card.Title
          style={{ color: Colors.light.secondary, fontWeight: "bold" }}
        >
          {this.props.mealIdea.title}
        </Card.Title>
        <Card.Divider color={Colors.light.secondary} />
        {this.props.mealIdea.ingredients.map((item, index) => {
          return (
            <Text style={{ alignSelf: "center" }}>
              {item.title + " : " + item.quantity}
            </Text>
          );
        })}
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: Colors.light.quaternary,
    width: "100%",
  },

  cardContainer: {
    borderColor: Colors.light.secondary,
    backgroundColor: Colors.light.quaternary,
    width: "90%",
  },
});
