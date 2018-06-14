import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ListView,
    TouchableOpacity,
    AsyncStorage,
    FlatList, ScrollView
} from 'react-native';
import { firebaseApp } from '../Config.js';
import CheckAlert from "react-native-awesome-alert"
import Icon from 'react-native-vector-icons/Ionicons';
export default class Lst_Test extends Component {
    constructor(props) {
        super(props);
        this.items = [];
        this.state = {
            img: [],
            items: [],
        }
    }


    getPic(pic) {
        return new Promise((resolve, reject) => {
            var storageRef = firebaseApp.storage().ref(pic);
            storageRef.getDownloadURL().then((url) => {
                resolve(url);
            }, (error) => {
                reject(error);
            });
        });
    }

    render() {
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;
        return (
            <View style={{ flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#119f81' }}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ marginBottom: 10, backgroundColor: '#119f81' }}>
                        <TouchableOpacity
                            style={styles.lesson}
                            onPress={() => navigate('Grammar_View', { path: 'Trick/PART1.html', name: 'Trick Part 1' })} >
                            <Image style={{ width: 25, height: 25, marginLeft: 10, tintColor: '#ff0000' }}
                                source={require('../image/num1.png')} />
                            <Text style={styles.lsname}>
                                Part 1 - Photographs
                        </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.lesson}
                            onPress={() => navigate('Grammar_View', { path: 'Trick/PART2.html', name: 'Trick Part 2' })} >
                            <Image style={{ width: 25, height: 25, marginLeft: 10, tintColor: '#ff0000' }}
                                source={require('../image/num2.png')} />
                            <Text style={styles.lsname}>Part 2 - Question and Response</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.lesson}
                            onPress={() => navigate('Grammar_View', { path: 'Trick/PART3.html', name: 'Trick Part 3' })} >
                            <Image style={{ width: 25, height: 25, marginLeft: 10, tintColor: '#ff0000' }}
                                source={require('../image/num3.png')} />
                            <Text style={styles.lsname}>
                                Part 3 - Short Conversations</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.lesson}
                            onPress={() => navigate('Grammar_View', { path: 'Trick/PART4.html', name: 'Trick Part 4' })} >
                            <Image style={{ width: 25, height: 25, marginLeft: 10, tintColor: '#ff0000' }}
                                source={require('../image/num4.png')} />
                            <Text style={styles.lsname}>Part 4 - Short Talks</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.lesson}
                            onPress={() => navigate('Grammar_View', { path: 'Trick/PART5.html', name: 'Trick Part 5' })} >
                            <Image style={{ width: 25, height: 25, marginLeft: 10, tintColor: '#ff0000' }}
                                source={require('../image/num5.png')} />
                            <Text style={styles.lsname}>Part 5 - Incomplete Sentences</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.lesson}
                            onPress={() => navigate('Grammar_View', { path: 'Trick/PART6.html', name: 'Trick Part 6' })} >
                            <Image style={{ width: 25, height: 25, marginLeft: 10, tintColor: '#ff0000' }}
                                source={require('../image/num6.png')} />
                            <Text style={styles.lsname}>Part 6 - Text Completetion</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.lesson}
                            onPress={() => navigate('Grammar_View', { path: 'Trick/PART7.html', name: 'Trick Part 7' })} >
                            <Image style={{ width: 25, height: 25, marginLeft: 10, tintColor: '#ff0000' }}
                                source={require('../image/num7.png')} />
                            <Text style={styles.lsname}>Part 7 - Reading Comprehension</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    icon: {
        width: 25,
        height: 25,
    },
    lesson: {
        //justifyContent: 'center',
        elevation: 5,
        alignItems: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'white',
        margin: 5,
        backgroundColor: 'white'
    },
    pic: {
        margin: 10,
        height: 50,
        width: 70,
    },
    lsname: {
        color: '#119f81',
        fontSize: 15,
        padding: 17
    },
    note: {
        color: '#119f81',
        fontSize: 17,
    }
});
