import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Keyboard, Alert } from 'react-native'

import styles from '../../Containers/Styles/CreateAccountStyles'
import InputScrollView from 'react-native-input-scroll-view'
import { FullButton, InputText } from '../../Components/'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import UserActions from '../../Redux/UserRedux'
import { LoginManager, AccessToken } from 'react-native-fbsdk'

import { Colors, Images, Metrics } from '../../Themes'

class CreateAccount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      keyboardShown: false,
      showLoadingModal: false,
    }
    this.nextStep = this.nextStep.bind(this)
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () =>
      this._keyboardDidShow()
    )
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () =>
      this._keyboardDidHide()
    )
  }

  _keyboardDidShow() {
    this.setState({ keyboardShown: true })
  }

  _keyboardDidHide() {
    this.setState({ keyboardShown: false })
  }

  nextStep() {
    const { email, password } = this.state
    const error = this.validateCreateUser()
    if (!!error) {
      return this.alertButton(error)
    }

    this.props.updateInputCreation({
      email,
      password,
    })
    this.props.navigation.navigate('SecondStep')
  }

  alertButton(error) {
    return Alert.alert('Create Account error!', `${error}`, [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ])
  }

  validateCreateUser() {
    const { email, password, confirmPassword } = this.state

    let error = []
    if (!email) error.push('Email is Empty.')
    if (email && !this.validateEmail(email)) error.push('Email Invalid')
    if (!password) error.push('Password is Empty.')
    if (password && confirmPassword !== password)
      error.push('ConfirmPassword Incorrect')
    if (error.length > 0) {
      return error.join('\n')
    }
    return ''
  }

  validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  async _facebookRegister() {
    try {
      this.setState({ showLoadingModal: true })
      LoginManager.setLoginBehavior('NATIVE_ONLY')
      const result = await LoginManager.logInWithReadPermissions([
        'public_profile',
        'email',
      ])
      if (result.isCancelled) {
        this.setState({
          showLoadingModal: false,
          notificationMessage: 'Facebook Cancel Login',
        })
      } else {
        let data = await AccessToken.getCurrentAccessToken()
        let token = data.accessToken.toString()
        this.props.loginFb(token)
      }
    } catch (nativeError) {
      if (AccessToken.getCurrentAccessToken() != null) {
        LoginManager.logOut()
        return this._facebookRegister()
      }
    }
  }

  render() {
    const { email, password, confirmPassword, keyboardShown } = this.state
    return (
      <View style={styles.container}>
        <InputScrollView keyboardOffset={160}>
          <View>
            <Text style={styles.signUpWith}>
              By signing up with either of the methods presented below, you are
              agreeing to our
              <Text style={styles.termsAndPolicy}> Terms of Service</Text> and
              <Text style={styles.termsAndPolicy}> Privacy Policy</Text>
            </Text>
          </View>
          <View style={styles.wrapperSectionSignup}>
            <FullButton
              label="REGISTER WITH FACEBOOK"
              color={Colors.facebook}
              textStyle={styles.textRegisterWithFacebook}
              onPress={() => this._facebookRegister()}
            />
          </View>
          <View style={styles.viewOr}>
            <Text style={styles.textOr}>or</Text>
          </View>
          <View>
            <View style={styles.formRegister}>
              <View style={styles.inputCreate}>
                <InputText
                  label="EMAIL"
                  placeholder="Email"
                  value={email}
                  onChangeText={email => this.setState({ email })}
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.inputCreate}>
                <InputText
                  label="PASSWORD"
                  placeholder="Password"
                  value={password}
                  onChangeText={password => this.setState({ password })}
                  autoCapitalize="none"
                  secureTextEntry
                />
              </View>
              <View style={styles.inputCreate}>
                <InputText
                  label="CONFIRM PASSWORD"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChangeText={confirmPassword =>
                    this.setState({ confirmPassword })
                  }
                  autoCapitalize="none"
                  secureTextEntry
                />
              </View>
            </View>
          </View>
        </InputScrollView>
        {!keyboardShown && (
          <View>
            <View style={styles.stepByStep}>
              <TouchableOpacity onPress={this.nextStep}>
                <Text style={styles.stepText}>NEXT STEP</Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 10,
                }}
              >
                <View style={[styles.dots, styles.activeDots]} />
                <View style={styles.dots} />
                <View style={styles.dots} />
                <View style={styles.dots} />
              </View>
            </View>
          </View>
        )}
      </View>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => bindActionCreators(UserActions, dispatch)
)(CreateAccount)
