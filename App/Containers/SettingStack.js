import { DrawerActions } from 'react-navigation-drawer';
import React, { Component } from "react";
import { Header } from 'react-navigation';
import { Dimensions, Text, StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome5';

import {
  MainContainer,
} from "../Components";

export class SettingStack extends Component {
    static navigationOptions = ({navigation}) => ({
        headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            backgroundColor: '#479b93',
            height: 70
        },
        headerTitle: (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                }}>
                <Icon name={'cog'}
                    size={22}
                    color='#000'
                    style={{paddingHorizontal: 10}}
                    solid
                />
                <Text style={{flex: 1,
                color: '#000',
                fontWeight: 'bold',
                fontSize: 20,
                }}>Settings</Text>
            </View>
        ),
        headerLeft: 
        <Icon name={'chevron-left'}
            size={25}
            style={{paddingLeft: 15}}
            color='#000'
            onPress={ () => { navigation.dispatch(DrawerActions.openDrawer()) }} />,
        headerRight: 
        <Icon name={'chevron-left'}
            size={25}
            color='#479b93'
            style={{paddingLeft: 15}}
        />,
    });
    render() {
        const { user } = this.props;

        return (
            <MainContainer style={{backgroundColor: '#002220'}}>
            <ScrollView>
            <View>
                <View style={stylesCustom.textNested}>
                    <Icon name={'user'}
                        size={22}
                        color='#fff'
                        style={{paddingHorizontal: 30}}
                        solid
                    />
                    <Text style={{color:'#fff', fontSize: 16, fontWeight: 'bold' }}>Your Info</Text>
                </View>
                <View style={stylesCustom.textNested}>
                    <Icon name={'envelope'}
                        size={22}
                        color='#fff'
                        style={{paddingHorizontal: 28}}
                        solid
                    />
                    <Text style={{color:'#fff', fontSize: 16, fontWeight: 'bold' }}>Change Email</Text>
                </View>
                <View style={stylesCustom.textNested}>
                    <Icon name={'lock'}
                        size={22}
                        color='#fff'
                        style={{paddingHorizontal: 30}}
                    />
                    <Text style={{color:'#fff', fontSize: 16, fontWeight: 'bold' }}>Change Password</Text>
                </View>
            </View>
            </ScrollView>
            <View style={[stylesCustom.buttonLogout]}>
            <TouchableOpacity>
                <Text style={[stylesCustom.textLogout]}>LOGOUT</Text>
            </TouchableOpacity>
            </View>
        </MainContainer>
        );
    }
}

export default connect(state => ({
}))(SettingStack)

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
    },
    textNested: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 30,
        paddingHorizontal: 30
    }
  });