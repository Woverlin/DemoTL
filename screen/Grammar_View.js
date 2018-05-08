import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View, Button,
    AsyncStorage,
    TouchableOpacity, ListView, Image, WebView
} from 'react-native';

import { firebaseApp } from '../Config.js';
export default class Grammar_View extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.name}`,
        headerTintColor: '#119f81',
    });
    constructor(props) {
        super(props);
        this.state = {
            linkHTML: ''
        }
    }
    getLink() {
        const { params } = this.props.navigation.state;
        console.log('link', params)
        console.log('running')
        return new Promise((resolve, reject) => {
            var storageRef = firebaseApp.storage().ref(params.path);
            storageRef.getDownloadURL().then((url) => {
                this.setState({
                    linkHTML: url
                })
                resolve(url);
                console.log('getlink:' + this.state.linkHTML);
            }, (error) => {
                reject(error);
            });
        });
    }
    listenForItems() {
        this.getLink();
    }
    render() {
        //  this.getlink.bind(this);
        return (
            <WebView
                source={{ uri: this.state.linkHTML }}
                style={{ backgroundColor: 'white' }}
            />
        );
    }
    componentDidMount() {
        this.getLink();
    }
}
