import React from "react";
import { FlatList, Text, View } from "react-native";
import EditableMealRow from "../components/rows/EditableMealRow";
import globalStyles from "../constants/Styles";

export default class HolidaysMealsScreen extends React.Component {
  state = {
    arrayHolder: [],
  };

  private data = this.props.route;
  private meals = this.data.params.data.meals;

  componentDidMount() {
    this.setState({ arrayHolder: [...this.meals] });
  }

  render() {
    return (
      <React.Fragment>
        <View style={[globalStyles.container]}>
          <Text style={[globalStyles.rowText, globalStyles.rowHintText]}>
            Pour pouvoir ajouter des repas, il faut ajouter des Idées Repas
            depuis la page dédiée
          </Text>
          <View style={globalStyles.rowBorderStyle}></View>
          <View style={[globalStyles.editableRow]}>
            <Text style={globalStyles.rowText}>Date</Text>
            <Text style={globalStyles.rowText}>Midi</Text>
            <Text style={globalStyles.rowText}>Soir</Text>
          </View>

          <FlatList
            data={this.state.arrayHolder}
            extraData={this.state.arrayHolder}
            keyExtractor={(index: any) => index.toString()}
            renderItem={({ item }) => (
              <EditableMealRow holidaysMeal={item}></EditableMealRow>
            )}
            style={{
              height: "0%",
              width: "90%",
              paddingHorizontal: 5,
              marginBottom: 50,
            }}
          />
        </View>
      </React.Fragment>
    );
  }
}
