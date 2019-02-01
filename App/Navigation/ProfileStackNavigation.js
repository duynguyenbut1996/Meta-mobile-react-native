import React from "react";
import {
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
  Picker
} from "react-native";
import { createStackNavigator } from "react-navigation";
import { DrawerActions } from 'react-navigation-drawer';
import Icon from "react-native-vector-icons/FontAwesome";
import { Colors, Images, Metrics } from "../Themes";

import Dota2Dashboard from "../Containers/GameDashboard/Dota2Dashboard";
import PickerSwitchGame from "../Components/PickerSwitchGame";

const ProfileNav = createStackNavigator(
  {
    Dota2Dashboard: {
      screen: Dota2Dashboard
    }
  },
  {
    // Default config for all screens
    initialRouteName: "Dota2Dashboard",
    defaultNavigationOptions: ({navigation}) => ({
      title: "Home",
      headerTitleStyle: {
        color: "#FFFFFF"
      },
      headerStyle: {
        backgroundColor: "#000000"
      },
      headerLeft: () => 
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Icon name="bars" size={30} color="#FFFFFF" />
        </TouchableOpacity>,
      headerLeftContainerStyle: {
        paddingLeft: 15
      },
      headerRight: (
        <PickerSwitchGame />
      )
    })
  }
);

ProfileNav.navigationOptions = {
  // Sets Cart to an empty icon on the tab bar
  drawerLabel: "User Dashboard",
  drawerIcon: ({ tintColor }) => (
    <Image style={{width: 17, resizeMode: 'contain'}} source={Images.profile}/>
  )
};

export default ProfileNav;
