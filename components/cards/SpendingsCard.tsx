import React from "react";
import { StyleSheet, Text } from "react-native";
import { Card } from "react-native-elements";
import Colors from "../../constants/Colors";
import { Spending } from "../../types/Types";

interface Props {
  spending: Spending;
}

export default class SpendingsCard extends React.Component<Props> {
  render() {
    return (
      <Card
        wrapperStyle={styles.cardWrapper}
        containerStyle={styles.cardContainer}
      >
        <Card.Title
          style={{ color: Colors.light.secondary, fontWeight: "bold" }}
        >
          {this.props.spending.title}
        </Card.Title>
        <Card.Divider color={Colors.light.secondary} />

        <Text>{"Montant : " + this.props.spending.amount + " €"}</Text>
        <Text>{"Payé par : " + this.props.spending.player.pseudo}</Text>
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
