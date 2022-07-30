import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-elements";
import Colors from "../../constants/Colors";
import globalStyles from "../../constants/Styles";
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
        <Card.Title style={globalStyles.cardTitle}>
          {this.props.spending.title}
        </Card.Title>
        <Card.Divider color={Colors.light.secondary} />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 5,
          }}
        >
          <Text style={globalStyles.cardText}>{"Montant : "}</Text>
          <Text style={[globalStyles.cardText, styles.amountStyle]}>
            {this.props.spending.amount + " €"}
          </Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={globalStyles.cardText}>{"Payé par : "}</Text>
          <Text style={[globalStyles.cardText, styles.pseudoStyle]}>
            {this.props.spending.player.pseudo}
          </Text>
        </View>
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
    backgroundColor: Colors.light.quaternary,
    width: "100%",
  },

  cardContainer: {
    borderColor: Colors.light.secondary,
    backgroundColor: Colors.light.quaternary,
    width: "90%",
  },

  amountStyle: {
    minWidth: "10%",
    justifyContent: "flex-end",
    textAlign: "right",
  },

  pseudoStyle: {
    minWidth: "10%",
    justifyContent: "flex-end",
    textAlign: "right",
  },

  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
});
