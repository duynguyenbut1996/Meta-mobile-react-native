import React, { Component } from 'react'
import { Image, View, Dimensions, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { bindActionCreators } from 'redux'

import UserActions from '../Redux/UserRedux'
import { UserSelectors } from '../Redux/User/Selectors'

import {
  BackgroundImage,
  ViewContainer,
  MainContainer,
  Text,
} from '../Components'

import { Images } from '../Themes'
import WalkThroughStyle from './Styles/WalkThroughStyle'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width
const mainRatio = 750 / width


export class WalkThroughScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      step: 0,
    }
  }

  nextStep = () => {
    this.setState({
      step: this.state.step + 1,
    })
  }

  preStep = () => {
    this.setState({
      step: this.state.step - 1,
    })
  }

  onPressSkip = () => {
    this.props.checkIsNewUser(false);
    this.props.navigation.navigate('Hub')
  }

  render() {
    const { step } = this.state;
    const { currentGame } = this.props;

    const walkThrough = [
      {
        title: 'Create a Team for IEL',
        text: 'To participate in IEL, create a team on meta, invite your friends, and register your team to the competition',
        img: Images[`walkThrough${currentGame}1`],
        step: 0
      },
      {
        title: 'Find a Team to join in IEL',
        text: 'Don’t have a team but looking for one to join? Search for teams that are looking for someone with your fire',
        img: Images[`walkThrough${currentGame}2`],
        step: 1
      },
      {
        title: 'Find Players to Join your Team',
        text: 'Find players with the right skill level and experience to join your amazing team for IEL',
        img: Images[`walkThrough${currentGame}3`],
        step: 2
      }
    ]

    // console.log('walkThrough', walkThrough);
    
    return (
      <MainContainer>
        <BackgroundImage source={Images.background} />
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <View style={{ flex: 1 / 3 }} rr>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flex: 0.3,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <View
                  style={[WalkThroughStyle.dots, step === 0 && WalkThroughStyle.activeDots]}
                />
                <View style={[WalkThroughStyle.dots, step === 1 && WalkThroughStyle.activeDots]} />
                <View style={[WalkThroughStyle.dots, step === 2 && WalkThroughStyle.activeDots]} />
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 0.7,
                }}
              >
                <Text style={WalkThroughStyle.textTitle}>
                  {walkThrough[step].title}
                </Text>
                <Text style={WalkThroughStyle.text}>
                  {walkThrough[step].text}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 2 / 3 }}>
            <View style={{ flexDirection: 'column', flex: 1 }}>
              <View style={{ flex: 6 }}>
                <Image
                  style={{
                    height: '100%',
                    width: '100%',
                    resizeMode: 'contain',
                    paddingHorizontal: 20,
                  }}
                  source={walkThrough[step].img}
                />
              </View>
              <View style={[WalkThroughStyle.skipButton, { flex: 1 }]}>
              {
                step != 0 ?
                <Icon
                  name={'long-arrow-alt-left'}
                  size={25}
                  color="#fff"
                  style={{ paddingLeft: 15 }}
                  onPress={this.preStep}
                />
                :
                <Text style={{opacity: 0}}>Hide</Text>
              }
              <TouchableOpacity onPress={this.onPressSkip}>
                <Text style={WalkThroughStyle.skipText}>SKIP</Text>
              </TouchableOpacity>
              {
                step != 2 ?
                <Icon
                  name={'long-arrow-alt-right'}
                  size={25}
                  color="#fff"
                  style={{ paddingRight: 15 }}
                  onPress={this.nextStep}
                />
                :
                <Text style={{opacity: 0}}>Hide</Text>
              }
              </View>
            </View>
          </View>
        </View>
      </MainContainer>
    )
  }
}

export default connect(state => ({ currentGame: UserSelectors.getCurrentGame(state) }), dispatch =>
bindActionCreators(
  {
    checkIsNewUser: UserActions.checkIsNewUser,
  },
  dispatch
))(WalkThroughScreen)
