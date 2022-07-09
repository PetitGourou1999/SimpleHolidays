import React from "react";
import { Pressable, Text, View } from "react-native";
import Colors from "../constants/Colors";
import globalStyles from "../constants/Styles";
import storageHelper from "../storage/AsyncStorageHelper";

export default class ResetScreen extends React.Component {
  deleteAllData = () => {
    storageHelper.getAllKeys().then((keys) => {
      if (keys !== undefined) {
        for (let index = 0; index < keys.length; index++) {
          const key = keys[index];
          storageHelper.removeData(key);
        }
      }
    });
  };
  render() {
    return (
      <React.Fragment>
        <View style={[globalStyles.container, { justifyContent: "center" }]}>
          <Pressable onPress={() => this.deleteAllData()}>
            <View style={globalStyles.buttonSecondary}>
              <Text style={{ color: Colors.light.white, fontWeight: "bold" }}>
                Supprimer toutes les données
              </Text>
            </View>
          </Pressable>
        </View>
      </React.Fragment>
    );
  }
}
