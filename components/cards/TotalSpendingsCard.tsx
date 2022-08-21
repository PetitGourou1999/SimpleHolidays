import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-elements";
import Colors from "../../constants/Colors";
import { MyStyles } from "../../constants/MyStyles";
import { Holidays, PlayerDebt, PlayerSpendings } from "../../types/Types";

interface Props {
  holidays: Holidays;
}

export default class TotalSpendingsCard extends React.Component<Props> {
  constructor(props: any) {
    super(props);
    MyStyles.loadTheme().finally(() => {
      console.log(MyStyles.selectedTheme);
    });
  }

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
          style={[
            MyStyles.styles().cardTitle,
            { color: Colors[MyStyles.selectedTheme].darkBlue },
          ]}
        >
          {"Total : " + theTotals.total.toString() + " €"}
        </Card.Title>
        <Card.Divider color={Colors[MyStyles.selectedTheme].darkBlue} />
        {theTotals.totalsForPlayers.map((item, index) => {
          return (
            <View style={MyStyles.styles().itemRow}>
              <Text style={MyStyles.styles().cardText}>
                {item.player.pseudo + " : "}
              </Text>
              <Text
                style={[
                  MyStyles.styles().cardText,
                  MyStyles.styles().pseudoStyle,
                ]}
              >
                {item.total + " €"}
              </Text>
            </View>
          );
        })}
        <Text style={{ marginBottom: 5 }}>{""}</Text>
        <Card.Divider color={Colors[MyStyles.selectedTheme].darkBlue} />
        <Card.Title
          style={[
            MyStyles.styles().cardTitle,
            { color: Colors[MyStyles.selectedTheme].darkBlue },
          ]}
        >
          {"Redevances"}
        </Card.Title>
        <Card.Divider color={Colors[MyStyles.selectedTheme].darkBlue} />
        {theTotals.totalsForPlayersToPay.map((item, index) => {
          if (item.debt > 0) {
            return (
              <View style={MyStyles.styles().itemRow}>
                <Text style={MyStyles.styles().cardText}>
                  {item.player.pseudo + " doit " + item.debt + " €"}
                </Text>
                <Text
                  style={[
                    MyStyles.styles().cardText,
                    MyStyles.styles().pseudoStyle,
                  ]}
                >
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
    ...MyStyles.styles().cardText,
    marginBottom: 5,
  },

  cardWrapper: {
    ...MyStyles.styles().cardWrapper,
    backgroundColor: Colors[MyStyles.selectedTheme].lightBlue,
  },

  cardContainer: {
    borderColor: Colors[MyStyles.selectedTheme].darkBlue,
    backgroundColor: Colors[MyStyles.selectedTheme].lightBlue,
    width: "90%",
  },
});
