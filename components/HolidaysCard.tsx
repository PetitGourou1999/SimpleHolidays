import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { Card } from "react-native-elements";
import Colors from "../constants/Colors";
import globalStyles from "../constants/Styles";
import { Holidays } from "../types/Types";

interface Props {
  holidays: Holidays;
  navigation: any;
}

export default class HolidaysCard extends React.Component<Props> {
  onPressButton = (screenName: string) => {
    this.props.navigation.navigate(screenName, { data: this.props.holidays });
  };

  render() {
    return (
      <Card
        wrapperStyle={styles.cardWrapper}
        containerStyle={styles.cardContainer}
      >
        <Card.Title
          style={{ color: Colors.light.secondary, fontWeight: "bold" }}
        >
          {this.props.holidays.title}
        </Card.Title>
        <Card.Divider color={Colors.light.secondary} />
        <Pressable
          style={[styles.pressable]}
          onPress={() => this.onPressButton("Activités des Vacances")}
        >
          <Text style={styles.pressableText}>Activités</Text>
        </Pressable>
        <Pressable
          style={[styles.pressable]}
          onPress={() => this.onPressButton("Repas des Vacances")}
        >
          <Text style={styles.pressableText}>Repas</Text>
        </Pressable>
        <Pressable
          style={[styles.pressable]}
          onPress={() => this.onPressButton("Dépenses des Vacances")}
        >
          <Text style={styles.pressableText}>Dépenses</Text>
        </Pressable>
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

  pressable: {
    ...globalStyles.buttonSecondary,
    marginVertical: 5,
  },

  pressableText: {
    color: Colors.light.white,
    fontWeight: "bold",
  },
});