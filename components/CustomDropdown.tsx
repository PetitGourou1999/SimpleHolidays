import { FontAwesome } from "@expo/vector-icons";
import React, { FC, ReactElement, useRef, useState } from "react";
import {
  FlatList,
  Modal,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Colors from "../constants/Colors";
import globalStyles from "../constants/Styles";

interface Props {
  iconLeft?: string;
  style: StyleProp<ViewStyle> | undefined;
  label: string;
  data: Array<{ label: string; value: any }>;
  onSelect: (item: { label: string; value: any }) => void;
}

const CustomDropdown: FC<Props> = ({
  iconLeft,
  style,
  label,
  data,
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
        setDropdownTop(py + h);
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
              { top: dropdownTop, left: dropdownLeft, width: dropdownWidth },
            ]}
          >
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

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

const styles = StyleSheet.create({
  button: {
    zIndex: 1,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: Colors.light.white,
  },
  buttonText: {
    flex: 1,
    textAlign: "center",
    fontFamily: "WorkSansRegular",
  },
  icon: {
    color: Colors.light.darkBlue,
  },
  dropdown: {
    flex: 1,
    position: "absolute",
    backgroundColor: Colors.light.white,
    borderRadius: 5,
    ...globalStyles.overlayShadow,
  },
  overlay: {
    width: "100%",
    height: "100%",
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: Colors.light.grey,
  },
});

export default CustomDropdown;
