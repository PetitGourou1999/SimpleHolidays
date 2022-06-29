import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import TagInput from "react-native-tags-input";
import Colors from "../../constants/Colors";
import globalStyles from "../../constants/Styles";
import CustomDatePicker from "../CustomDatePicker";

export default class HolidaysForm extends React.Component {
  state = {
    selectedDateStart: new Date(),
    selectedDateEnd: new Date(),
    tags: {
      tag: "",
      tagsArray: [],
    },
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
        <Text>Lieu</Text>
        <TextInput style={globalStyles.inputStyle} />
        <Text style={{ paddingTop: 30 }}>Date de début</Text>
        <CustomDatePicker
          initialDate={this.state.selectedDateStart}
          onChange={() => (date: Date) => this.setSelectedDateStart(date)}
        />
        <Text style={{ paddingTop: 20 }}>Date de fin</Text>
        <CustomDatePicker
          initialDate={this.state.selectedDateStart}
          onChange={() => (date: Date) => this.setSelectedDateEnd(date)}
        />
        <Text style={{ paddingTop: 30 }}>Participants</Text>
        <TagInput
          updateState={this.updateTagState}
          tags={this.state.tags}
          placeholder="Participants..."
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
          inputStyle={{ color: Colors.light.primary }}
          onFocus={() =>
            this.setState({ tagsColor: "#fff", tagsText: Colors.light.primary })
          }
          onBlur={() =>
            this.setState({ tagsColor: Colors.light.primary, tagsText: "#fff" })
          }
          autoCorrect={false}
          tagStyle={styles.tag}
          tagTextStyle={styles.tagText}
          keysForTag={", "}
        />
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
  },
});
