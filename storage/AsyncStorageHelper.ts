import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../constants/Colors";
import { SelectedTheme } from "./../types/Types";

class AsyncStorageHelper {
  public SELECTED_THEME_KEY = "selectedTheme";

  private selectedTheme: SelectedTheme = {
    storageKey: this.SELECTED_THEME_KEY,
    themeName: "Default",
  };

  constructor() {
    this.refreshTheme();
  }

  public makeid(length: number) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  public storeData = async (storageKey: string, value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(storageKey, jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  public getData = async (storageKey: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(storageKey);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };

  public removeData = async (storageKey: string) => {
    try {
      await AsyncStorage.removeItem(storageKey);
    } catch (e) {
      console.log(e);
    }
  };

  public getAllKeys = async () => {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
      return keys;
    } catch (e) {
      console.log(e);
    }
  };

  public getMultiple = async (storageKeys: string[]) => {
    let values;
    let jsonValues: any[] = [];
    try {
      values = await AsyncStorage.multiGet(storageKeys);
      values.forEach((element) => {
        jsonValues.push(
          JSON.parse(element[1] !== null ? element[1].toString() : "{}")
        );
      });
      return jsonValues;
    } catch (e) {
      console.log(e);
    }
  };

  public getAllItems = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const items = await this.getMultiple(keys);
      return items;
    } catch (e) {
      console.log(e);
    }
  };

  public refreshTheme = async () => {
    return this.getData(this.SELECTED_THEME_KEY).then(
      (value) => {
        if (value !== undefined && value !== null) {
          if (value.themeName !== undefined) {
            if (
              Object.keys(Colors).findIndex(
                (theme) => theme === value.themeName
              ) !== -1
            ) {
              this.selectedTheme = value;
            }
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  public getSelectedUserTheme = () => {
    return this.selectedTheme;
  };
}

const storageHelper = new AsyncStorageHelper();
export default storageHelper;
