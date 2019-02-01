import React, { Component } from "react";
import { TextInput, View, Dimensions } from "react-native";
import PropTypes from "prop-types";

import Text from "../Typography/Text";
import { Colors, Metrics } from "../../Themes/index";

const width = Dimensions.get('window').width
const mainRatio = 750/width;

class InputText extends Component {
  static propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChangeText: PropTypes.func,
    placeholder: PropTypes.string,
    placeholderTextColor: PropTypes.string
  };

  static defaultProps = {
    label: null,
    value: "",
    onChangeText: () => {},
    placeholder: '',
    placeholderTextColor: '#363636'
  };

  render() {
    const { label, value, onChangeText, placeholder, placeholderTextColor, ...others } = this.props;
    return (
      <View
        style={{
          borderBottom: 0.4,
          borderBottomWidth: 1,
          borderBottomColor: Colors.ricePaper,
          marginVertical: Metrics.baseMargin,
        }}
      >
        <Text description style={{
          color: Colors.cloud,
          fontSize: Math.floor(24/mainRatio),
        }}>
          {label}
        </Text>
        <TextInput
          style={{ height: Math.floor(70/mainRatio), color: Colors.ricePaper }}
          onChangeText={text => onChangeText(text)}
          value={value}
          {...others}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
        />
      </View>
    );
  }
}
InputText.displayName = "inputs.InputText";

export default InputText;
