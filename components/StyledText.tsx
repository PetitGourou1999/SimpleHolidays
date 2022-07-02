import React from "react";
import { Text, TextProps } from "react-native";

interface Props {
  textProps?: TextProps;
}
export default class WorkSansText extends React.Component<Props> {
  render() {
    return (
      <Text
        {...this.props.textProps}
        style={[
          this.props.textProps?.style,
          { fontFamily: "WorkSans_400Regular" },
        ]}
      />
    );
  }
}
