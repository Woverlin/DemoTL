import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { firebaseApp } from '../Config.js';
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pass: '',
            pass2: ''
        }
    }
    Dangki() {
        if (this.state.pass === this.state.pass2) {
            firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.pass)
                .then(() => {
                    Alert.alert(
                        'Thông báo',
                        'Đăng kí thành công tài khoản : ' + this.state.email,
                        [
                          {text: 'OK', onPress: () => this.props.navigation.goBack()},
                        ],
                        { cancelable: false }
                      )
                })
            .catch(function (error) {
                var err = error.code;
                if (err == undefined) {
                    Alert.alert(
                        'Thông báo',
                        'Đăng kí thành công tài khoản : ' + this.state.email,
                        [
                          {text: 'OK', onPress: () => this.props.navigation.goBack()},
                        ],
                        { cancelable: false }
                      )
                }
                 if (err == 'auth/weak-password') {
                    Alert.alert(
                        'Thông báo',
                        'Mật khẩu quá ngắn',
                        [
                          {text: 'OK', onPress: () => console.log('cancel')},
                        ],
                        { cancelable: false }
                      )
                }
                if (err == 'auth/invalid-email') {
                    Alert.alert(
                        'Thông báo',
                        'Địa chỉ email không hợp lệ',
                        [
                          {text: 'OK', onPress: () => console.log('cancel')},
                        ],
                        { cancelable: false }
                      )
                }
                if (err == 'auth/email-already-in-use') {
                    Alert.alert(
                        'Thông báo',
                        'Email đã có người sử dụng',
                        [
                          {text: 'OK', onPress: () => console.log('cancel')},
                        ],
                        { cancelable: false }
                      )
                }
                else{
                    Alert.alert(
                        'Thông báo',
                        'Email vừa nhập không có hiệu lực' +err,
                        [
                          {text: 'OK', onPress: () => console.log('cancel')},
                        ],
                        { cancelable: false }
                      )
                }
            })
        }
        else {
            Alert.alert(
                'Thông báo3',
                'Mật khẩu không khớp',
                [
                { text: 'OK', onPress: () => this.props.navigation.goBack() }
                ],
            )
        }
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.contain}>
                <View style={styles.textReg}>
                    <Text style={{ fontSize: 25, textAlign: 'center', color: 'white' }}> ĐĂNG KÍ </Text>
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
                        onSubmitEditing={() => this.passwordInput2.focus()}
                        onChangeText={(pass) => this.setState({ pass })}
                        value={this.state.pass}
                    />
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor='rgba(255,255,255,0.7)'
                        underlineColorAndroid='transparent' style={styles.input}
                        secureTextEntry
                        returnKeyType='go'
                        ref={(input2) => this.passwordInput2 = input2}
                        onChangeText={(pass2) => this.setState({ pass2 })}
                        value={this.state.pass2}
                    />
                </View >
                <TouchableOpacity
                    onPress={() => { this.Dangki() }}
                    style={styles.button}>
                    <Text style={styles.text}> ĐĂNG KÍ</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => this.props.navigation.goBack()}
                    style={styles.back}>
                    <Text style={styles.text}> Quay lại đăng nhập</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    contain: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'green',
    },
    textReg: {

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
    },
    back: {
        paddingVertical: 10,
        marginBottom: 10,
    }
})
