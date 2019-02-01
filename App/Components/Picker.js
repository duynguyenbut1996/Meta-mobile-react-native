import React, { Component } from 'react'
import { Picker, View, Dimensions } from 'react-native'
import PropTypes from 'prop-types'

import Text from './Typography/Text'
import { Colors, Metrics } from '../Themes/index';

const width = Dimensions.get('window').width
const mainRatio = 750/width;

class InputPicker extends Component {
  static propTypes = {
    label: PropTypes.string,
    data: PropTypes.array,
    prompt: PropTypes.string,
    onSelected: PropTypes.func
  }

  static defaultProps = {
    label: null,
    data: [],
    prompt: 'Select',
  }
  constructor(props) {
    super(props)
  }

  renderItem() {
    const { data } = this.props

    return data.map((item, index) => (
      <Picker.Item key={index} label={item.label || item} value={item.value || item} />
    ))
  }

  render() {
    const { label, prompt, onSelected, value, ...others } = this.props
    return (
      <View
        style={{
          borderBottom: 0.4,
          borderBottomWidth: 1,
          borderBottomColor: Colors.ricePaper,
          marginVertical: Metrics.baseMargin,
        }}
      >
        <Text description style={{ color: Colors.cloud }}>
          {label}
        </Text>
        <Picker
          style={{ height:  Math.floor(68/mainRatio), color: Colors.ricePaper }}
          selectedValue={value}
          onValueChange={select => onSelected(select)}
          prompt={prompt}
        >
          {this.renderItem()}
        </Picker>
      </View>
    )
  }
}
// Picker.displayName = "inputs.Picker";

export default InputPicker
