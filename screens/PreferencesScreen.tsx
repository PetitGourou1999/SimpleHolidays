import * as Updates from "expo-updates";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MyStyles } from "../constants/MyStyles";
import storageHelper from "../storage/AsyncStorageHelper";
import { SelectedTheme } from "../types/Types";

export default class PreferencesScreen extends React.Component {
  constructor(props: any) {
    super(props);
    MyStyles.loadTheme().finally(() => {
      console.log(MyStyles.selectedTheme);
    });
  }

  changeTheme = (themeName: string) => {
    let selectedTheme: SelectedTheme = {
      storageKey: storageHelper.SELECTED_THEME_KEY,
      themeName: themeName,
    };

    storageHelper.removeData(storageHelper.SELECTED_THEME_KEY).then(
      (value) => {
        storageHelper.storeData(selectedTheme.storageKey, selectedTheme).then(
          (value) => {
            storageHelper.refreshTheme().then(
              (value) => {
                MyStyles.loadTheme().finally(() => {
                  console.log(MyStyles.selectedTheme);
                });
              },
              (error) => {
                console.log(error);
              }
            );
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  };

  restartApp = () => {
    Updates.reloadAsync();
  };

  render() {
    return (
      <View style={MyStyles.styles().container}>
        <Pressable
          style={[MyStyles.styles().buttonPrimary, styles.buttonStyle]}
          onPress={() => this.changeTheme("light")}
        >
          <Text style={MyStyles.styles().bigButtonText}>Default</Text>
        </Pressable>
        <Pressable
          style={[MyStyles.styles().buttonPrimary, styles.buttonStyle]}
          onPress={() => this.changeTheme("alternateOne")}
        >
          <Text style={MyStyles.styles().bigButtonText}>Alternate One</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    marginVertical: 20,
    width: "90%",
  },
});
