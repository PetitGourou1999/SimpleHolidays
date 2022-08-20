import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import globalStyles from "../../constants/Styles";
import storageHelper from "../../storage/AsyncStorageHelper";
import MealCard from "../cards/MealCard";

export default class ThemingList extends React.Component {
  state = {
    arrayHolder: [],
  };

  loadData = () => {
    storageHelper.getAllItems().then(
      (value) => {
        if (value !== undefined) {
          this.setState({
            arrayHolder: [],
          });
          value.forEach((element) => {
            if (element.themeName !== undefined) {
              this.setState({
                arrayHolder: [...this.state.arrayHolder, element],
              });
            }
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  componentDidMount = () => {
    this.loadData();
  };

  render() {
    return (
      <View style={[globalStyles.container, { width: "100%" }]}>
        <FlatList
          data={this.state.arrayHolder}
          extraData={this.state.arrayHolder}
          keyExtractor={(index: any) => index.toString()}
          renderItem={({ item }) => (
            <MealCard
              onDelete={() => this.loadData()}
              mealIdea={item}
            ></MealCard>
          )}
          style={[globalStyles.listStyle, { width: "100%" }]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
