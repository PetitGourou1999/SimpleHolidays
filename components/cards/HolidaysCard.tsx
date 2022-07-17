import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-elements";
import Colors from "../../constants/Colors";
import globalStyles from "../../constants/Styles";
import storageHelper from "../../storage/AsyncStorageHelper";
import { Holidays } from "../../types/Types";

interface Props {
  holidays: Holidays;
  navigation: any;
  onDelete: any;
}

export default class HolidaysCard extends React.Component<Props> {
  state = {
    loaded: false,
  };

  _loadFontsAsync = async () => {
    let isLoaded = await Font.loadAsync({
      WorkSans: require("../../assets/fonts/WorkSans-Bold.ttf"),
    });
    this.setState({ loaded: isLoaded });
  };

  componentDidMount = () => {
    this._loadFontsAsync();
  };

  onPressButton = (screenName: string) => {
    this.props.navigation.navigate(screenName, { data: this.props.holidays });
  };

  onDelete = () => {
    storageHelper.removeData(this.props.holidays.storageKey).then(
      () => {
        this.props.onDelete();
      },
      (error) => {
        console.log(error);
      }
    );
  };

  render() {
    return (
      <Card
        wrapperStyle={styles.cardWrapper}
        containerStyle={styles.cardContainer}
      >
        <Card.Title>
          <View style={globalStyles.cardHeader}>
            <Text style={[globalStyles.cardTitle, { marginLeft: "auto" }]}>
              {this.props.holidays.title}
            </Text>
            <Pressable
              style={{
                marginLeft: "auto",
              }}
              onPress={() => this.onDelete()}
            >
              <FontAwesome
                name="trash"
                size={20}
                color={Colors.light.secondary}
              />
            </Pressable>
          </View>
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
    width: "91%",
  },

  pressable: {
    ...globalStyles.buttonSecondary,
    marginVertical: 5,
  },

  pressableText: {
    color: Colors.light.white,
    fontWeight: "bold",
    fontFamily: "WorkSans",
    fontSize: 15,
  },
});
