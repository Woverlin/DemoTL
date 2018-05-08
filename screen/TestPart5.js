import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    FlatList,
    Text,
    View, Button,
    AsyncStorage,
    TouchableOpacity, ListView, Image
} from 'react-native';
import { firebaseApp } from '../Config.js';
//import Swiper from 'react-native-swiper';

import Sound from 'react-native-sound';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import { PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator } from 'rn-viewpager';
export default class TestPart5 extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.name}` + ' Part V',
        headerTintColor: '#119f81'
    });
    constructor(props) {
        super(props);
        this.itemRef = firebaseApp.database();
        this.listenForItems = this.listenForItems.bind(this);
        this.answer = this.answer.bind(this)
        this.items = [];
        this.state = {
            items: [],
            da1: false,
            da2: false,
            da3: false,
            da4: false,
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
    onPageScroll() {
        return this.setState({
            da1: false,
            da2: false,
            da3: false,
            da4: false,
        })
    }
    answer(item) {
        if (item.result === item.answer1) {
            this.setState({
                da1: true
            })
        }
        if (item.result  === item.answer2) {
            this.setState({
                da2: true
            })
        }
        if (item.result  === item.answer3) {
            this.setState({
                da3: true
            })
        }
        if (item.result  === item.answer4) {
            this.setState({
                da4: true
            })
        }
        console.log('stateeeeeeeee',this.state)
    }
    listenForItems() {
        const { params } = this.props.navigation.state;
        firebaseApp.database().ref('/Part5').orderByChild('idLesson').equalTo(params.id).once('value', (dataSnapshot) => {
            // let item = {
            //     id: dataSnapshot.val().id,
            //     answer1: dataSnapshot.val().answer1,
            //     answer2: dataSnapshot.val().answer2,
            //     answer3: dataSnapshot.val().answer3,
            //     answer4: dataSnapshot.val().answer4,
            //     question: dataSnapshot.val().question,
            //     result: dataSnapshot.val().result,
            // };
            this.setState({
                items: dataSnapshot.val()
            });
        });
    }
    renderBaiHoc(data) {
        console.log('dataaaaaaaaaa',data);
        let views = data;
        let inputRow = [];
        for (let r = 0; r < views.length; r++) {
            //this.bookmark(views[r].mark,r)
            inputRow.push(
                <View style={{ flex: 1 }}>
                    <View style={styles.view1}>
                        <View>
                        <Text style={{fontSize:15,color:'black',padding:5}}> {views[r].question}</Text>
                            <RadioGroup color='#119f81'>
                                <RadioButton value={'item1'} >
                                    <Text style={[this.state.da1 && styles.da]} >A.{views[r].answer1}</Text>
                                </RadioButton>

                                <RadioButton value={'item2'}>
                                    <Text style={[this.state.da2 && styles.da]}>B.{views[r].answer2}</Text>
                                </RadioButton>

                                <RadioButton value={'item3'}>
                                    <Text style={[this.state.da3 && styles.da]}>C.{views[r].answer3}</Text>
                                </RadioButton>
                                <RadioButton value={'item4'}>
                                    <Text style={[this.state.da4 && styles.da]}>D.{views[r].answer4}</Text>
                                </RadioButton>
                            </RadioGroup>
                        </View>
                        <View>
                        </View>
                    </View>
                    <View style={{ margin: 5, flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Text style={{ fontSize: 18, padding: 12,color:'white'  }}> Incomplete Sentences </Text>
                        <TouchableOpacity onPress={() => this.answer(views[r])}>
                            <Image style={{ height: 50, width: 50, padding: 20 }}
                                source={require('../image/icon_rs.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }

        return inputRow;
    }
    render() {
        return (

            <View style={{
                flex: 1,
                justifyContent: 'center', padding: 5, backgroundColor: '#119f81', elevation: 2
            }}>
                <IndicatorViewPager style={{ flex: 1 }} onPageScroll={this.onPageScroll.bind(this)} >
                    {this.renderBaiHoc(this.state.items)}
                </IndicatorViewPager>
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
    }
})