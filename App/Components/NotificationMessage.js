import React, { Component } from 'react'
import { View, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { CommonSelectors } from '../Redux/Common/Selectors'
import { bindActionCreators } from 'redux'
import CommonActions from '../Redux/CommonRedux'
import DropdownAlert from 'react-native-dropdownalert'

const width = Dimensions.get('window').width

class NotificationMessage extends Component {
  constructor(props) {
    super(props)
  }

  messageShow = message => {
    this.dropdown.alertWithType('error', 'Error', message)
    this.props.showMessage(false, '')
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show && nextProps.message) {
      this.messageShow(nextProps.message)
    }
  }

  render() {
    return (
      <View
        style={{ position: 'absolute', width, top: -18, margin: 0, left: 0 }}
      >
        <DropdownAlert
          activeStatusBarStyle={'none'}
          ref={ref => (this.dropdown = ref)}
          closeInterval={5000}
        />
      </View>
    )
  }
}

export default connect(
  ({ common }) => {
    return {
      show: CommonSelectors.getShow(common),
      message: CommonSelectors.alertMessage(common),
    }
  },
  dispatch =>
    bindActionCreators(
      {
        showMessage: CommonActions.notificationMessage,
      },
      dispatch
    )
)(NotificationMessage)
