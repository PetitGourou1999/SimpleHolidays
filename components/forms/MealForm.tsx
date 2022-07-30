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
import globalStyles from "../../constants/Styles";
import storageHelper from "../../storage/AsyncStorageHelper";
import { Ingredient, MealIdea } from "../../types/Types";

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
      title: tmpArray[index].title,
      quantity: quantity,
      checked: false,
      addedManually: false,
    };
    this.setState({ ingredients: [...tmpArray] });
  };

  render() {
    return (
      <View style={[globalStyles.container, { borderRadius: 20, padding: 10 }]}>
        <Text style={[globalStyles.formTitle]}>Nouvelle idée repas :</Text>
        <Text style={globalStyles.text}>Intitulé</Text>
        <TextInput
          style={globalStyles.inputStyle}
          onChangeText={(text) => this.setTitle(text)}
        />
        <Text style={globalStyles.text}>Ajouter des Ingrédients</Text>
        <View style={globalStyles.rowView}>
          <TextInput
            value={this.state.ingredientName}
            style={[globalStyles.inputStyle, { width: "88%" }]}
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
              <Text style={globalStyles.inputText}>{item.title}</Text>
              <NumericInput
                onChange={(value) => this.setIngredientQuantity(index, value)}
                value={item.quantity}
                totalHeight={35}
                totalWidth={70}
                minValue={1}
                rounded
                rightButtonBackgroundColor={Colors.light.mediumBlue}
                leftButtonBackgroundColor={Colors.light.lightBlue}
                borderColor={"transparent"}
                inputStyle={{ backgroundColor: Colors.light.white }}
              />
            </View>
          )}
          style={{
            paddingLeft: 3,
            width: "90%",
          }}
        />
        <View
          style={[
            globalStyles.editableRow,
            {
              justifyContent: "space-evenly",
              marginTop: "auto",
            },
          ]}
        >
          <Pressable onPress={() => this.props.onCancel()}>
            <View style={[globalStyles.buttonPrimary]}>
              <Text style={[globalStyles.text, { color: Colors.light.white }]}>
                Annuler
              </Text>
            </View>
          </Pressable>
          <Pressable onPress={() => this.saveMealIdea()}>
            <View style={[globalStyles.buttonPrimary]}>
              <Text style={[globalStyles.text, { color: Colors.light.white }]}>
                Ajouter
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {},
});
