import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import NumericInput from "react-native-numeric-input";
import Colors from "../../constants/Colors";
import { MyStyles } from "../../constants/MyStyles";
import storageHelper from "../../storage/AsyncStorageHelper";
import { Ingredient, MealIdea } from "../../types/Types";
import ButtonBar from "./ButtonBar";

interface Props {
  onCancel: any;
  onSave: any;
}

export default class MealForm extends React.Component<Props> {
  state = {
    title: "",
    ingredientName: "",
    ingredients: [],
  };

  saveMealIdea = () => {
    if (this.state.title.trim() == "") {
      Alert.alert("Veuillez saisir un intitulé pour ce repas");
      return;
    }
    if (this.state.ingredients.length == 0) {
      Alert.alert("Veuillez ajouter des ingrédients");
      return;
    }

    let newMealIdea: MealIdea = {
      storageKey: storageHelper.makeid(8),
      ingredients: [...this.state.ingredients],
      title: this.state.title,
    };

    storageHelper.storeData(newMealIdea.storageKey, newMealIdea).then(
      () => {
        this.props.onSave();
        this.props.onCancel();
      },
      (error) => {
        console.log(error);
      }
    );
  };

  setTitle = (title: string) => {
    this.setState({ title: title });
  };

  setIngredientName = (ingredientName: string) => {
    this.setState({ ingredientName: ingredientName });
  };

  addIngredient = () => {
    if (this.state.ingredientName.trim() !== "") {
      let newIngredient: Ingredient = {
        index: this.state.ingredients.length,
        title: this.state.ingredientName,
        quantity: 1,
        checked: false,
        addedManually: false,
      };
      this.setState({
        ingredients: [...this.state.ingredients, newIngredient],
      });
      this.setState({ ingredientName: "" });
    }
  };

  setIngredientQuantity = (index: number, quantity: number) => {
    let tmpArray: Ingredient[] = this.state.ingredients;
    tmpArray[index] = {
      index: tmpArray[index].index,
      title: tmpArray[index].title,
      quantity: quantity,
      checked: false,
      addedManually: false,
    };
    this.setState({ ingredients: [...tmpArray] });
  };

  render() {
    return (
      <View style={[styles.contentContainer]}>
        <Text style={[MyStyles.styles().formTitle]}>Nouvelle idée repas :</Text>
        <Text style={MyStyles.styles.text}>Intitulé</Text>
        <TextInput
          style={MyStyles.styles().inputStyle}
          onChangeText={(text) => this.setTitle(text)}
        />
        <Text style={MyStyles.styles().text}>Ajouter des Ingrédients</Text>
        <View style={MyStyles.styles().rowView}>
          <TextInput
            value={this.state.ingredientName}
            style={[MyStyles.styles().inputStyle, { width: "88%" }]}
            onChangeText={(text) => this.setIngredientName(text)}
          />
          <Pressable onPress={() => this.addIngredient()}>
            <FontAwesome name="plus" size={20}></FontAwesome>
          </Pressable>
        </View>
        <FlatList
          data={this.state.ingredients}
          extraData={this.state.ingredients}
          keyExtractor={(index: any) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={[styles.flatListItem]}>
              <Text style={MyStyles.styles().inputText}>{item.title}</Text>
              <NumericInput
                onChange={(value) => this.setIngredientQuantity(index, value)}
                value={item.quantity}
                totalHeight={35}
                totalWidth={70}
                minValue={1}
                rounded
                rightButtonBackgroundColor={
                  Colors[MyStyles.selectedTheme].mediumBlue
                }
                leftButtonBackgroundColor={
                  Colors[MyStyles.selectedTheme].lightBlue
                }
                borderColor={"transparent"}
                inputStyle={{
                  backgroundColor: Colors[MyStyles.selectedTheme].white,
                }}
              />
            </View>
          )}
          style={{
            paddingLeft: 3,
            width: "90%",
          }}
        />
        <ButtonBar
          cancelLabel="Annuler"
          saveLabel="Ajouter"
          onSave={() => this.saveMealIdea()}
          onCancel={() => this.props.onCancel()}
        ></ButtonBar>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    ...MyStyles.styles().container,
    borderRadius: 20,
    padding: 10,
  },

  flatListItem: {
    ...MyStyles.styles().rowView,
    width: "100%",
    paddingVertical: 5,
  },
});
