import React from "react";
import { Button } from "react-native";
import { Card } from "react-native-elements";

interface Props {
  title: string;
  navigation: any;
}

export default class HolidaysCard extends React.Component<Props> {
  static navigationOptions = {};

  render() {
    return (
      <Card>
        <Card.Title>{this.props.title}</Card.Title>
        <Card.Divider />
        <Button
          title="Activités"
          onPress={() =>
            this.props.navigation.navigate("Activités des Vacances")
          }
        />
        <Button
          title="Repas"
          onPress={() => this.props.navigation.navigate("Repas des Vacances")}
        />
      </Card>
    );
  }
}
