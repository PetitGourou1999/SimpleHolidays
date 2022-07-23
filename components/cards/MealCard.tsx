import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-elements";
import Colors from "../../constants/Colors";
import globalStyles from "../../constants/Styles";
import storageHelper from "../../storage/AsyncStorageHelper";
import { MealIdea } from "../../types/Types";
import DeletionModal from "../DeletionModal";

interface Props {
  mealIdea: MealIdea;
  onDelete: any;
}

export default class MealCard extends React.Component<Props> {
  state = {
    isModalVisible: false,
  };

  toggleModal = (visible: boolean) => {
    this.setState({ isModalVisible: visible });
  };

  onDelete = () => {
    storageHelper.removeData(this.props.mealIdea.storageKey).then(
      () => {
        this.props.onDelete();
        this.toggleModal(false);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  render() {
    return (
      <React.Fragment>
        <Card
          wrapperStyle={styles.cardWrapper}
          containerStyle={styles.cardContainer}
        >
          <Card.Title>
            <View style={globalStyles.cardHeader}>
              <Text style={[globalStyles.cardTitle, { marginLeft: "auto" }]}>
                {this.props.mealIdea.title}
              </Text>
              <Pressable
                style={{
                  marginLeft: "auto",
                }}
                onPress={() => this.toggleModal(true)}
              >
                <FontAwesome
                  name="trash"
                  size={20}
                  color={Colors.light.secondary}
                />
              </Pressable>
            </View>
          </Card.Title>
          <Card.Divider color={Colors.light.secondary} />
          {this.props.mealIdea.ingredients.map((item, index) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 5,
                }}
              >
                <Text style={globalStyles.cardText}>{item.title + " : "}</Text>
                <Text
                  style={[
                    globalStyles.cardText,
                    {
                      minWidth: "10%",
                      textAlign: "right",
                    },
                  ]}
                >
                  {item.quantity}
                </Text>
              </View>
            );
          })}
        </Card>
        <DeletionModal
          isVisible={this.state.isModalVisible}
          label={"Voulez-vous vraiment supprimer cette idée repas ?"}
          onDelete={() => this.onDelete()}
          onCancel={() => this.toggleModal(false)}
        ></DeletionModal>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: Colors.light.quaternary,
    width: "100%",
  },

  cardContainer: {
    borderColor: Colors.light.secondary,
    backgroundColor: Colors.light.quaternary,
    width: "91%",
  },
});
