import { FontAwesome } from "@expo/vector-icons";
import React, { FC, ReactElement, useRef, useState } from "react";
import {
  FlatList,
  Modal,
  Platform,
  StatusBar,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Colors from "../constants/Colors";
import { MyStyles } from "../constants/MyStyles";

interface Props {
  iconLeft?: string;
  style: StyleProp<ViewStyle> | undefined;
  label: string;
  data: Array<{ label: string; value: any }>;
  isModal: boolean;
  onSelect: (item: { label: string; value: any }) => void;
}

const CustomDropdown: FC<Props> = ({
  iconLeft,
  style,
  label,
  data,
  isModal,
  onSelect,
}) => {
  const DropdownButton = useRef();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(undefined);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [dropdownLeft, setDropdownLeft] = useState(0);
  const [dropdownWidth, setDropdownWidth] = useState(0);

  const toggleDropdown = (): void => {
    visible ? setVisible(false) : openDropdown();
  };

  const openDropdown = (): void => {
    DropdownButton.current.measure(
      (fx: any, fy: any, w: any, h: any, px: any, py: any) => {
        let statusBarHeight =
          Platform.OS === "android" && !isModal ? StatusBar.currentHeight : 0;
        setDropdownTop(
          py + h - (statusBarHeight !== undefined ? statusBarHeight : 0)
        );
        setDropdownLeft(px);
        setDropdownWidth(w);
      }
    );
    setVisible(true);
  };

  const onItemPress = (item: any): void => {
    setSelected(item);
    onSelect(item);
    setVisible(false);
  };

  const renderIconLeft = () => {
    if (iconLeft !== undefined) {
      return (
        <FontAwesome
          name={iconLeft}
          size={17}
          style={styles.icon}
        ></FontAwesome>
      );
    }
  };

  const renderItem = ({ item }: any): ReactElement<any, any> => (
    <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
      <Text style={{ fontFamily: "WorkSansRegular", textAlign: "center" }}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  const renderDropdown = (): ReactElement<any, any> => {
    return (
      <Modal visible={visible} transparent animationType="none">
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}
        >
          <View
            style={[
              styles.dropdown,
              { elevation: 1 },
              { top: dropdownTop, left: dropdownLeft, width: dropdownWidth },
            ]}
          >
            <FlatList
              data={data}
              renderItem={(item) => renderItem(item)}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  const styles = StyleSheet.create({
    button: {
      zIndex: 1,
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      height: 40,
      paddingHorizontal: 10,
      borderRadius: 5,
      backgroundColor: Colors[MyStyles.selectedTheme].white,
    },
    buttonText: {
      flex: 1,
      textAlign: "center",
      fontFamily: "WorkSansRegular",
    },
    icon: {
      color: Colors[MyStyles.selectedTheme].darkBlue,
    },
    dropdown: {
      ...MyStyles.styles().overlayShadow,
      flex: 1,
      position: "absolute",
      backgroundColor: Colors[MyStyles.selectedTheme].white,
      borderRadius: 5,
    },
    overlay: {
      width: "100%",
      height: "100%",
    },
    item: {
      padding: 10,
      borderTopWidth: 1,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      borderColor: "#EEE",
    },
  });

  return (
    <TouchableOpacity
      ref={DropdownButton}
      style={[styles.button, style]}
      onPress={toggleDropdown}
    >
      {renderIconLeft()}
      {renderDropdown()}
      <Text style={styles.buttonText}>
        {(selected && selected.label) || label}
      </Text>

      <FontAwesome
        name="chevron-down"
        size={17}
        style={styles.icon}
      ></FontAwesome>
    </TouchableOpacity>
  );
};

export default CustomDropdown;
