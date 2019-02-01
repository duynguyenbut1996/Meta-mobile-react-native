import React, { Component } from 'react'
import {
  AsyncStorage,
  Keyboard,
  Image,
  View,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native'
import InputScrollView from 'react-native-input-scroll-view'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Icon from 'react-native-vector-icons/FontAwesome5'

import {
  BackgroundImage,
  FullButton,
  InputText,
  Loading,
  MainContainer,
  Text,
} from '../Components'

// Styles
import styles from './Styles/ForgotPasswordStyle'
import { Colors, Images, Metrics } from '../Themes'
import { LoginManager, AccessToken } from 'react-native-fbsdk'
import UserActions from '../Redux/UserRedux'
import { UserSelectors } from '../Redux/User/Selectors'

export class ForgotPasswordScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      reEmail: '',
    }
  }

  validateInput() {
    const { email, reEmail } = this.state
    let error = []
    if (!email) error.push('Email is Empty.')
    if (email && !this.validateEmail(email)) error.push('Email Invalid')
    if (!reEmail) error.push('Re-enter email is Empty.')
    if(!!email && !!reEmail && email != reEmail) error.push('Re-enter email is not correct')
    if (error.length > 0) {
      return error.join('\n')
    }
    return ''
  }

  validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  sendEmail = () => {
    const error = this.validateInput()
    if (!!error) {
      return this.alertButton(error)
    }
    this.props.forgotPassword(this.state.email)
    return Alert.alert('Successfully!',)
  }

  alertButton(error) {
    return Alert.alert('Send email error!', `${error}`)
  }

  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0,
      backgroundColor: '#000',
    },
    headerTitle: (
      <Text
        style={{
          flex: 1,
          color: '#fff',
          fontWeight: 'bold',
          flexDirection: 'row',
          justifyContent: 'center',
          textAlign: 'center',
          fontSize: 20,
          alignSelf: 'center',
        }}
      >
        Forgot Password
      </Text>
    ),
    headerLeft: (
      <Icon
        name={'long-arrow-alt-left'}
        size={25}
        color="#fff"
        style={{ paddingLeft: 15 }}
        onPress={() => navigation.navigate('Login')}
      />
    ),
    headerRight: (
      <Icon
        name={'chevron-left'}
        size={25}
        color="#000"
        style={{ paddingLeft: 15, opacity: 0 }}
      />
    ),
  })

  render() {
    const { email, reEmail } = this.state
    return (
      <MainContainer>
        <BackgroundImage source={Images.background} />
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <View
            style={[
              styles.BoxStyle,
              {
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}
          >
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 14,
                  paddingVertical: 20,
                }}
              >
                Enter your email address to find your password
              </Text>
              <View>
                <InputText
                  label="Email Address"
                  placeholder="username@email.com"
                  value={email}
                  onChangeText={email => this.setState({ email })}
                  autoCapitalize="none"
                  placeholderTextColor="#fff"
                />
              </View>
              <View>
                <InputText
                  label="RE-ENTER EMAIL ADDRESS"
                  placeholder="username@email.com"
                  value={reEmail}
                  onChangeText={reEmail => this.setState({ reEmail })}
                  autoCapitalize="none"
                  placeholderTextColor="#fff"
                />
              </View>
            </View>
          </View>
          <View style={[styles.BoxButton]}>
            <TouchableOpacity  onPress={this.sendEmail} style={[styles.sendEmail]}>
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    letterSpacing: 4,
                  }}
                >
                  SEND EMAIL
                </Text>
            </TouchableOpacity>
            <View style={[styles.goBack]}>
                <Icon
                  name={'long-arrow-alt-left'}
                  size={25}
                  color="#fff"
                  style={{ paddingLeft: 15, opacity: 0.6 }}
                  onPress={() => this.props.navigation.goBack()}
                />
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    letterSpacing: 4,
                    opacity: 0.6,
                  }}
                >
                  GO BACK
                </Text>
                <Text style={{ color: '#000' }}>hide</Text>
            </View>
          </View>
        </View>
      </MainContainer>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => bindActionCreators(UserActions, dispatch)
)(ForgotPasswordScreen)
