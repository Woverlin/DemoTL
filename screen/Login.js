import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import { firebaseApp } from '../Config.js';
export default class Login extends Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pass: ''
        }
    }
    Dangnhap() {
        firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.pass)
            .then(() => {
                this.props.navigation.navigate('drawernav')
            })
            .catch(function (error) {
                var err = error.code;
                Alert.alert(
                    'Thông báo',
                    'Tài khoản hoặc mật khẩu không đúng !!!',
                    [
                        { text: 'OK', onPress: () => console.log('cancel') },
                    ],
                    { cancelable: false }
                )
            })
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.contain}>
                <View style={styles.logoContain}>
                    <Image
                        style={styles.logo}
                        source={require('../image/avt1.png')} />
                </View >
                <View  >
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor='rgba(255,255,255,0.7)'
                        underlineColorAndroid='transparent' style={styles.input}
                        returnKeyType='next'
                        keyboardType='email-address'
                        onSubmitEditing={() => this.passwordInput.focus()}
                        onChangeText={(email) => this.setState({ email })}
                        value={this.state.email}
                    />
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor='rgba(255,255,255,0.7)'
                        underlineColorAndroid='transparent' style={styles.input}
                        secureTextEntry
                        returnKeyType='go'
                        ref={(input) => this.passwordInput = input}
                        onChangeText={(pass) => this.setState({ pass })}
                        value={this.state.pass}
                    />
                </View >
                <TouchableOpacity style={styles.button}
                    onPress={() => this.Dangnhap()}>
                    <Text style={styles.text}> ĐĂNG NHẬP</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigate('Register')}
                    style={styles.button}>
                    <Text style={styles.text}> ĐĂNG KÍ</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    contain: {
        flex: 1,
        padding: 20,
        backgroundColor: 'green',
    },
    logoContain: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        height: 200,
        width: 200,
        tintColor: "#119f81"
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.7)',
        marginBottom: 10,
        color: '#FFF'
    },
    text: {
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#60ac5d',
        paddingVertical: 10,
        marginBottom: 10,
    }
})
