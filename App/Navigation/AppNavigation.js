import { createDrawerNavigator, createAppContainer, DrawerItems, createStackNavigator } from "react-navigation";
import { DrawerActions } from 'react-navigation-drawer';
import React from 'react';
import { Dimensions, Text, StyleSheet, View, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import LoginNav from "./LoginStackNavigation";
import ProfileNav from "./ProfileStackNavigation";
import HomePageNav from './DashboardNatigation';
import { AsyncStorage } from "react-native"

import HomeNav from "./HomeStackNavigation";
import RegisterIelNav from "./RegisterIelStackNavigation";
import SettingsNav from "./SettingsStackNavigation";
import Icon from 'react-native-vector-icons/FontAwesome5';
import FindAPlayerNav from "./FindAPlayerNavigation";
import FindATeamNav from "./FindATeamNavigation";
import { Images } from "../Themes";

import {
  MainContainer,
} from "../Components";

const { width } = Dimensions.get('screen');

const logout = (props) => {
  AsyncStorage.setItem('authToken', '').then(() =>
      props.navigation.navigate('loginStack')
  )
}

const LoginStack = createStackNavigator({
  LoginScreen: { screen: LoginNav },
}, {
  headerMode: 'none',
})

// Manifest of possible screens
const DrawerNavigation = createDrawerNavigator(
  {
    // LoginStack: LoginNav,
    HomeStackNavigation: HomePageNav,
    // DashboardStack: DashboardNav,
    ProfileStack: ProfileNav,
    FindTeamStackNavigation: FindATeamNav,
    FindPlayerStackNavigation: FindAPlayerNav,
    // RegisterIelStackNavigation: RegisterIelNav,
    ProfileSSettingsStackNavigationtack: SettingsNav,
  },
  {
    // Default config for all screens
    contentComponent:  (props) => (
      <MainContainer>
        <ImageBackground
          style={{ width: '100%', height: '100%'}}
          source={Images.background}
          imageStyle={{ resizeMode: "cover" }}
        >
        <ScrollView>
          <View style={{padding: 20, marginBottom: 10}}>
            <Icon
              onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}
              name='times'
              size={20}
              color='#fff'
            />
          </View>
          { 
            <DrawerItems
              {...props}
              getLabel = {(scene) => {
                let colorActive = scene.focused ? '#000' : '#fff';
                return (
                <View style={{
                  flexDirection: 'row',
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: 15,
                  paddingBottom: 15,
                  paddingRight: 30,
                  paddingLeft: 30
                }}>
                  <Text style={{color: colorActive ,fontSize: 16, fontWeight: 'bold' }}>{props.getLabel(scene)}</Text>
                  {
                    !(['Home', 'Register for IEL', 'Settings'].includes(props.getLabel(scene))) ?
                    <Icon name='caret-right' size={15} color={colorActive} /> : null
                  }
                </View>
              )}}
            />
          }
        </ScrollView>
        <View style={[stylesCustom.buttonLogout]}>
          <TouchableOpacity onPress={() => logout(props)}>
            <Text style={[stylesCustom.textLogout]}>LOGOUT</Text>
          </TouchableOpacity>
        </View>
        </ImageBackground>
      </MainContainer>
    ),
    initialRouteName: "HomeStackNavigation",
    drawerWidth: width,
    contentOptions: {
      activeTintColor: '#000',
      activeBackgroundColor: '#479b93',
      inactiveTintColor: '#284f56',
      labelStyle: {
        color: '#fff',
        fontSize: 16
      },
      itemStyle: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 20,
        paddingLeft: 30
      },
      activeLabelStyle: {
        color: '#000'
      },
      itemsContainerStyle: {
        marginVertical: 0,
      },
      iconContainerStyle: {
        opacity: 1
      },
    }
  }
)

const PrimaryNav = createStackNavigator({
  loginStack: { screen: LoginStack },
  drawerStack: { screen: DrawerNavigation }
}, {
  headerMode: 'none'
})

const stylesCustom = StyleSheet.create({
  buttonLogout: {
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    // position: "absolute",
    // bottom: 0.0,
    height: 65,
    width: "100%",
    flexDirection: "row",
  },
  textLogout: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  }
});

export default createAppContainer(PrimaryNav);
