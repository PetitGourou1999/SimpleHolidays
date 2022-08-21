import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { MyStyles } from "../../constants/MyStyles";
import storageHelper from "../../storage/AsyncStorageHelper";
import MealCard from "../cards/MealCard";

export default class ThemingList extends React.Component {
  state = {
    arrayHolder: [],
  };

  constructor(props: any) {
    super(props);
    MyStyles.loadTheme().finally(() => {
      console.log(MyStyles.selectedTheme);
    });
  }

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
      <View style={[MyStyles.styles().container, { width: "100%" }]}>
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
          style={[MyStyles.styles().listStyle, { width: "100%" }]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
