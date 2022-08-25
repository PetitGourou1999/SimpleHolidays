import { StyleSheet } from "react-native";
import storageHelper from "../storage/AsyncStorageHelper";
import Colors from "./Colors";

export class MyStyles {
  public static selectedTheme: string = "Default";

  public static loadTheme = async () => {
    return storageHelper.refreshTheme().then(
      (value) => {
        MyStyles.selectedTheme = storageHelper.getSelectedUserTheme().themeName;
      },
      (error) => {
        console.log(error);
      }
    );
  };

  public static styles = () => {
    let selectedTheme: string = MyStyles.selectedTheme;
    return StyleSheet.create({
      /** GLOBAL */

      container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: Colors[selectedTheme].background,
      },

      text: {
        fontFamily: "WorkSans",
      },

      inputText: {
        fontFamily: "WorkSansRegular",
      },

      /** FORM */

      formTitle: {
        fontFamily: "WorkSans",
        color: Colors[selectedTheme].primary,
        fontSize: 17,
        paddingBottom: 20,
        paddingTop: 10,
      },

      inputStyle: {
        fontFamily: "WorkSansRegular",
        marginVertical: 10,
        width: 300,
        height: 40,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: Colors[selectedTheme].white,
      },

      /** DATE PICKER */

      datePickerStyle: {
        width: 300,
        marginTop: 20,
        color: Colors[selectedTheme].primary,
      },

      /** BUTTON */

      buttonPrimary: {
        minWidth: 100,
        backgroundColor: Colors[selectedTheme].primary,
        color: Colors[selectedTheme].white,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        padding: 10,
      },

      bigButtonText: {
        color: Colors[selectedTheme].white,
        fontWeight: "bold",
        fontSize: 16,
        fontFamily: "WorkSans",
      },

      buttonSecondary: {
        backgroundColor: Colors[selectedTheme].secondary,
        color: Colors[selectedTheme].white,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        padding: 10,
      },

      /** MODAL */

      modal: {
        flex: 0.6,
        backgroundColor: Colors[selectedTheme].background,
        borderRadius: 20,
      },

      overlayShadow: {
        shadowRadius: 4,
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.5,
        shadowColor: Colors[selectedTheme].black,
      },

      /** ROW */

      editableRow: {
        width: "100%",
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: Colors[selectedTheme].background,
      },

      rowView: {
        width: "90%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      },

      rowText: {
        flex: 1,
        textAlign: "center",
        color: Colors[selectedTheme].darkestBlue,
        fontWeight: "bold",
        fontFamily: "WorkSans",
      },

      rowHintText: {
        flex: 0.1,
        padding: 20,
        paddingBottom: 0,
        color: Colors[selectedTheme].darkBlue,
        fontSize: 12,
      },

      rowBorderStyle: {
        width: "60%",
        borderTopWidth: 0.5,
        borderColor: Colors[selectedTheme].primary,
        paddingTop: 30,
      },

      /** CARD */

      cardHeader: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        alignItems: "center",
        marginBottom: 15,
      },

      cardTitle: {
        color: Colors[selectedTheme].secondary,
        fontWeight: "bold",
        fontFamily: "WorkSans",
        fontSize: 19,
      },

      cardText: {
        fontFamily: "WorkSansRegular",
        fontSize: 16,
        color: Colors[selectedTheme].grey,
      },

      cardWrapper: {
        backgroundColor: Colors[selectedTheme].quaternary,
        width: "100%",
      },

      cardContainer: {
        borderColor: Colors[selectedTheme].secondary,
        backgroundColor: Colors[selectedTheme].quaternary,
        width: "91%",
      },

      itemRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
      },

      pseudoStyle: {
        minWidth: "10%",
        justifyContent: "flex-end",
        textAlign: "right",
      },

      /** LIST */

      listStyle: {
        width: "90%",
        paddingLeft: 5,
      },

      listStyleScreen: {
        height: "0%",
        width: "90%",
        paddingHorizontal: 5,
        marginBottom: 50,
      },

      /** DATE TEXT */

      dateText: {
        fontFamily: "WorkSans",
        paddingRight: 10,
        minWidth: "33%",
        color: Colors[selectedTheme].darkBlue,
        fontWeight: "bold",
      },

      /** CHECK LIST ITEMS */

      taskContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        borderRadius: 10,
        padding: 5,
        paddingRight: 20,
        marginVertical: 5,
        minHeight: 40,
        backgroundColor: Colors[selectedTheme].white,
      },

      taskDelete: {
        marginLeft: 10,
      },
    });
  };
}
