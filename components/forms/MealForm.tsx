import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import NumericInput from "react-native-numeric-input";
import Colors from "../../constants/Colors";
import globalStyles from "../../constants/Styles";
import { Ingredient } from "../../types/Types";

export default class MealForm extends React.Component {
  state = {
    title: "",
    ingredientName: "",
    ingredients: [],
  };

  setTitle = (title: string) => {
    this.setState({ title: title });
  };

  setIngredientName = (ingredientName: string) => {
    this.setState({ ingredientName: ingredientName });
  };

  addIngredient = () => {
    let newIngredient: Ingredient = {
      title: this.state.ingredientName,
      quantity: 1,
    };
    this.setState({ ingredients: [...this.state.ingredients, newIngredient] });
  };

  setIngredientQuantity = (index: number, quantity: number) => {
    let tmpArray = this.state.ingredients;
    tmpArray[index] = {
      title: tmpArray[index].title,
      quantity: quantity,
    };
    this.setState({ ingredients: [...tmpArray] });
  };

  render() {
    return (
      <View style={[globalStyles.container, { borderRadius: 20, padding: 10 }]}>
        <Text>Intitulé</Text>
        <TextInput
          style={globalStyles.inputStyle}
          onChangeText={(text) => this.setTitle(text)}
        />
        <Text>Ajouter des Ingrédients</Text>
        <View style={styles.rowView}>
          <TextInput
            style={[globalStyles.inputStyle, { width: "70%" }]}
            onChangeText={(text) => this.setIngredientName(text)}
          />
          <Pressable onPress={() => this.addIngredient()}>
            <FontAwesome
              name="plus"
              size={20}
              style={styles.icon}
            ></FontAwesome>
          </Pressable>
        </View>
        <FlatList
          data={this.state.ingredients}
          extraData={this.state.ingredients}
          keyExtractor={(index: any) => index.toString()}
          renderItem={({ item, index }) => (
            <View
              style={[
                globalStyles.rowView,
                { width: "100%", paddingVertical: 5 },
              ]}
            >
              <Text>{item.title}</Text>
              <NumericInput
                onChange={(value) => this.setIngredientQuantity(index, value)}
                value={item.quantity}
                totalHeight={30}
                totalWidth={100}
                minValue={1}
                rounded
                rightButtonBackgroundColor={Colors.light.mediumBlue}
                leftButtonBackgroundColor={Colors.light.lightBlue}
                borderColor={Colors.light.lighterBlue}
              />
            </View>
          )}
          style={{
            paddingLeft: 3,
            width: "90%",
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {},
});
