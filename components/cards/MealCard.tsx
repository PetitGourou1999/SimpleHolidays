import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { Card } from "react-native-elements";
import Colors from "../../constants/Colors";
import { MyStyles } from "../../constants/MyStyles";
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

  constructor(props: any) {
    super(props);
    MyStyles.loadTheme().finally(() => {
      console.log(MyStyles.selectedTheme);
    });
  }

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
          wrapperStyle={MyStyles.styles().cardWrapper}
          containerStyle={MyStyles.styles().cardContainer}
        >
          <View style={MyStyles.styles().cardHeader}>
            <Text style={[MyStyles.styles().cardTitle, { marginLeft: "auto" }]}>
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
                color={Colors[MyStyles.selectedTheme].secondary}
              />
            </Pressable>
          </View>
          <Card.Divider color={Colors[MyStyles.selectedTheme].secondary} />
          {this.props.mealIdea.ingredients.map((item, index) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 5,
                }}
              >
                <Text style={MyStyles.styles().cardText}>
                  {item.title + " : "}
                </Text>
                <Text style={MyStyles.styles().itemRow}>{item.quantity}</Text>
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
