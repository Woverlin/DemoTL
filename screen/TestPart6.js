import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    FlatList,
    Text,
    View, Button,
    AsyncStorage,
    TouchableOpacity, ListView, Image, WebView, ScrollView,
} from 'react-native';
import { firebaseApp } from '../Config.js';
//import Swiper from 'react-native-swiper';

import Sound from 'react-native-sound';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import { PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator } from 'rn-viewpager';
export default class TestPart6 extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.name}` + ' Part VI',
        headerTintColor: '#119f81'
    });
    constructor(props) {
        super(props);
        this.itemRef = firebaseApp.database();
        this.listenForItems = this.listenForItems.bind(this);
        //this.getAudio = this.getAudio.bind(this);
        this.answer = this.answer.bind(this)
        this.state = {
            items: {},
            da1: false,
            da2: false,
            da3: false,
            da4: false,
            da5: false,
            da6: false,
            da7: false,
            da8: false,
            da9: false,
            da10: false,
            da11: false,
            da12: false,
            linkHTML: '',
            myAnswer1: null,
            myAnswer2: null,
            myAnswer3: null,
        }
    }
    // onPageScroll() {
    //     return this.setState({
    //         answer1: undefined,
    //         answer2: undefined,
    //         answer3: undefined,
    //         answer4: undefined,
    //         answer5: undefined,
    //         answer6: undefined,
    //         da1: false,
    //         da2: false,
    //         da3: false,
    //         da4: false,
    //         da5: false,
    //         da6: false,
    //         htmlenable: false,

    //     })
    // }
    GetUser = async () => {
        //const value = await AsyncStorage.getItem('user');
        const UserKey = await AsyncStorage.getItem('userKey');
        await this.setState({
            userKey: UserKey
        })
    }
    answer(data) {
        this.setState({
            htmlenable: true
        })

        var da1 = data.result1;
        var da2 = data.result2;
        var da3 = data.result3;

        console.log('myas1,myas2,myas3', this.state.myAnswer1, this.state.myAnswer2, this.state.myAnswer3)
        console.log('da1,da2,da3', da1, da2, da3)
        this.setState(prevState => {
            return { linkHTML: data.html }
        }, () => {
            console.log('state linkhtml' + this.state.linkHTML)
        })
        const id = this.props.navigation.state.params.id
        var percent = 0
        if (da1 === this.state.myAnswer1) {
            percent = percent + 33
        }
        if (da2 === this.state.myAnswer2) {
            percent = percent + 33
        }
        if (da3 === this.state.myAnswer3) {
            percent = percent + 34
        }
        firebaseApp.database().ref('/User/' + this.state.userKey + '/Process/' + id).update({
            part6: percent
        });
        if (da1 === data.answer1) {
            this.setState({
                da1: true
            })
        }
        if (da1 === data.answer2) {
            this.setState({
                da2: true
            })
        }
        if (da1 === data.answer3) {
            this.setState({
                da3: true
            })
        }
        if (da1 === data.answer4) {
            this.setState({
                da4: true
            })
        }
        if (da2 === data.answer5) {
            this.setState({
                da5: true
            })
        }
        if (da2 === data.answer6) {
            this.setState({
                da6: true
            })
        }
        if (da2 === data.answer7) {
            this.setState({
                da7: true
            })
        }
        if (da2 === data.answer8) {
            this.setState({
                da8: true
            })
        }
        if (da3 === data.answer9) {
            this.setState({
                da9: true
            })
        }
        if (da3 === data.answer10) {
            this.setState({
                da10: true
            })
        }
        if (da3 === data.answer11) {
            this.setState({
                da11: true
            })
        }
        if (da3 === data.answer12) {
            this.setState({
                da12: true
            })
        }

    }
    getLink(pic) {
        return new Promise((resolve, reject) => {
            var storageRef = firebaseApp.storage().ref(pic);
            storageRef.getDownloadURL().then((url) => {
                resolve(url);
            }, (error) => {
                reject(error);
            });
        });
    }
    listenForItems() {
        const { params } = this.props.navigation.state;
        firebaseApp.database().ref('/Part6').orderByChild('idLesson').equalTo(params.id).on('child_added', (dataSnapshot) => {
            console.log(dataSnapshot.val())
            this.getLink(dataSnapshot.val().linktext)
                .then((html) => {
                    console.log('html', html)
                    let item = {
                        answer1: dataSnapshot.val().answer1,
                        answer2: dataSnapshot.val().answer2,
                        answer3: dataSnapshot.val().answer3,
                        answer4: dataSnapshot.val().answer4,
                        answer5: dataSnapshot.val().answer5,
                        answer6: dataSnapshot.val().answer6,
                        answer7: dataSnapshot.val().answer7,
                        answer8: dataSnapshot.val().answer8,
                        answer9: dataSnapshot.val().answer9,
                        answer10: dataSnapshot.val().answer10,
                        answer11: dataSnapshot.val().answer11,
                        answer12: dataSnapshot.val().answer12,
                        result1: dataSnapshot.val().result16,
                        result2: dataSnapshot.val().result17,
                        result3: dataSnapshot.val().result18,
                        html,
                    };
                    this.setState({
                        items: item
                    });
                });
        });
    }
    render() {
        const item = this.state.items;
        console.log('item', this.state.items)
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center', padding: 5, backgroundColor: '#119f81', elevation: 2
            }}>
                <View style={{ flex: 1 }}>
                    <View style={styles.view1}>
                        <WebView
                            source={{ uri: item.html }}
                            style={{ backgroundColor: 'white' }}
                        />
                    </View>
                    <View style={{ padding: 2 }} />
                    <View style={styles.view1}>
                        <ScrollView>
                            <View >
                                <Text style={{ fontSize: 17, color: '#119f81' }}> Điền vào chỗ trống </Text>
                                <Text style={{ fontSize: 15, color: 'black' }}> Vị trí (16)</Text>
                            </View>
                            <View>
                                <RadioGroup color='#119f81'
                                    onSelect={(index, value) => this.setState({ myAnswer1: value })}
                                >
                                    <RadioButton value={item.answer1} >
                                        <Text style={[this.state.da1 && styles.da]} >A.{item.answer1}</Text>
                                    </RadioButton>
                                    <RadioButton value={item.answer2}>
                                        <Text style={[this.state.da2 && styles.da]}>B.{item.answer2}</Text>
                                    </RadioButton>
                                    <RadioButton value={item.answer3}>
                                        <Text style={[this.state.da3 && styles.da]}>C.{item.answer3}</Text>
                                    </RadioButton>
                                    <RadioButton value={item.answer4}>
                                        <Text style={[this.state.da4 && styles.da]}>D.{item.answer4}</Text>
                                    </RadioButton>
                                </RadioGroup>
                            </View>

                            <View >
                                <Text style={{ fontSize: 15, color: 'black' }}>Vị trí (17)</Text>
                            </View>
                            <View>
                                <RadioGroup color='#119f81'
                                    onSelect={(index, value) => this.setState({ myAnswer2: value })}
                                >
                                    <RadioButton value={item.answer5} >
                                        <Text style={[this.state.da5 && styles.da]} >A.{item.answer5}</Text>
                                    </RadioButton>
                                    <RadioButton value={item.answer6}>
                                        <Text style={[this.state.da6 && styles.da]}>B.{item.answer6}</Text>
                                    </RadioButton>
                                    <RadioButton value={item.answer7}>
                                        <Text style={[this.state.da7 && styles.da]}>C.{item.answer7}</Text>
                                    </RadioButton >

                                    <RadioButton value={item.answer8}>
                                        <Text style={[this.state.da8 && styles.da]}>D.{item.answer8}</Text>
                                    </RadioButton>
                                </RadioGroup >
                            </View >
                            <View >
                                <Text style={{ fontSize: 15, color: 'black' }}> Vị trí (18) </Text>
                            </View>
                            <View>
                                <RadioGroup color='#119f81'
                                    onSelect={(index, value) => this.setState({ myAnswer3: value })}
                                >
                                    <RadioButton value={item.answer9} >
                                        <Text style={[this.state.da9 && styles.da]} >A.{item.answer9}</Text>
                                    </RadioButton>
                                    <RadioButton value={item.answer10}>
                                        <Text style={[this.state.da10 && styles.da]}>B.{item.answer10}</Text>
                                    </RadioButton>
                                    <RadioButton value={item.answer11}>
                                        <Text style={[this.state.da11 && styles.da]}>C.{item.answer11}</Text>
                                    </RadioButton>

                                    <RadioButton value={item.answer12}>
                                        <Text style={[this.state.da12 && styles.da]}>D.{item.answer12}</Text>
                                    </RadioButton>
                                </RadioGroup >
                            </View >
                        </ScrollView >
                    </View >
                    <View style={{ margin: 5, flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Text style={{ fontSize: 18, padding: 12, color: 'white' }}> Text Completetion </Text>
                        <TouchableOpacity onPress={() => this.answer(item)}>
                            <Image style={{ height: 50, width: 50, padding: 20 }}
                                source={require('../image/icon_rs.png')} />
                        </TouchableOpacity>
                    </View>
                </View >
            </View >

        );
    }
    async componentDidMount() {
        await this.GetUser()
        await this.listenForItems();
    }
}

const styles = StyleSheet.create({
    view1: {
        flex: 8,
        elevation: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#f0f0ff',
        backgroundColor: 'white'
    },
    da: {
        color: 'red'
    }
})