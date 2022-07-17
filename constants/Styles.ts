import { StyleSheet } from "react-native";
import Colors from "./Colors";

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.light.background,
  },

  text: {
    fontFamily: "WorkSans",
  },

  inputText: {
    fontFamily: "WorkSansRegular",
  },

  formTitle: {
    fontFamily: "WorkSans",
    color: Colors.light.primary,
    fontSize: 17,
    paddingBottom: 20,
    paddingTop: 10,
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
    fontFamily: "WorkSansRegular",
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
    minWidth: 100,
    backgroundColor: Colors.light.primary,
    color: Colors.light.white,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 10,
  },

  bigButtonText: {
    color: Colors.light.white,
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "WorkSans",
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
    flex: 0.6,
    backgroundColor: "white",
    borderRadius: 20,
  },

  overlayShadow: {
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5,
    shadowColor: Colors.light.black,
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
    color: Colors.light.darkestBlue,
    fontWeight: "bold",
    fontFamily: "WorkSans",
  },

  rowHintText: {
    flex: 0.1,
    padding: 20,
    paddingBottom: 0,
    color: Colors.light.darkBlue,
    fontSize: 12,
  },

  rowBorderStyle: {
    width: "60%",
    borderTopWidth: 0.5,
    borderColor: Colors.light.primary,
    paddingTop: 30,
  },

  cardHeader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
  },

  cardTitle: {
    color: Colors.light.secondary,
    fontWeight: "bold",
    fontFamily: "WorkSans",
    fontSize: 19,
  },

  cardText: {
    fontFamily: "WorkSansRegular",
    fontSize: 16,
    color: Colors.light.grey,
  },
});

export default globalStyles;
