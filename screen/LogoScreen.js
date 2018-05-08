import React, { Component } from 'react';
import { View, Text,Image } from 'react-native';
export default class LogoScreen extends Component {
    render() {
        return (
            <View style={{backgroundColor :'white',justifyContent: 'space-around',alignItems: 'center',flex:1 ,flexDirection: 'row',}}>
                <Image style={{width:250,height:250,tintColor :"#119f81"}}source={require('../image/avt1.png')}/>
            </View>
        );
    }
}