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
                alignItems: 'center'
                }}>
                <Icon name={'tachometer-alt'}
                    size={22}
                    color='#000'
                    style={{paddingHorizontal: 10}}
                />
                <Text style={{flex: 1,
                color: '#000',
                fontWeight: 'bold',
                fontSize: 20,
                }}>Team DashBoard</Text>
            </View>
        ),
        headerLeft: 
        <Icon name={'chevron-left'}
            size={25}
            style={{paddingLeft: 15}}
            color='#000'
            onPress={ () => { navigation.goBack() }} />,
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
                <TouchableOpacity onPress={() => {this.props.navigation.navigate('SentRequestScreen')}}>
                <View style={stylesCustom.textNested}>
                    <Icon name={'telegram-plane'}
                        size={22}
                        color='#fff'
                        style={{paddingHorizontal: 30}}
                        solid
                    />
                    <Text style={{color:'#fff', fontSize: 16, fontWeight: 'bold' }}>Sent Requests</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {this.props.navigation.navigate('ReceivedRequestScreen')}}>
                <View style={stylesCustom.textNested}>
                    <Icon name={'envelope-open'}
                        size={22}
                        color='#fff'
                        style={{paddingHorizontal: 28}}
                        solid
                    />
                    <Text style={{color:'#fff', fontSize: 16, fontWeight: 'bold' }}>Received Requests</Text>
                </View>
                </TouchableOpacity>
            </View>
            </ScrollView>
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