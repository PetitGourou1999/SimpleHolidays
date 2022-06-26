import React from "react";
import { Button, Pressable, Text, View } from "react-native";
import Modal from "react-native-modal";
import Bouchon from "../bouchon/Bouchon";
import HolidaysForm from "../components/forms/HolidaysForm";
import HolidaysCard from "../components/HolidaysCard";
import Colors from "../constants/Colors";
import globalStyles from "../constants/Styles";

export default class HolidaysScreen extends React.Component {
  state = {
    isModalVisible: false,
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
          <View style={globalStyles.modal}>
            <HolidaysForm />
            <Button
              title="Hide modal"
              onPress={() => this.toggleModal(false)}
            />
          </View>
        </Modal>
        <HolidaysCard
          holidays={Bouchon}
          navigation={this.props.navigation}
        ></HolidaysCard>
      </View>
    );
  }
}
