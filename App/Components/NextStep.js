import React, { Component } from 'react'
import { View, TouchableOpacity, Text, FlatList, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import PropTypes from 'prop-types'
import styles from '../Containers/Styles/CreateAccountStyles'
import glamorous from 'glamorous-native'

const Dot = glamorous.view(
  () => ({
    width: 8,
    height: 8,
    backgroundColor: 'rgba(255,255,255, 0.4)',
    borderRadius: 50,
    margin: 5,
  }),
  props => props.isActiveStep && { backgroundColor: '#fff' }
)

const width = Dimensions.get('window').width;

class NextStep extends Component {
  constructor(props) {
    super(props)
  }

  renderListDots() {
    const { counStep, isActiveStep } = this.props
    if (counStep.length === 0) return
    return counStep.map((item, index) => {
      return (
        <Dot
          key={index}
          isActiveStep={isActiveStep === index + 1 ? true : false}
        />
      )
    })
  }

  render() {
    const { content, backDisplay, onClickNext, onClickBack } = this.props

    return (
      <View style={[styles.stepByStep, { bottom: 0, position: 'relative' }]}>
        <TouchableOpacity
          onPress={() => {
            onClickNext()
          }}
        >
          <Text style={styles.stepText}>{content}</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 10,
            position: 'relative',
          }}
        >
          {this.renderListDots()}
          {backDisplay && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => {
                onClickBack()
              }}
            >
              <Icon name="long-arrow-left" size={30} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    )
  }
}

NextStep.propTypes = {
  navigate: PropTypes.string,
  content: PropTypes.string,
  counStep: PropTypes.array,
  style: PropTypes.object,
  backDisplay: PropTypes.bool,
  isActiveStep: PropTypes.number,
  navigation: PropTypes.object,
  onClickNext: PropTypes.func,
  onClickBack: PropTypes.func,
}

NextStep.defaultProps = {
  navigate: 'hub',
  counStep: [],
  content: 'Next Step',
  isActiveStep: 1,
  displayBack: false,
}

export default NextStep
