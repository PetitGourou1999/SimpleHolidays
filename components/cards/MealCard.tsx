import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-elements";
import Colors from "../../constants/Colors";
import globalStyles from "../../constants/Styles";
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
        <Card.Title style={globalStyles.cardTitle}>
          {this.props.mealIdea.title}
        </Card.Title>
        <Card.Divider color={Colors.light.secondary} />
        {this.props.mealIdea.ingredients.map((item, index) => {
          return (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 5,
              }}
            >
              <Text style={globalStyles.cardText}>{item.title + " : "}</Text>
              <Text
                style={[
                  globalStyles.cardText,
                  {
                    minWidth: "10%",
                    textAlign: "center",
                  },
                ]}
              >
                {item.quantity}
              </Text>
            </View>
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
