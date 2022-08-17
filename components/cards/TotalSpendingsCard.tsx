import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-elements";
import Colors from "../../constants/Colors";
import globalStyles from "../../constants/Styles";
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
          style={[globalStyles.cardTitle, { color: Colors.light.darkBlue }]}
        >
          {"Total : " + theTotals.total.toString() + " €"}
        </Card.Title>
        <Card.Divider color={Colors.light.darkBlue} />
        {theTotals.totalsForPlayers.map((item, index) => {
          return (
            <View style={globalStyles.itemRow}>
              <Text style={globalStyles.cardText}>
                {item.player.pseudo + " : "}
              </Text>
              <Text style={[globalStyles.cardText, globalStyles.pseudoStyle]}>
                {item.total + " €"}
              </Text>
            </View>
          );
        })}
        <Text style={{ marginBottom: 5 }}>{""}</Text>
        <Card.Divider color={Colors.light.darkBlue} />
        <Card.Title
          style={[globalStyles.cardTitle, { color: Colors.light.darkBlue }]}
        >
          {"Redevances"}
        </Card.Title>
        <Card.Divider color={Colors.light.darkBlue} />
        {theTotals.totalsForPlayersToPay.map((item, index) => {
          if (item.debt > 0) {
            return (
              <View style={globalStyles.itemRow}>
                <Text style={globalStyles.cardText}>
                  {item.player.pseudo + " doit " + item.debt + " €"}
                </Text>
                <Text style={[globalStyles.cardText, globalStyles.pseudoStyle]}>
                  {"à " + item.otherPlayer.pseudo}
                </Text>
              </View>
            );
          }
        })}
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    ...globalStyles.cardText,
    marginBottom: 5,
  },

  cardWrapper: {
    ...globalStyles.cardWrapper,
    backgroundColor: Colors.light.lightBlue,
  },

  cardContainer: {
    borderColor: Colors.light.darkBlue,
    backgroundColor: Colors.light.lightBlue,
    width: "90%",
  },
});
