import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import Modal from "react-native-modal";
import HolidaysCard from "../components/cards/HolidaysCard";
import HolidaysForm from "../components/forms/HolidaysForm";
import Colors from "../constants/Colors";
import globalStyles from "../constants/Styles";
import storageHelper from "../storage/AsyncStorageHelper";

export default class HolidaysScreen extends React.Component {
  state = {
    isModalVisible: false,
    allHolidays: [],
  };
  loadData = () => {
    storageHelper.getAllItems().then(
      (value) => {
        if (value !== undefined) {
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
      <View style={globalStyles.container}>
        <Pressable
          style={[
            globalStyles.buttonPrimary,
            { marginVertical: 20, width: "90%" },
          ]}
          onPress={() => this.toggleModal(true)}
        >
          <Text
            style={{
              color: Colors.light.white,
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Nouvelles Vancances !
          </Text>
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
              holidays={item}
              navigation={this.props.navigation}
            ></HolidaysCard>
          )}
          style={{
            paddingLeft: 3,
            width: "100%",
          }}
        />
      </View>
    );
  }
}
