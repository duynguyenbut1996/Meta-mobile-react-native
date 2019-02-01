import { createStackNavigator } from "react-navigation";
import React from 'react';
import SettingStack from "../Containers/SettingStack";
import { Image } from "react-native";
import styles from "./Styles/NavigationStyles";
import { Colors, Images, Metrics } from "../Themes";
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const SettingsNav = createStackNavigator(
  {
    MainScreen: {
      screen: SettingStack
    }
  },
  {
    // Default config for all screens
    initialRouteName: "MainScreen",
    navigationOptions: {
      headerStyle: styles.header
    }
  }
);

SettingsNav.navigationOptions = {
  // Sets Cart to an empty icon on the tab bar
  drawerLabel: "Settings",
  drawerIcon: ({ tintColor }) => (
    <Image style={{width: 17, resizeMode: 'contain'}} source={Images.setttings}/>
  ),
};

const stylesCustom = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

export default SettingsNav;
