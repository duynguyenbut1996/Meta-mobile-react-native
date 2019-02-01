import React, { component } from 'react'
import { TouchableOpacity, Image } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import { Images } from '../Themes'
import { DrawerActions } from 'react-navigation-drawer'
import Icon from 'react-native-vector-icons/FontAwesome'

import HubScreen from '../Containers/HubScreen'
import TeamCreation from '../Containers/TeamCreation/TeamCreation'
import DynamicHeader from '../Components/Hub/DynamicHeader'

const HomePageNav = createStackNavigator(
  {
    Hub: {
      screen: HubScreen,
    },
    TeamCreation: {
      screen: TeamCreation,
    },
  },
  {
    initialRouteName: 'Hub',
    defaultNavigationOptions: ({ navigation }) => ({
      headerTitle: <DynamicHeader />,
      headerStyle: {
        backgroundColor: 'black',
      },
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Icon name="bars" size={30} color="#FFFFFF" />
        </TouchableOpacity>
      ),
      headerLeftContainerStyle: {
        paddingLeft: 15,
      },
    }),
  }
)

HomePageNav.navigationOptions = {
  drawerLabel: 'Home',
  drawerIcon: ({ tintColor }) => (
    <Image style={{ width: 17, resizeMode: 'contain' }} source={Images.home} />
  ),
}

export default HomePageNav
