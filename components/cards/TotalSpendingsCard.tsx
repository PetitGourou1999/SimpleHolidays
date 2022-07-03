import React from "react";
import { StyleSheet, Text } from "react-native";
import { Card } from "react-native-elements";
import Colors from "../../constants/Colors";
import { Holidays, PlayerDebt, PlayerSpendings } from "../../types/Types";

interface Props {
  holidays: Holidays;
}

export default class TotalSpendingsCard extends React.Component<Props> {
  computeTotal = () => {
    let total: number = 0;
    let totalsForPlayers: PlayerSpendings[] = [];
    let totalsForPlayersToPay: PlayerDebt[] = [];

    for (let index = 0; index < this.props.holidays.players.length; index++) {
      const currentPlyer = this.props.holidays.players[index];
      totalsForPlayers.push({
        player: currentPlyer,
        total: 0,
      });
    }

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

    for (let index = 0; index < totalsForPlayers.length; index++) {
      const element = totalsForPlayers[index];
      for (let index2 = 0; index2 < totalsForPlayers.length; index2++) {
        const element2 = totalsForPlayers[index2];
        if (index2 !== index) {
          totalsForPlayersToPay.push({
            player: element.player,
            otherPlayer: element2.player,
            debt: (element2.total - element.total) / totalsForPlayers.length,
          });
        }
      }
    }

    return {
      total: total,
      totalsForPlayers: totalsForPlayers,
      totalsForPlayersToPay: totalsForPlayersToPay,
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
        <Text style={{ marginBottom: 5 }}>{""}</Text>
        <Card.Divider color={Colors.light.darkBlue} />
        <Card.Title
          style={{ color: Colors.light.darkBlue, fontWeight: "bold" }}
        >
          {"Redevances"}
        </Card.Title>
        <Card.Divider color={Colors.light.darkBlue} />
        {theTotals.totalsForPlayersToPay.map((item, index) => {
          if (item.debt > 0) {
            return (
              <Text>
                {item.player.pseudo +
                  " doit " +
                  item.debt +
                  " € à " +
                  item.otherPlayer.pseudo}
              </Text>
            );
          }
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
