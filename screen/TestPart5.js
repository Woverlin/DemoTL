import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    FlatList,
    Text,
    View, Button,
    AsyncStorage,
    TouchableOpacity, ListView, Image, ScollView
} from 'react-native';
import { firebaseApp } from '../Config.js';
//import Swiper from 'react-native-swiper';
//import ViewPager from 'react-native-viewpager';
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
            myAnser: null,
            percent: 0,
            myAnswer: [],
            isCheck: false,
        }
    }
    GetUser = async () => {
        //const value = await AsyncStorage.getItem('user');
        const UserKey = await AsyncStorage.getItem('userKey');
        await this.setState({
            userKey: UserKey
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
    answer1() {
        const items = this.state.items
        const myAnswer = this.state.myAnswer
        var isCheck = true
        items[1].isCheck = true
        this.setState({
            items,
            isCheck: true
        }, console.log(this.state.items))

    }
    answer(item) {
        var percent1 = this.state.percent;
        console.log('diem ban dau', percent1)
        console.log('so cau', this.state.items.length)
        const id = this.props.navigation.state.params.id
        var tile = 100 / (this.state.items.length);
        if (item.result === this.state.myAnswer1) {
            percent1 = percent1 + tile
            percent1.toPrecision(4)
            //console.log('so diem1', percent1)
        }

        this.setState({
            percent: percent1
        }, () => {
            firebaseApp.database().ref('/User/' + this.state.userKey + '/Process/' + id).update({
                part5: this.state.percent
            })
        }
        )
        if (item.result === item.answer1) {
            this.setState({
                da1: true
            })
        }
        if (item.result === item.answer2) {
            this.setState({
                da2: true
            })
        }
        if (item.result === item.answer3) {
            this.setState({
                da3: true
            })
        }
        if (item.result === item.answer4) {
            this.setState({
                da4: true
            })
        }
        console.log('stateeeeeeeee', this.state)
    }
    // async listenForItems() {
    //     const { params } = this.props.navigation.state;
    //     firebaseApp.database().ref('/Part5').orderByChild('idLesson').equalTo(params.id).once('value', (dataSnapshot) => {
    //         this.setState({
    //             items: dataSnapshot.val()
    //         });
    //     });
    // }
    async listenForItems() {
        const { params } = this.props.navigation.state;
        firebaseApp.database().ref('/Part5').orderByChild('idLesson').equalTo(params.id).on('child_added', (dataSnapshot) => {
            let item = {
                id: dataSnapshot.val().id,
                answer1: dataSnapshot.val().answer1,
                answer2: dataSnapshot.val().answer2,
                answer3: dataSnapshot.val().answer3,
                answer4: dataSnapshot.val().answer4,
                question: dataSnapshot.val().question,
                result: dataSnapshot.val().result,
            };
            this.setState({
                items: [...this.state.items, item]
            });
        });
    }
    setColor(index, answer) {
        console.log(`index ${index} :answer ${answer}`)
        const items = this.state.items
        if (this.state.isCheck === true) {
            if (items[index].result === answer) {
                console.log(`dap an dung ${index}: ${answer}`)
                return {
                    color: 'red'
                }
            }
        }
    }
    renderItem = ({ item, index }) => {
        const myAnswer = this.state.myAnswer;
        console.log(myAnswer)
        return (
            <View style={styles.view1}>
                <Text style={{ fontSize: 15, color: 'black', padding: 5 }}> {item.question}</Text>
                <RadioGroup color='#119f81'
                    onSelect={(ind, value) => {
                        console.log('myanswer', value)
                        myAnswer[index] = value;
                        this.setState({ myAnswer: myAnswer }, console.log(myAnswer))
                    }}
                >
                    <RadioButton value={item.answer1} >
                        <Text style={this.setColor(index, item.answer1)} >A.{item.answer1}</Text>
                    </RadioButton>
                    <RadioButton value={item.answer2}>
                        <Text style={this.setColor(index, item.answer2)}>B.{item.answer2}</Text>
                    </RadioButton>
                    <RadioButton value={item.answer3}>
                        <Text style={this.setColor(index, item.answer3)}>C.{item.answer3}</Text>
                    </RadioButton>
                    <RadioButton value={item.answer4}>
                        <Text style={this.setColor(index, item.answer4)}>D.{item.answer4}</Text>
                    </RadioButton>
                </RadioGroup>
            </View>
        );
    }
    renderBaiHoc(data) {
        //console.log('dataaaaaaaaaa', data);
        let views = data;
        let inputRow = [];
        for (let r = 0; r < views.length; r++) {
            inputRow.push(
                <View style={{ flex: 1 }}>
                    <View style={styles.view1}>
                        <Text style={{ fontSize: 15, color: 'black', padding: 5 }}> {views[r].question}</Text>
                        <RadioGroup color='#119f81'
                            onSelect={(index, value) => this.setState({ myAnswer1: value })}
                        >
                            <RadioButton value={views[r].answer1} >
                                <Text style={[this.state.da1 && styles.da]} >A.{views[r].answer1}</Text>
                            </RadioButton>
                            <RadioButton value={views[r].answer2}>
                                <Text style={[this.state.da2 && styles.da]}>B.{views[r].answer2}</Text>
                            </RadioButton>
                            <RadioButton value={views[r].answer3}>
                                <Text style={[this.state.da3 && styles.da]}>C.{views[r].answer3}</Text>
                            </RadioButton>
                            <RadioButton value={views[r].answer4}>
                                <Text style={[this.state.da4 && styles.da]}>D.{views[r].answer4}</Text>
                            </RadioButton>
                        </RadioGroup>
                    </View>
                    <View style={{ margin: 5, flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Text style={{ fontSize: 18, padding: 12, color: 'white' }}> Incomplete Sentences </Text>
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

    async componentDidMount() {
        await this.GetUser()
        await this.listenForItems();
    }

    render() {
        console.log('item', this.state.items)
        const { items } = this.state;
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center', padding: 5, backgroundColor: '#119f81', elevation: 2
            }}>
                <IndicatorViewPager style={{ flex: 1 }}
                    onPageScroll={this.onPageScroll.bind(this)} >
                    {this.renderBaiHoc(this.state.items)}
                </IndicatorViewPager>
                {/* <FlatList
                    style={styles.container}
                    data={items}
                    renderItem={this.renderItem}
                /> */}
                {/* <ScollView>
                   {this.renderBaiHoc(this.state.items)}
                </ScollView>
                <View style={{ margin: 5, flexDirection: 'row', justifyContent: 'space-between', }}>
                    <Text style={{ fontSize: 18, padding: 12, color: 'white' }}> Incomplete Sentences </Text>
                    <TouchableOpacity onPress={() => this.answer1()}>
                        <Image style={{ height: 50, width: 50, padding: 20 }}
                            source={require('../image/icon_rs.png')} />
                    </TouchableOpacity>
                </View> */}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    view1: {
        flex: 8,
        elevation: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#f0f0ff',
        backgroundColor: 'white',
        margin: 10,
    },
    da: {
        color: 'red'
    }
})