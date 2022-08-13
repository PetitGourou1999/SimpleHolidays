import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-elements";
import Colors from "../../constants/Colors";
import globalStyles from "../../constants/Styles";
import storageHelper from "../../storage/AsyncStorageHelper";
import { Holidays } from "../../types/Types";
import DeletionModal from "../DeletionModal";

interface Props {
  holidays: Holidays;
  navigation: any;
  onDelete: any;
}

export default class HolidaysCard extends React.Component<Props> {
  state = {
    loaded: false,
    isModalVisible: false,
  };

  toggleModal = (visible: boolean) => {
    this.setState({ isModalVisible: visible });
  };

  onPressButton = (screenName: string) => {
    this.props.navigation.navigate(screenName, { data: this.props.holidays });
  };

  onCancel = () => {
    this.toggleModal(false);
  };

  onDelete = () => {
    storageHelper.removeData(this.props.holidays.storageKey).then(
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
          <View style={[globalStyles.cardHeader]}>
            <Text style={[globalStyles.cardTitle, { marginLeft: "auto" }]}>
              {this.props.holidays.title}
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
          <Card.Divider color={Colors.light.secondary} />
          <Pressable
            style={[styles.pressable]}
            onPress={() => this.onPressButton("Activités des Vacances")}
          >
            <Text style={styles.pressableText}>Activités</Text>
          </Pressable>
          <Pressable
            style={[styles.pressable]}
            onPress={() => this.onPressButton("Repas des Vacances")}
          >
            <Text style={styles.pressableText}>Repas</Text>
          </Pressable>
          <Pressable
            style={[styles.pressable]}
            onPress={() => this.onPressButton("Dépenses des Vacances")}
          >
            <Text style={styles.pressableText}>Dépenses</Text>
          </Pressable>
        </Card>
        <DeletionModal
          isVisible={this.state.isModalVisible}
          label={"Voulez-vous vraiment supprimer ces vacances ?"}
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

  pressable: {
    ...globalStyles.buttonSecondary,
    marginVertical: 5,
  },

  pressableText: {
    color: Colors.light.white,
    fontWeight: "bold",
    fontFamily: "WorkSans",
    fontSize: 15,
  },
});
