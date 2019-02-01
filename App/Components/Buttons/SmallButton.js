import glamorous from "glamorous-native";
import React from "react";
import PropTypes from "prop-types";

import Text from "../Typography/Text";

const SB = glamorous.touchableOpacity(
  ({ theme }) => ({
    backgroundColor: theme.Colors.button,
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5
  }),
  props => props.color && { backgroundColor: props.color }
);
SB.displayName = "buttons.SmallButton.SB";

const SmallButton = props => {
  return (
    <SB style={props.style} color={props.color} onPress={props.onPress}>
      <Text center small>
        {props.label}
      </Text>
    </SB>
  );
};

SmallButton.propTypes = {
  style: PropTypes.object,
  color: PropTypes.string,
  onPress: PropTypes.func,
  label: PropTypes.string
};

SmallButton.defaultProps = {
  style: null,
  color: null,
  onPress: () => {},
  label: ""
};

export default SmallButton;
