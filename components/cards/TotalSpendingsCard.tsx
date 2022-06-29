import React from "react";
import { StyleSheet, Text } from "react-native";
import { Card } from "react-native-elements";
import Colors from "../../constants/Colors";
import { Holidays, PlayerSpendings } from "../../types/Types";

interface Props {
  holidays: Holidays;
}

export default class TotalSpendingsCard extends React.Component<Props> {
  computeTotal = () => {
    let total: number = 0;
    let totalsForPlayers: PlayerSpendings[] = [];

    for (let index = 0; index < this.props.holidays.players.length; index++) {
      const currentPlyer = this.props.holidays.players[index];
      totalsForPlayers.push({
        player: currentPlyer,
        total: 0,
      });
    }

    console.log(JSON.stringify(totalsForPlayers));

    for (let index = 0; index < this.props.holidays.spendings.length; index++) {
      let spending = this.props.holidays.spendings[index].amount;
      total += spending;
      let foundIndex = totalsForPlayers.findIndex(
        (totalForPlayer) =>
          totalForPlayer.player.pseudo ===
          this.props.holidays.spendings[index].player.pseudo
      );
      console.log(foundIndex);
      console.log(totalsForPlayers[foundIndex]);
      if (foundIndex !== -1) {
        totalsForPlayers[foundIndex] = {
          player: totalsForPlayers[foundIndex].player,
          total: (totalsForPlayers[foundIndex].total += spending),
        };
      }
    }

    return {
      total: total,
      totalsForPlayers: totalsForPlayers,
    };
  };

  render() {
    let theTotals = this.computeTotal();
    return (
      <Card
        wrapperStyle={styles.cardWrapper}
        containerStyle={styles.cardContainer}
      >
        <Card.Title
          style={{ color: Colors.light.darkBlue, fontWeight: "bold" }}
        >
          {"Total : " + theTotals.total.toString() + " €"}
        </Card.Title>
        <Card.Divider color={Colors.light.darkBlue} />
        {theTotals.totalsForPlayers.map((item, index) => {
          return <Text>{item.player.pseudo + " : " + item.total + " €"}</Text>;
        })}
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: Colors.light.lightBlue,
    width: "100%",
  },

  cardContainer: {
    borderColor: Colors.light.darkBlue,
    backgroundColor: Colors.light.lightBlue,
    width: "90%",
  },
});
