import * as Updates from "expo-updates";
import React from "react";
import { FlatList, NativeModules, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { MyStyles } from "../../constants/MyStyles";
import storageHelper from "../../storage/AsyncStorageHelper";
import { SelectedTheme } from "../../types/Types";
import ThemingItem from "../items/ThemingItem";

export default class ThemingList extends React.Component {
  state = {
    selectedTheme: {},
    arrayHolder: [],
  };

  loadData = () => {
    this.setState({ selectedTheme: MyStyles.selectedTheme });
    this.setState({ arrayHolder: Object.keys(Colors) });
  };

  componentDidMount = () => {
    this.loadData();
  };

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
                  this.reloadApp();
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

  reloadApp = () => {
    if (__DEV__) {
      NativeModules.DevSettings.reload();
    } else {
      Updates.reloadAsync();
    }
  };

  render() {
    return (
      <FlatList
        data={this.state.arrayHolder}
        extraData={this.state.arrayHolder}
        keyExtractor={(item: any, index: any) => index.toString()}
        renderItem={({ item }) => (
          <ThemingItem
            themeName={item}
            selected={item === this.state.selectedTheme}
            onPressTheme={() => this.changeTheme(item)}
          ></ThemingItem>
        )}
        contentContainerStyle={{ alignItems: "center" }}
        style={[{ width: "100%" }]}
      />
    );
  }
}

const styles = StyleSheet.create({});
