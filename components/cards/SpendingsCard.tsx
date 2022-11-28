import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-elements";
import Colors from "../../constants/Colors";
import { MyStyles } from "../../constants/MyStyles";
import MyStrings from "../../constants/text/MyStrings";
import { Spending } from "../../types/Types";

interface Props {
  spending: Spending;
}

export default class SpendingsCard extends React.Component<Props> {
  render() {
    return (
      <Card
        wrapperStyle={MyStyles.styles().cardWrapper}
        containerStyle={this.styles.cardContainer}
      >
        <Card.Title style={MyStyles.styles().cardTitle}>
          {this.props.spending.title}
        </Card.Title>
        <Card.Divider color={Colors[MyStyles.selectedTheme].secondary} />

        <View style={this.styles.row}>
          <Text style={MyStyles.styles().cardText}>
            {MyStrings.constants.montantLabel + " : "}
          </Text>
          <Text style={[MyStyles.styles().cardText, this.styles.amountStyle]}>
            {this.props.spending.amount + " €"}
          </Text>
        </View>
        <View style={MyStyles.styles().itemRow}>
          <Text style={MyStyles.styles().cardText}>
            {MyStrings.constants.paidLabel + ":"}
          </Text>
          <Text
            style={[MyStyles.styles().cardText, MyStyles.styles().pseudoStyle]}
          >
            {this.props.spending.player.pseudo}
          </Text>
        </View>
      </Card>
    );
  }

  private styles = StyleSheet.create({
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 5,
    },
    text: {
      ...MyStyles.styles().cardText,
      marginBottom: 5,
    },

    cardContainer: {
      ...MyStyles.styles().cardContainer,
      width: "90%",
    },

    amountStyle: {
      minWidth: "10%",
      justifyContent: "flex-end",
      textAlign: "right",
    },
  });
}
