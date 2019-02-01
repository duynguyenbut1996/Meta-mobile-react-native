import React from 'react';
import { createStackNavigator } from "react-navigation";
import { Image } from 'react-native';
import FindATeam from "../Containers/FindATeam";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors, Images, Metrics } from "../Themes";

const FindATeamNav = createStackNavigator(
  {
    Login: {
      screen: FindATeam
    }
  },
  {
    // Default config for all screens
    headerMode: "none",
    initialRouteName: "Login"
  }
);

FindATeamNav.navigationOptions = {
  // Sets Cart to an empty icon on the tab bar
  drawerLabel: "Find a Team",
  drawerIcon: ({ tintColor }) => (
    <Image style={{width: 22, resizeMode: 'contain'}} source={Images.findATeam}/>
  ),
};

export default FindATeamNav;
