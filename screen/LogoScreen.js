import React, { Component } from 'react';
import { View, Text, Image, AsyncStorage } from 'react-native';
export default class LogoScreen extends Component {

    async componentDidMount() {
        await this.CheckLogin();
        // Start counting when the page is loaded
        // this.timeoutHandle = setTimeout(() => {
        //     // Add your logic for the transition
        //     this.setState({ component: <App /> })
        // }, 3000);
    }
    async CheckLogin() {
        const value = await AsyncStorage.getItem('user');
        const userKey = await AsyncStorage.getItem('userKey');
        if (!userKey) {
            console.log('Chưa login')
            this.timeoutHandle = setTimeout(() => {
                // Add your logic for the transition
                this.props.navigation.navigate('Login')
            }, 3000);
        }
        else {
            this.timeoutHandle = setTimeout(() => {
                // Add your logic for the transition
                this.props.navigation.navigate('drawernav')
            }, 3000);
        }
    }
    componentWillUnmount() {
        clearTimeout(this.timeoutHandle);
    }
    render() {
        return (
            <View style={{ backgroundColor: 'white', justifyContent: 'space-around', alignItems: 'center', flex: 1, flexDirection: 'row', }}>
                <Image style={{ width: 250, height: 250, tintColor: "#119f81" }} source={require('../image/avt1.png')} />
            </View>
        );
    }
}