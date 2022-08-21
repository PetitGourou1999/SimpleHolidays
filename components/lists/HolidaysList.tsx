import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import HolidaysCard from "../../components/cards/HolidaysCard";
import HolidaysForm from "../../components/forms/HolidaysForm";
import { MyStyles } from "../../constants/MyStyles";
import storageHelper from "../../storage/AsyncStorageHelper";

interface Props {
  navigation: any;
}

export default class HolidaysList extends React.Component<Props> {
  state = {
    isModalVisible: false,
    allHolidays: [],
    loaded: false,
  };

  loadData = () => {
    storageHelper.getAllItems().then(
      (value) => {
        if (value !== undefined) {
          this.setState({
            allHolidays: [],
          });
          value.forEach((element) => {
            if (element.players !== undefined) {
              this.setState({
                allHolidays: [...this.state.allHolidays, element],
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

  toggleModal = (visible: boolean) => {
    this.setState({ isModalVisible: visible });
  };

  render() {
    return (
      <View style={[MyStyles.styles().container, { width: "100%" }]}>
        <Pressable
          style={[MyStyles.styles().buttonPrimary, styles.buttonStyle]}
          onPress={() => this.toggleModal(true)}
        >
          <Text style={MyStyles.styles().bigButtonText}>
            Nouvelles Vacances !
          </Text>
        </Pressable>
        <Modal isVisible={this.state.isModalVisible}>
          <View style={[MyStyles.styles().modal, { flex: 0.7 }]}>
            <HolidaysForm
              onSave={() => this.loadData()}
              onCancel={() => this.toggleModal(false)}
            />
          </View>
        </Modal>
        <FlatList
          data={this.state.allHolidays}
          extraData={this.state.allHolidays}
          keyExtractor={(index: any) => index.toString()}
          renderItem={({ item, index }) => (
            <HolidaysCard
              holidays={item}
              navigation={this.props.navigation}
              onDelete={() => this.loadData()}
              onEdit={() => this.loadData()}
            ></HolidaysCard>
          )}
          style={[MyStyles.styles().listStyle, { width: "100%" }]}
          contentContainerStyle={{
            justifyContent: "center",
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    marginVertical: 20,
    width: "90%",
  },
});
