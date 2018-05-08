import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { firebaseApp } from '../Config.js';
import CheckAlert from "react-native-awesome-alert"
class Support extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            mail: "",
            mess: "",
            showtext: false,
        }
    }
    upload() {
        console.log('upload run', this.state)

        firebaseApp.database().ref('/Support').push({
            name: this.state.name,
            mail: this.state.mail,
            mess: this.state.mess
        })
        this.setState({
            showtext: true
        })
    }
    render() {
        return (
            <View style={{ flex: 1, padding: 5, backgroundColor: 'white' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 10 }}>
                    <Text> Họ tên: </Text>
                    <TextInput style={{ borderWidth: 1, width: 200, height: 40 }}
                        ref="1"
                        onChangeText={(name) => this.setState({ name })}
                        value={this.state.name}
                        underlineColorAndroid="white"
                        placeholder="Họ và tên"
                    />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 10 }}>
                    <Text> Email: </Text>
                    <TextInput style={{ borderWidth: 1, width: 200, height: 40 }}
                        ref="2"
                        underlineColorAndroid="white"
                        onChangeText={(mail) => this.setState({ mail })}
                        value={this.state.mail}
                        placeholder="Email" />
                </View>
                <View style={{ flexDirection: 'column', backgroundColor: 'white', padding: 10 }}>
                    <Text> Nội dung : </Text>
                    <TextInput style={{ height: 100, borderWidth: 1 }}
                        ref="3"
                        underlineColorAndroid="white"
                        placeholder="Gửi gì đó cho chúng tôi......"
                        onChangeText={(mess) => this.setState({ mess })}
                        value={this.state.mess}
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={() => this.upload()}>
                    <Text style={{ fontSize: 17 }}> Submit </Text>
                </TouchableOpacity>
                {this.state.showtext && <View style={{ flex: 1, alignItems: 'center', }}>
                    <Text style={{ padding: 10, fontSize: 17, color: 'red' }}> *Cám ơn bạn đã góp ý, chúc bạn một ngày làm việc và học tập hiệu quả !!! </Text>
                </View>}
            </View >
        );
    }
}
const styles = StyleSheet.create({
    button: {
        height: 30,
        marginTop: 10,
        elevation: 5,
        backgroundColor: '#119f81',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderBottomColor: '#119f81',
    }
})
export default Support;
