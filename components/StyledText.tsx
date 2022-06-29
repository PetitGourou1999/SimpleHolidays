import React from "react";
import { Text, TextProps } from "react-native";

interface Props {
  textProps?: TextProps;
}
export default class MonoText extends React.Component<Props> {
  render() {
    return (
      <Text
        {...this.props.textProps}
        style={[this.props.textProps?.style, { fontFamily: "space-mono" }]}
      />
    );
  }
}
