import React, { Component } from 'react'
import { View, Text, Image, Picker, TouchableOpacity } from 'react-native'
import styles from './styles/HeroPicker'

export class HeroPicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Header',
    }
  }

  renderItem() {
    const { data = [] } = this.props

    const options = data.map((item, index) => (
      <Picker.Item
        key={index}
        label={item.label || item}
        value={item.value || item}
        style={{ backgroundColor: 'black'}}
      />
    ))
    return [
      <Picker.Item
        key="first-option"
        enabled={false}
        label={'Pick hero'}
        value={null}
      />,
    ].concat(options)
  }

  render() {
    const { heros = [], onSelected, data, onRemove } = this.props
    const selected = data.filter(hero => heros.includes(hero.value))
    return (
      <View style={styles.pickerBox}>
        {selected.map(hero => (
          <TouchableOpacity
            key={hero.value}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              maxWidth: 300 / selected.length,
            }}
            onPress={() => onRemove(hero.value)}
          >
            <Image
              style={{ width: 30, height: 30, borderRadius: 15 }}
              source={{ uri: hero.image }}
            />
            <Text numberOfLines={1} style={{ color: 'white', lineHeight: 25 }}>
              {hero.label}
            </Text>
          </TouchableOpacity>
        ))}
        {selected.length < 3 ? (
          <Picker
            style={styles.picker}
            onValueChange={select => onSelected(select)}
            selectedValue=""
          >
            {this.renderItem()}
          </Picker>
        ) : null}
      </View>
    )
  }
}

export default HeroPicker
