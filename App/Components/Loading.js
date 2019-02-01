import React, { Component } from 'react'
import { ActivityIndicator, View } from 'react-native'
import PropTypes from 'prop-types'

import { Colors } from '../Themes'
import styles from './Styles/LoadingStyles'

export default class Loading extends Component {
  static propTypes = {
    extraStyles: PropTypes.object,
    size: PropTypes.oneOfType([
      PropTypes.oneOf(['small', 'large']),
      PropTypes.number,
    ]),
    color: PropTypes.string,
  }

  static defaultProps = {
    extraStyles: undefined,
    size: 50,
    color: Colors.primary,
  }

  render() {
    const { extraStyles, ...others } = this.props
    const { animating } = this.props
    return (
      <View
        style={[
          styles.base,
          extraStyles,
          !animating && {
            backgroundColor: 'rgba(0,0,0,0)',
          },
        ]}
        pointerEvents="box-none"
      >
        <ActivityIndicator {...others} />
      </View>
    )
  }
}
