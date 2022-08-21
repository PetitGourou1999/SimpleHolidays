import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import TagInput from "react-native-tags-input";
import Colors from "../../constants/Colors";
import { MyStyles } from "../../constants/MyStyles";
import storageHelper from "../../storage/AsyncStorageHelper";
import { Holidays, Player } from "../../types/Types";
import CustomDatePicker from "../CustomDatePicker";
import ButtonBar from "./ButtonBar";
import holidaysFormHelper from "./HolidaysFormHelper";

interface Props {
  onCancel: any;
  onSave: any;
  holidays?: Holidays;
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
    holidays: {},
  };

  componentWillMount = () => {
    this.setHolidays();
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

  setHolidays = () => {
    if (this.props.holidays !== undefined) {
      this.setState({ holidays: this.props.holidays });
      this.setLocation(this.props.holidays.title);
      this.setSelectedDateStart(new Date(this.props.holidays.dateStart));
      this.setSelectedDateEnd(new Date(this.props.holidays.dateEnd));

      let playersArray: string[] = [];
      for (let index = 0; index < this.props.holidays.players.length; index++) {
        const element = this.props.holidays.players[index];
        playersArray.push(element.pseudo);
      }
      this.setState({ tags: { tag: "", tagsArray: playersArray } });
    }
  };

  saveHolidays = () => {
    if (this.state.location.trim() == "") {
      Alert.alert("Veuillez saisir une destination pour les vacances");
      return;
    }
    if (
      new Date(this.state.selectedDateStart).getDate() >
        new Date(this.state.selectedDateEnd).getDate() &&
      new Date(this.state.selectedDateStart).getMonth() >
        new Date(this.state.selectedDateEnd).getMonth() &&
      new Date(this.state.selectedDateStart).getFullYear() >
        new Date(this.state.selectedDateEnd).getFullYear()
    ) {
      Alert.alert("La date de début doit se situer avant la date de fin");
      return;
    }
    if (this.state.tags.tagsArray.length == 0) {
      Alert.alert("Veuillez saisir le nom des participants");
      return;
    }

    let players: Player[] = [];

    // Fill player
    for (let index = 0; index < this.state.tags.tagsArray.length; index++) {
      const element = this.state.tags.tagsArray[index];
      players.push({
        pseudo: element,
      });
    }

    let holidays = holidaysFormHelper.getCorrespondingHolidays(
      this.state.location,
      new Date(this.state.selectedDateStart),
      new Date(this.state.selectedDateEnd),
      players,
      this.props.holidays
    );

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

  render() {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={this.styles.borderRadius}
        style={[this.styles.borderRadius]}
      >
        <ScrollView
          contentContainerStyle={[
            MyStyles.styles().container,
            this.styles.borderRadius,
          ]}
          style={[this.styles.borderRadius]}
        >
          <Text style={[MyStyles.styles().formTitle]}>
            Détails des vacances
          </Text>
          <Text style={MyStyles.styles().text}>Lieu</Text>
          <TextInput
            onChangeText={(text) => this.setLocation(text)}
            style={[MyStyles.styles().inputStyle]}
            value={this.state.location}
          />
          <Text style={[this.styles.textPadding10]}>Date de début</Text>
          <CustomDatePicker
            initialDate={this.state.selectedDateStart}
            onChange={(date: Date) => this.setSelectedDateStart(date)}
          />
          <Text style={[this.styles.textPadding20]}>Date de fin</Text>
          <CustomDatePicker
            initialDate={this.state.selectedDateEnd}
            onChange={(date: Date) => this.setSelectedDateEnd(date)}
          />
          <Text style={[this.styles.textPadding10]}>Participants</Text>
          <View>
            <TagInput
              updateState={this.updateTagState}
              tags={this.state.tags}
              leftElement={
                <FontAwesome
                  name="user"
                  size={25}
                  color={Colors[MyStyles.selectedTheme].text}
                ></FontAwesome>
              }
              leftElementContainerStyle={{ marginLeft: 3 }}
              containerStyle={{ paddingTop: 5 }}
              inputContainerStyle={[
                MyStyles.styles().inputStyle,
                { paddingLeft: 10 },
              ]}
              inputStyle={[
                MyStyles.styles().inputText,
                { color: Colors[MyStyles.selectedTheme].primary },
              ]}
              onFocus={() =>
                this.setState({
                  tagsColor: Colors[MyStyles.selectedTheme].white,
                  tagsText: Colors[MyStyles.selectedTheme].primary,
                })
              }
              onBlur={() =>
                this.setState({
                  tagsColor: Colors[MyStyles.selectedTheme].primary,
                  tagsText: Colors[MyStyles.selectedTheme].white,
                })
              }
              autoCorrect={false}
              tagStyle={this.styles.tag}
              tagTextStyle={this.styles.tagText}
              keysForTag={", "}
            />
          </View>
          <ButtonBar
            cancelLabel={"Annuler"}
            saveLabel={
              this.props.holidays === undefined ? "Ajouter" : "Modfier"
            }
            onSave={() => this.saveHolidays()}
            onCancel={() => this.props.onCancel()}
          ></ButtonBar>
        </ScrollView>
      </KeyboardAwareScrollView>
    );
  }

  private styles = StyleSheet.create({
    borderRadius: {
      borderRadius: 20,
    },

    textPadding10: {
      ...MyStyles.styles().text,
      paddingTop: 10,
    },

    textPadding20: {
      paddingTop: 20,
    },

    tag: {
      backgroundColor: "#fff",
      minHeight: 30,
    },

    tagText: {
      ...MyStyles.styles().text,
      color: Colors[MyStyles.selectedTheme].primary,
    },
  });
}
