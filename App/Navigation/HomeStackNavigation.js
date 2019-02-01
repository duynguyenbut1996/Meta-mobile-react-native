import { createStackNavigator } from "react-navigation";
import React from 'react';
import TestScreen from "../Containers/TestScreen";

import styles from "./Styles/NavigationStyles";
// import { Colors, Images, Metrics } from "../Themes";
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const HomeNav = createStackNavigator(
  {
    Profile: {
      screen: TestScreen
    }
  },
  {
    // Default config for all screens
    initialRouteName: "Profile",
    navigationOptions: {
      headerStyle: styles.header
    }
  }
);

HomeNav.navigationOptions = {
  // Sets Cart to an empty icon on the tab bar
  drawerLabel: "Home",
  drawerIcon: ({ tintColor }) => (
    <Icon
      name='flag'
      size={18}
      color={tintColor}
      solid
    />
  ),
};

const stylesCustom = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

export default HomeNav;
