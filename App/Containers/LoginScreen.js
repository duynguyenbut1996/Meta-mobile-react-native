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

import {
  BackgroundImage,
  FullButton,
  InputText,
  Loading,
  MainContainer,
  Text,
} from '../Components'

// Styles
import styles from './Styles/LaunchScreenStyles'
import { Colors, Images, Metrics } from '../Themes'
import { LoginManager, AccessToken } from 'react-native-fbsdk'
import UserActions from '../Redux/UserRedux'
import { UserSelectors } from '../Redux/User/Selectors'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width
const mainRatio = 750/width;

const BottomText = ({ children, page }) => (
  <Text style={{ margin: 18, fontSize: Math.floor(26/mainRatio) }}>{children}</Text>
)

export class LoginScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password: '',
      keyboardShown: false,
      showLoadingModal: false,
      notificationMessage: '',
      isLogin: false,
      token: '',
    }
    this._eventNavigate = this._eventNavigate.bind(this)
  }

  componentWillMount() {
    AsyncStorage.getItem('authToken').then(value => {
      this.props.userRequest(value)
      this.setState({ isLogin: !!value })
    })
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () =>
      this._keyboardDidShow()
    )
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () =>
      this._keyboardDidHide()
    )
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  componentWillReceiveProps(nextProps) {
    const { token, error } = nextProps
    const { navigation } = this.props
    if (token && token !== this.state.token) {
      return AsyncStorage.setItem('authToken', token).then(() => {
        this.props.userRequest(token)
        if(!this.props.isNewUser) {
          navigation.navigate('Hub')
        }
        this.setState({
          isLogin: false,
          token,
        })
      })
    }
    if (error) {
      Alert.alert(
        'Login failed!',
        error,
        [{ text: 'OK', onPress: () => this.props.failure('') }],
        { cancelable: false }
      )
    }
  }

  _keyboardDidShow() {
    this.setState({ keyboardShown: true })
  }

  _keyboardDidHide() {
    this.setState({ keyboardShown: false })
  }

  handleLogin() {
    const { username, password } = this.state
    if (!username || !password) {
      // TODO : show error
      return
    }
    this.props.loginRequest(username, password)
  }

  _eventNavigate(page) {
    this.props.navigation.navigate(page)
  }

  async _facebookLogin() {
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
        return this._facebookLogin()
      }
    }
  }

  static navigationOptions = {
    header: null,
  };

  render() {
    const { username, password, keyboardShown, isLogin } = this.state
    const { fetching } = this.props
    if (isLogin === null || isLogin === true) {
      return <View />
    }

    return (
      <MainContainer>
        <BackgroundImage source={Images.background} />
        <InputScrollView keyboardOffset={60}>
          <View
            style={{ alignItems: 'center', marginBottom: (height * 4) / 100 }}
          >
            <Image source={Images.logo} style={styles.logo} />
            <Text h4 center style={{
              paddingVertical: Metrics.baseMargin,
              fontSize: Math.floor(32/mainRatio),
              letterSpacing: Math.floor(14/mainRatio),
            }}>
              GET DISCOVERED
            </Text>
          </View>

          <View
            style={{
              height: Math.floor(470/mainRatio),
              marginHorizontal: Metrics.baseMargin,
              paddingHorizontal: (width * 10) / 100,
            }}
          >
            <InputText
              label="EMAIL ADDRESS"
              value={username}
              onChangeText={text => this.setState({ username: text })}
              keyboardType="email-address"
              style={{
                color: Colors.ricePaper,
                fontSize: Math.floor(26/mainRatio),
                paddingVertical: 0
              }}
              autoCapitalize="none"
            />
            <InputText
              label="PASSWORD"
              value={password}
              style={{
                color: Colors.ricePaper,
                fontSize: Math.floor(26/mainRatio),
                paddingVertical: 0
              }}
              onChangeText={text => this.setState({ password: text })}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>
        </InputScrollView>
        {!keyboardShown && (
          <View
            style={{
              bottom: 0,
              height: Math.floor(350/mainRatio),
              width: '100%',
              position: 'absolute',
            }}
          >
            <FullButton
              label="LOGIN"
              style={{
                flex: 1,
              }}
              onPress={() => this.handleLogin()}
            />
            <FullButton
              label="LOGIN WITH FACEBOOK"
              style={{
                flex: 1,
              }}
              color={Colors.facebook}
              onPress={() => this._facebookLogin()}
            />
            <View
              style={{
                width: '100%',
                flex: 1,
                backgroundColor: '#000000',
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <TouchableOpacity
                onPress={() => this._eventNavigate('FirstStep')}
              >
                <Text style={{
                  margin: 18,
                  fontSize: Math.floor(26/mainRatio)
                }}>Create Account</Text>
              </TouchableOpacity>
              <BottomText>/</BottomText>
              <TouchableOpacity
                onPress={() => this._eventNavigate('ForgotPassword')}
                >
                <BottomText>Forgot Password</BottomText>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <Loading animating={!!fetching} />
      </MainContainer>
    )
  }
}

export default connect(
  state => ({
    user: UserSelectors.selectUser(state),
    token: UserSelectors.selectUserToken(state),
    isNewUser: UserSelectors.selectIsNewUser(state),
    error: UserSelectors.selectError(state),
    fetching: UserSelectors.selectFetching(state),
  }),
  dispatch => bindActionCreators(UserActions, dispatch)
)(LoginScreen)
