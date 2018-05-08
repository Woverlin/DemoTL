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
export default class TestPart7 extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.name}` + ' Part VII',
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
        }
    }
    playTrack(audio) {
        console.log('play run :' + audio)
        const track = new Sound(audio, null, (e) => {
            if (e) {
                console.log('error loading track:', e)
            } else {
                track.play()
            }
        })
    }
    answer(data) {
        console.log('linkhtml', data.html)
        var da1 = data.result1;
        var da2 = data.result2;
        var da3 = data.result3;
        var da4 = data.result4;
        var da5 = data.result5;
        this.setState(prevState => {
            return { linkHTML: data.html }
        }, () => {
            console.log('state linkhtml' + this.state.linkHTML)
        })

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
        if (da4 === data.answer13) {
            this.setState({
                da13: true
            })
        }
        if (da4 === data.answer14) {
            this.setState({
                da14: true
            })
        }
        if (da4 === data.answer15) {
            this.setState({
                da15: true
            })
        }
        if (da4 === data.answer16) {
            this.setState({
                da16: true
            })
        }
        if (da5 === data.answer17) {
            this.setState({
                da17: true
            })
        }
        if (da5 === data.answer18) {
            this.setState({
                da18: true
            })
        }
        if (da5 === data.answer19) {
            this.setState({
                da19: true
            })
        }
        if (da5 === data.answer20) {
            this.setState({
                da20: true
            })
        }
        console.log('data',this.state)
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
        firebaseApp.database().ref('/Part7').orderByChild('idLesson').equalTo(params.id).on('child_added', (dataSnapshot) => {
            console.log(dataSnapshot.val())
            this.getLink(dataSnapshot.val().linkcomprehension)
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
                        answer13: dataSnapshot.val().answer13,
                        answer14: dataSnapshot.val().answer14,
                        answer15: dataSnapshot.val().answer15,
                        answer16: dataSnapshot.val().answer16,
                        answer17: dataSnapshot.val().answer17,
                        answer18: dataSnapshot.val().answer18,
                        answer19: dataSnapshot.val().answer19,
                        answer20: dataSnapshot.val().answer20,
                        question1: dataSnapshot.val().question19,
                        question2: dataSnapshot.val().question20,
                        question3: dataSnapshot.val().question21,
                        question4: dataSnapshot.val().question22,
                        question5: dataSnapshot.val().question23,
                        result1: dataSnapshot.val().result19,
                        result2: dataSnapshot.val().result20,
                        result3: dataSnapshot.val().result21,
                        result4: dataSnapshot.val().result22,
                        result5: dataSnapshot.val().result23,
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
                                <Text style={styles.qs} > {item.question1}</Text>
                            </View>
                            <View>
                                <RadioGroup color='#119f81'>

                                    <RadioButton value={'item1'} >
                                        <Text style={[this.state.da1 && styles.da]} >A.{item.answer1}</Text>

                                    </RadioButton>

                                    <RadioButton value={'item2'}>
                                        <Text style={[this.state.da2 && styles.da]}>B.{item.answer2}</Text>
                                    </RadioButton>

                                    <RadioButton value={'item3'}>
                                        <Text style={[this.state.da3 && styles.da]}>C.{item.answer3}</Text>
                                    </RadioButton>

                                    <RadioButton value={'item4'}>
                                        <Text style={[this.state.da4 && styles.da]}>D.{item.answer4}</Text>
                                    </RadioButton>
                                </RadioGroup>
                            </View>

                            <View >
                                <Text style={styles.qs} > {item.question2}</Text>
                            </View>
                            <View>
                                <RadioGroup color='#119f81'>
                                    <RadioButton value={'item1'} >
                                        <Text style={[this.state.da5 && styles.da]} >A.{item.answer5}</Text>
                                    </RadioButton>
                                    <RadioButton value={'item2'}>
                                        <Text style={[this.state.da6 && styles.da]}>B.{item.answer6}</Text>
                                    </RadioButton>
                                    <RadioButton value={'item3'}>
                                        <Text style={[this.state.da7 && styles.da]}>C.{item.answer7}</Text>
                                    </RadioButton>

                                    <RadioButton value={'item4'}>
                                        <Text style={[this.state.da8 && styles.da]}>D.{item.answer8}</Text>
                                    </RadioButton>
                                </RadioGroup >
                            </View>
                            <View >
                                <Text style={styles.qs} > {item.question3}</Text>
                            </View>
                            <View>
                                <RadioGroup color='#119f81'>
                                    <RadioButton value={'item1'} >
                                        <Text style={[this.state.da9 && styles.da]} >A.{item.answer9}</Text>
                                    </RadioButton>
                                    <RadioButton value={'item2'}>
                                        <Text style={[this.state.da10 && styles.da]}>B.{item.answer10}</Text>
                                    </RadioButton>
                                    <RadioButton value={'item3'}>
                                        <Text style={[this.state.da11 && styles.da]}>C.{item.answer11}</Text>
                                    </RadioButton>

                                    <RadioButton value={'item4'}>
                                        <Text style={[this.state.da12 && styles.da]}>D.{item.answer12}</Text>
                                    </RadioButton>
                                </RadioGroup>
                            </View>
                            <View >
                                <Text style={styles.qs} > {item.question4}</Text>
                            </View>
                            <View>
                                <RadioGroup color='#119f81'>

                                    <RadioButton value={'item1'} >
                                        <Text style={[this.state.da13 && styles.da]} >A.{item.answer13}</Text>

                                    </RadioButton>

                                    <RadioButton value={'item2'}>
                                        <Text style={[this.state.da14 && styles.da]}>B.{item.answer14}</Text>
                                    </RadioButton>

                                    <RadioButton value={'item3'}>
                                        <Text style={[this.state.da15 && styles.da]}>C.{item.answer15}</Text>
                                    </RadioButton>

                                    <RadioButton value={'item4'}>
                                        <Text style={[this.state.da16 && styles.da]}>D.{item.answer16}</Text>
                                    </RadioButton>
                                </RadioGroup>
                            </View>

                            <View >
                                <Text style={styles.qs} > {item.question5}</Text>
                            </View>
                            <View>
                                <RadioGroup color='#119f81'>
                                    <RadioButton value={'item1'} >
                                        <Text style={[this.state.da17 && styles.da]} >A.{item.answer17}</Text>
                                    </RadioButton>
                                    <RadioButton value={'item2'}>
                                        <Text style={[this.state.da18 && styles.da]}>B.{item.answer18}</Text>
                                    </RadioButton>
                                    <RadioButton value={'item3'}>
                                        <Text style={[this.state.da19 && styles.da]}>C.{item.answer19}</Text>
                                    </RadioButton>
                                    <RadioButton value={'item4'}>
                                        <Text style={[this.state.da20 && styles.da]}>D.{item.answer20}</Text>
                                    </RadioButton>
                                </RadioGroup >
                            </View>
                        </ScrollView>
                    </View>
                    <View style={{ margin: 5, flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Text style={{ fontSize: 18, padding: 12,color:'white'  }}> Reading Comprehension </Text>
                        <TouchableOpacity onPress={() => this.answer(item)}>
                            <Image style={{ height: 50, width: 50, padding: 20 }}
                                source={require('../image/icon_rs.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
    componentDidMount() {
        this.listenForItems();
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
    },
    qs: {
        fontSize: 15,
        color: 'black',
    }
})