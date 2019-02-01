import { createStackNavigator } from "react-navigation";
import React from 'react';
import TeamDashBoardStack from "../Containers/TeamDashBoardStack";
import SentRequestScreen from "../Containers/SentRequestScreen";
import ReceivedRequestScreen from "../Containers/ReceivedRequestScreen";
import styles from "./Styles/NavigationStyles";
import { Colors, Images, Metrics } from "../Themes";
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const DashBoardNav = createStackNavigator(
  {
    MainScreen: {
      screen: TeamDashBoardStack
    },
    SentRequestScreen: {
      screen: SentRequestScreen
    },
    ReceivedRequestScreen: {
      screen: ReceivedRequestScreen
    },
  },
  {
    // Default config for all screens
    initialRouteName: "MainScreen",
    navigationOptions: {
      headerStyle: styles.header
    }
  }
);

DashBoardNav.navigationOptions = {
  // Sets Cart to an empty icon on the tab bar
  drawerLabel: "DashBoard",
  drawerIcon: ({ tintColor }) => (
    <Icon
      name='tachometer-alt'
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

export default DashBoardNav;
