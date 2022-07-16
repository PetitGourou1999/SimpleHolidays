import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import TagInput from "react-native-tags-input";
import Colors from "../../constants/Colors";
import globalStyles from "../../constants/Styles";
import { defaultDiner, defaultLunch } from "../../default/DefaultMeal";
import storageHelper from "../../storage/AsyncStorageHelper";
import { Activity, Holidays, MealsOfTheDay, Player } from "../../types/Types";
import CustomDatePicker from "../CustomDatePicker";

interface Props {
  onCancel: any;
  onSave: any;
}

export default class HolidaysForm extends React.Component<Props> {
  state = {
    location: "",
    selectedDateStart: new Date(),
    selectedDateEnd: new Date(),
    tags: {
      tag: "",
      tagsArray: [],
    },
  };

  getDates(startDate: Date, stopDate: Date) {
    let dateArray = [];
    let currentDate = new Date(startDate);
    while (currentDate <= stopDate) {
      dateArray.push(new Date(currentDate));
      currentDate = new Date(currentDate).setDate(
        new Date(currentDate).getDate() + 1
      );
    }
    return dateArray;
  }

  saveHolidays = () => {
    if (this.state.location.trim() == "") {
      Alert.alert("Veuillez saisir une destination pour les vacances");
      return;
    }
    if (
      new Date(this.state.selectedDateStart).getDate() >
      new Date(this.state.selectedDateEnd).getDate()
    ) {
      Alert.alert("La date de début doit se situer avant la date de fin");
      return;
    }
    if (this.state.tags.tagsArray.length == 0) {
      Alert.alert("Veuillez saisir le nom des participants");
      return;
    }

    let players: Player[] = [];
    let defaultMeals: MealsOfTheDay[] = [];
    let defaultActivities: Activity[] = [];

    let holidays: Holidays = {
      storageKey: storageHelper.makeid(8),
      title: this.state.location,
      dateStart: this.state.selectedDateStart,
      dateEnd: this.state.selectedDateEnd,
      players: [],
      activities: [],
      meals: [],
      spendings: [],
    };

    // Fill player
    for (let index = 0; index < this.state.tags.tagsArray.length; index++) {
      const element = this.state.tags.tagsArray[index];
      players.push({
        pseudo: element,
      });
    }

    holidays.players = players;

    // Fill Meals
    let allDates = this.getDates(
      this.state.selectedDateStart,
      this.state.selectedDateEnd
    );

    for (let index = 0; index < allDates.length; index++) {
      const myDate = allDates[index];
      let mealsOfTheDay: MealsOfTheDay = {
        date: myDate,
        meals: [defaultLunch, defaultDiner],
      };
      defaultMeals.push(mealsOfTheDay);
    }

    holidays.meals = defaultMeals;

    // Fill Activities
    for (let index = 0; index < allDates.length; index++) {
      const myDate = allDates[index];
      let activity: Activity = {
        title: "",
        date: myDate,
        location: this.state.location,
      };
      defaultActivities.push(activity);
    }

    holidays.activities = defaultActivities;

    storageHelper.storeData(holidays.storageKey, holidays).then(
      () => {
        this.props.onSave();
        this.props.onCancel();
      },
      (error) => {
        console.log(error);
      }
    );
  };

  setLocation = (location: string) => {
    this.setState({ location: location });
  };

  setSelectedDateStart = (date: any) => {
    this.setState({ selectedDateStart: date });
  };

  setSelectedDateEnd = (date: any) => {
    this.setState({ selectedDateEnd: date });
  };

  updateTagState = (tags: any) => {
    this.setState({
      tags: tags,
    });
  };

  render() {
    return (
      <View style={[globalStyles.container, { borderRadius: 20, padding: 10 }]}>
        <Text style={[globalStyles.formTitle]}>Détails des vacances</Text>
        <Text style={globalStyles.text}>Lieu</Text>
        <TextInput
          onChangeText={(text) => this.setLocation(text)}
          style={[globalStyles.inputStyle]}
        />
        <Text style={[globalStyles.text, { paddingTop: 10 }]}>
          Date de début
        </Text>
        <CustomDatePicker
          initialDate={this.state.selectedDateStart}
          onChange={(date: Date) => this.setSelectedDateStart(date)}
        />
        <Text style={[globalStyles.text, { paddingTop: 20 }]}>Date de fin</Text>
        <CustomDatePicker
          initialDate={this.state.selectedDateEnd}
          onChange={(date: Date) => this.setSelectedDateEnd(date)}
        />
        <Text style={[globalStyles.text, { paddingTop: 10 }]}>
          Participants
        </Text>
        <TagInput
          updateState={this.updateTagState}
          tags={this.state.tags}
          leftElement={
            <FontAwesome
              name="user"
              size={25}
              color={Colors.light.text}
            ></FontAwesome>
          }
          leftElementContainerStyle={{ marginLeft: 3 }}
          containerStyle={{ paddingTop: 5 }}
          inputContainerStyle={[globalStyles.inputStyle]}
          inputStyle={[globalStyles.inputText, { color: Colors.light.primary }]}
          onFocus={() =>
            this.setState({
              tagsColor: Colors.light.white,
              tagsText: Colors.light.primary,
            })
          }
          onBlur={() =>
            this.setState({
              tagsColor: Colors.light.primary,
              tagsText: Colors.light.white,
            })
          }
          autoCorrect={false}
          tagStyle={styles.tag}
          tagTextStyle={styles.tagText}
          keysForTag={", "}
        />
        <View
          style={[
            globalStyles.editableRow,
            {
              justifyContent: "space-evenly",
              marginTop: "auto",
            },
          ]}
        >
          <Pressable onPress={() => this.props.onCancel()}>
            <View style={[globalStyles.buttonPrimary]}>
              <Text style={[globalStyles.text, { color: Colors.light.white }]}>
                Annuler
              </Text>
            </View>
          </Pressable>
          <Pressable onPress={() => this.saveHolidays()}>
            <View style={[globalStyles.buttonPrimary]}>
              <Text style={[globalStyles.text, { color: Colors.light.white }]}>
                Ajouter
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tag: {
    backgroundColor: "#fff",
  },
  tagText: {
    color: Colors.light.primary,
    fontFamily: "WorkSansRegular",
  },
});
