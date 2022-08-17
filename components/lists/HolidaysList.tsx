import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import HolidaysCard from "../../components/cards/HolidaysCard";
import HolidaysForm from "../../components/forms/HolidaysForm";
import globalStyles from "../../constants/Styles";
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
      <View style={[globalStyles.container, { width: "100%" }]}>
        <Pressable
          style={[globalStyles.buttonPrimary, styles.buttonStyle]}
          onPress={() => this.toggleModal(true)}
        >
          <Text style={globalStyles.bigButtonText}>Nouvelles Vacances !</Text>
        </Pressable>
        <Modal isVisible={this.state.isModalVisible}>
          <View style={[globalStyles.modal, { flex: 0.7 }]}>
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
              onDelete={() => this.loadData()}
              holidays={item}
              navigation={this.props.navigation}
            ></HolidaysCard>
          )}
          style={[globalStyles.listStyle, { width: "100%" }]}
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
