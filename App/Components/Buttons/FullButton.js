import glamorous from "glamorous-native";
import React from "react";
import PropTypes from "prop-types";
import { Dimensions } from 'react-native';

import Text from "../Typography/Text";

const width = Dimensions.get('window').width
const mainRatio = 750/width;

const FB = glamorous.touchableOpacity(
  ({ theme }) => ({
    backgroundColor: theme.Colors.button,
    width: "100%"
  }),
  props => props.color && { backgroundColor: props.color }
);
FB.displayName = "buttons.FullButton.FB";

const FullButton = props => {
  return (
    <FB style={props.style} color={props.color} onPress={props.onPress}>
      <Text center bold h5 style={{
        margin: Math.floor(50/mainRatio),
        fontSize: Math.floor(26/mainRatio),
        fontWeight: 'bold',
        letterSpacing: Math.floor(8/mainRatio)
      }}>
        {props.label}
      </Text>
    </FB>
  );
};

FullButton.propTypes = {
  style: PropTypes.object,
  color: PropTypes.string,
  onPress: PropTypes.func,
  label: PropTypes.string
};

FullButton.defaultProps = {
  style: null,
  color: null,
  onPress: () => {},
  label: ""
};

export default FullButton;
