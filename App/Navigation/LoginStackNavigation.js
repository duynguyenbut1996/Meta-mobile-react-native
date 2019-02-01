import React from 'react'

import { createStackNavigator } from 'react-navigation'
import { Text, View } from 'react-native'

import LoginScreen from '../Containers/LoginScreen'
import UserCreation from './UserCreation'
import ForgotPasswordScreen from '../Containers/ForgotPasswordScreen'
import FirstStep from '../Containers/AccountCreation/FirstStep'
import SecondStep from '../Containers/AccountCreation/SecondStep'
import FinalStep from '../Containers/AccountCreation/FinalStep'
import MlbbProfile from '../Containers/AccountCreation/MlbbProfile'
import Dota2Profile from '../Containers/AccountCreation/Dota2Profile'
import WalkThroughScreen from '../Containers/WalkThroughScreen'
import NotificationMessage from '../Components/NotificationMessage'

const LoginNav = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
    },
    FirstStep: {
      screen: FirstStep,
    },
    SecondStep: {
      screen: SecondStep,
    },
    FinalStep: {
      screen: FinalStep,
    },
    ForgotPassword: {
      screen: ForgotPasswordScreen,
    },
    Dota2Profile: {
      screen: Dota2Profile,
    },
    MlbbProfile: {
      screen: MlbbProfile,
    },
    WalkThroughScreen: {
      screen: WalkThroughScreen,
    },
  },
  {
    // Default config for all screens
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      headerTitle: (
        <View
          style={{
            flex: 1,
            fontWeight: 'bold',
            flexDirection: 'row',
            justifyContent: 'center',
            textAlign: 'center',
            alignSelf: 'center',
          }}
        >
          <NotificationMessage />
          <Text style={{ color: '#fff', fontSize: 20 }}>New Account</Text>
        </View>
      ),
      headerStyle: {
        backgroundColor: '#000000',
      },
      headerLeft: <Text />,
      headerRight: <Text />,
    },
  }
)

LoginNav.navigationOptions = {
  // Sets Cart to an empty icon on the tab bar
  drawerLabel: () => null,
}

export default LoginNav
