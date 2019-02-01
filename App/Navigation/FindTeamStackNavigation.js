import { createStackNavigator } from "react-navigation";
import React from 'react';
import FindTeamStack from "../Containers/FindTeamStack";

import styles from "./Styles/NavigationStyles";
import { Colors, Images, Metrics } from "../Themes";
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const FindTeamNav = createStackNavigator(
  {
    findATeam: {
      screen: FindTeamStack
    }
  },
  {
    // Default config for all screens
    initialRouteName: "findATeam",
    navigationOptions: {
      headerStyle: styles.header
    }
  }
);

FindTeamNav.navigationOptions = {
  // Sets Cart to an empty icon on the tab bar
  drawerLabel: "Find a Team",
  drawerIcon: ({ tintColor }) => (
    <Icon
      name='users'
      size={18}
      color={tintColor}
    />
  ),
};

const stylesCustom = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

export default FindTeamNav;
