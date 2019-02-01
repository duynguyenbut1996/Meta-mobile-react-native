import React from 'react'
import { createStackNavigator } from "react-navigation";
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import Icon from "react-native-vector-icons/FontAwesome";
import { Images } from "../Themes";

import FindAPlayerDota from "../Containers/FindAPlayer";
import FindAPlayerMLBB from "../Containers/FindAPlayer-MLBB";
import PickerSwitchGame from "../Components/PickerSwitchGame";


const FindAPlayerNav = createStackNavigator(
  {
    FindAPlayerDota: {
      screen: FindAPlayerDota
  },
    FindAPlayerMLBB: {
    screen: FindAPlayerMLBB
  }
  },
  {
    // Default config for all screens
    initialRouteName: "FindAPlayerDota",
    defaultNavigationOptions: ({navigation}) => ({
      title: "Find player",
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

FindAPlayerNav.navigationOptions = {
  // Sets Cart to an empty icon on the tab bar
  drawerLabel: "Find a Player",
  drawerIcon: ({ tintColor }) => (
    <Image style={{width: 17, resizeMode: 'contain'}} source={Images.findAPlayer}/>
  ),
};

const stylesCustom = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
  },
});

export default FindAPlayerNav;