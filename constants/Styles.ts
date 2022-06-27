import { StyleSheet } from "react-native";
import Colors from "./Colors";

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.light.background,
  },

  editableRow: {
    width: "100%",
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.light.background,
  },

  inputStyle: {
    marginVertical: 10,
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: Colors.light.white,
  },

  datePickerStyle: {
    width: 300,
    marginTop: 20,
    color: Colors.light.primary,
  },

  buttonPrimary: {
    backgroundColor: Colors.light.primary,
    color: Colors.light.white,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 10,
  },

  buttonSecondary: {
    backgroundColor: Colors.light.secondary,
    color: Colors.light.white,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 10,
  },

  modal: {
    flex: 0.5,
    backgroundColor: "white",
    borderRadius: 20,
  },

  overlayShadow: {
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5,
    shadowColor: Colors.light.black,
  },
});

export default globalStyles;
