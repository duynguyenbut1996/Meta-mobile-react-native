import { createStackNavigator } from "react-navigation";
import React from 'react';
import TestScreen from "../Containers/TestScreen";

import styles from "./Styles/NavigationStyles";
import { Colors, Images, Metrics } from "../Themes";
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const RegisterIelNav = createStackNavigator(
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

RegisterIelNav.navigationOptions = {
  // Sets Cart to an empty icon on the tab bar
  drawerLabel: "Register for IEL",
  drawerIcon: ({ tintColor }) => (
    <Icon
      name='shield-alt'
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

export default RegisterIelNav;
