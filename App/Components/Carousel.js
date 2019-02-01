import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import PropTypes from 'prop-types';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const mainRatio = width/750;

const styles = StyleSheet.create({
  stretch: {
    maxWidth: mainRatio*670 - 50,
    height: height * 28 / 100,
  }
});

export class MyCarousel extends Component {
  constructor (props) {
    super(props)
    this._renderItem = this._renderItem.bind(this);
    this._handleSnapToItem = this._handleSnapToItem.bind(this);
  }

  _renderItem ({ item, index }) {
    return (
      <View>
        <Image style={styles.stretch} source={{uri: item.image}} />
      </View>
    )
  }

  _handleSnapToItem (index) {
  }

  render () {
    return (
      <Carousel
        layout={'default'}
        ref={(c) => { this._carousel = c }}
        data={this.props.entries}
        renderItem={this._renderItem}
        sliderWidth={mainRatio*670}
        itemWidth={mainRatio*670 - 50}
        onSnapToItem={this._handleSnapToItem}
        firstItem={0}
      />
    )
  }
}

Carousel.propTypes = {
  entries: PropTypes.array,
  sliderWidth: PropTypes.number,
  itemWidth: PropTypes.number,
  firstItem: PropTypes.number
}

export default MyCarousel
