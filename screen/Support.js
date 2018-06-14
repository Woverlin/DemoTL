import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { firebaseApp } from '../Config.js';
import CheckAlert from "react-native-awesome-alert"
class Support extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            mess: "",
            showtext: false,
        }
    }
    upload() {
        console.log('upload run', this.state)

        firebaseApp.database().ref('/Support').push({
            name: this.state.name,
            mess: this.state.mess
        })
        this.setState({
            showtext: true
        })
    }
    render() {
        return (
            <View style={{ flex: 1, padding: 5, backgroundColor: '#119f81' }}>
                <View >
                    <TextInput
                        placeholder="Họ tên"
                        //placeholderTextColor='rgba(255,255,255)'
                        underlineColorAndroid='transparent'
                        style={styles.input}
                        returnKeyType='next'
                        onSubmitEditing={() => this.contentInput.focus()}
                        onChangeText={(name) => this.setState({ name })}
                        value={this.state.name}
                    />
                    <TextInput
                        placeholder="Nội dung"
                        //placeholderTextColor='rgba(255,255,255)'
                        underlineColorAndroid='transparent'
                        style={styles.input2}
                        multiline={true}
                        returnKeyType='next'
                        ref={(input) => this.contentInput = input}
                        onChangeText={(mess) => this.setState({ mess })}
                        value={this.state.mess}
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={() => this.upload()}>
                    <Text style={{ fontSize: 17, color: 'red' }}> Submit </Text>
                </TouchableOpacity>
                {
                    this.state.showtext && <View style={{ flex: 1, alignItems: 'center', }}>
                        <Text style={{ padding: 10, fontSize: 17, color: 'white' }}> *Cám ơn bạn đã góp ý, chúc bạn một ngày làm việc và học tập hiệu quả !!! </Text>
                    </View>
                }
            </View >
        );
    }
}
const styles = StyleSheet.create({
    button: {
        height: 30,
        marginTop: 10,
        elevation: 5,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderBottomColor: '#119f81',
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.7)',
        marginBottom: 10,
        color: '#FFF',
        borderRadius: 5,
    },
    input2: {
        height: 140,
        backgroundColor: 'rgba(255,255,255,0.7)',
        marginBottom: 10,
        color: '#FFF',
        borderRadius: 5,
    }
})
export default Support;
