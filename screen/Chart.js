import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    FlatList,
    Text,
    Animated,
    View, Button,
    AsyncStorage,
    ScrollView,
    TouchableOpacity, ListView, Image, ScollView
} from 'react-native';
import { firebaseApp } from '../Config.js';
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import { List } from "react-native-elements";

const data = [
    { quarter: "1", earnings: 15 },
    { quarter: "2", earnings: 75 },
    { quarter: "3", earnings: 33 },
    { quarter: "4", earnings: 60 },
    { quarter: "5", earnings: 50 },
    { quarter: "6", earnings: 100 },
    { quarter: "7", earnings: 50 }
];

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.GetUser = this.GetUser.bind(this)
        this.listenForItem = this.listenForItem.bind(this)
        this.processData = this.processData.bind(this)
        this.state = {
            items: [],
            isLoading: true,
            data: [],
        }
    }
    GetUser = async () => {
        //const value = await AsyncStorage.getItem('user');
        const UserKey = await AsyncStorage.getItem('userKey');
        await this.setState({
            userKey: UserKey
        }, () => { console.log('userkey', this.state.userKey) })
    }
    async listenForItem() {
        const { params } = this.props.navigation.state;
        firebaseApp.database().ref('/User/' + this.state.userKey + '/Process').on('child_added', (dataSnapshot) => {
            console.log('datasnap', dataSnapshot.val())
            let item = {
                part1: dataSnapshot.val().part1,
                part2: dataSnapshot.val().part2,
                part3: dataSnapshot.val().part3,
                part4: dataSnapshot.val().part4,
                part5: dataSnapshot.val().part5,
                part6: dataSnapshot.val().part6,
                part7: dataSnapshot.val().part7
            };
            this.setState({
                items: [...this.state.items, item]
            }, () => console.log('items', this.state.items));
        });
    }
    sum(item) {
        console.log('itemsum', item)
        var sum = 0
        for (var i = 0; i < item.length; i++) {
            sum = sum + item[i]
        }
        return sum
    }

    async processData() {
        console.log('abc', this.state.items)
        var part1 = []
        var part2 = []
        var part3 = []
        var part4 = []
        var part5 = []
        var part6 = []
        var part7 = []
        var percentPart1 = 0
        var percentPart2 = 0
        var percentPart3 = 0
        var percentPart4 = 0
        var percentPart5 = 0
        var percentPart6 = 0
        var percentPart7 = 0
        const { items } = this.state
        for (var i = 0; i < items.length; i++) {
            if (items[i].part1 !== undefined)
                part1.push(items[i].part1)
            if (items[i].part2 !== undefined)
                part2.push(items[i].part2)
            if (items[i].part3 !== undefined)
                part3.push(items[i].part3)
            if (items[i].part4 !== undefined)
                part4.push(items[i].part4)
            if (items[i].part5 !== undefined)
                part5.push(items[i].part5)
            if (items[i].part6 !== undefined)
                part6.push(items[i].part6)
            if (items[i].part7 !== undefined)
                part7.push(items[i].part7)
        }
        percentPart1 = this.sum(part1) / part1.length
        console.log('percent1', percentPart1)

        const data = [
            { part: "1", percent: this.sum(part1) / part1.length },
            { part: "2", percent: this.sum(part2) / part2.length },
            { part: "3", percent: this.sum(part3) / part3.length },
            { part: "4", percent: this.sum(part4) / part4.length },
            { part: "5", percent: this.sum(part5) / part5.length },
            { part: "6", percent: this.sum(part6) / part6.length },
            { part: "7", percent: this.sum(part7) / part7.length }
        ];
        console.log('data', data)
        this.setState({
            data: data,
            isLoading: false
        })
    }
    async componentDidMount() {
        await this.GetUser()
        await this.listenForItem()
        await this.processData()
    }
    renderChart() {

        if (this.state.isLoading)
            return (
                <View>
                    <Text style={{ flex: 1, fontSize: 20, justifyContent: 'center', alignItems: 'center', color: '#ff0000' }}> Đang phân tích dữ liệu...</Text>
                </View >
            );
        else {
            const { data } = this.state
            console.log('processdata', data)
            var listen = (data[0].percent + data[1].percent + data[2].percent + data[3].percent) / 4
            var read = (data[4].percent + data[5].percent + data[6].percent) / 3
            return (
                <ScrollView>
                    < View style={styles.container} >
                        <View style={styles.data}>
                            <View style={styles.form1} >
                                <Text style={styles.text1}> Listening</Text>
                                <Text style={styles.text1}> {listen.toFixed(0)}%</Text>
                            </View>
                            <View style={styles.form2} >
                                <Text style={styles.text1}> Reading</Text>
                                <Text style={styles.text1}> {read.toFixed(0)}%</Text>
                            </View>
                        </View>
                        <View style={{ backgroundColor: '#9599ad', borderRadius: 2, alignItems: 'center', padding: 5 }}>
                            <Text style={styles.header}> Chi tiết </Text>
                        </View>
                        <View style={styles.item}>
                            <Text style={styles.tieude}>Part 1</Text>
                            <View style={styles.data}>
                                <Animated.View style={[styles.bar, styles.points1, { width: data[0].percent * 3 + 1 }]} />
                                <Text style={styles.percent}>{data[0].percent.toFixed(0)} %</Text>
                            </View>
                            <Text style={styles.tieude}>Part 2</Text>
                            <View style={styles.data}>
                                <Animated.View style={[styles.bar, styles.points2, { width: data[1].percent * 3 + 1 }]} />
                                <Text style={styles.percent}>{data[1].percent.toFixed(0)}%</Text>
                            </View>
                            <Text style={styles.tieude}>Part 3</Text>
                            <View style={styles.data}>
                                <Animated.View style={[styles.bar, styles.points3, { width: data[2].percent * 3 + 1 }]} />
                                <Text style={styles.percent}>{data[2].percent.toFixed(0)}%</Text>
                            </View>
                            <Text style={styles.tieude}>Part 4</Text>
                            <View style={styles.data}>
                                <Animated.View style={[styles.bar, styles.points4, { width: data[3].percent * 3 + 1 }]} />
                                <Text style={styles.percent}>{data[3].percent.toFixed(0)}%</Text>
                            </View>
                            <Text style={styles.tieude}>Part 5</Text>
                            <View style={styles.data}>
                                <Animated.View style={[styles.bar, styles.points5, { width: data[4].percent * + 1 }]} />
                                <Text style={styles.percent}>{data[4].percent.toFixed(0)}%</Text>
                            </View>
                            <Text style={styles.tieude}>Part 6</Text>
                            <View style={styles.data}>
                                <Animated.View style={[styles.bar, styles.points6, { width: data[5].percent * 3 + 1 }]} />
                                <Text style={styles.percent}>{data[5].percent.toFixed(0)}%</Text>
                            </View>
                            <Text style={styles.tieude}>Part 7</Text>
                            <View style={styles.data}>
                                <Animated.View style={[styles.bar, styles.points7, { width: data[6].percent * 3 + 1 }]} />
                                <Text style={styles.percent}>{data[6].percent.toFixed(0)}%</Text>
                            </View>
                        </View>
                        <View style={{ backgroundColor: '#9599ad', borderRadius: 2, alignItems: 'center', padding: 5 }}>
                            <Text style={styles.header}> Biểu đồ thi </Text>
                        </View>
                        <View>
                            <VictoryChart
                                domain={{ x: [0, 7], y: [0, 100] }}
                                domainPadding={{ x: 5 }}
                                animate={{ duration: 1000 }}
                                width={400}
                                heigh={450}
                            //theme={VictoryTheme.material}
                            >
                                <VictoryBar data={data}
                                    x="part" y="percent"
                                // barRatio={0.8}
                                />
                            </VictoryChart>
                        </View >
                    </View>
                </ScrollView >
            );
        }
    }
    render() {
        return (
            <View style={styles.container}>
                {this.renderChart()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#cbd8ed"
    },
    text1: {
        color: 'white',
        fontSize: 20
    },
    header: {
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fcbd24'
    },
    viewChuthich: {
        flexDirection: 'column',
        paddingHorizontal: 10,
    },
    chuthich: {
        fontSize: 13,
        color: 'black',
    },
    tieude: {
        fontSize: 13,
    },
    form1: {
        height: 100,
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#d8300a',
        justifyContent: 'center',
    },
    form2: {
        height: 100,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#48ab39'
    },
    percent: {
        fontSize: 13
    },
    data: {
        flexDirection: 'row',
        margin: 2,
    },
    bar: {
        alignSelf: 'center',
        borderRadius: 5,
        height: 8,
        marginRight: 5
    },
    points1: {
        backgroundColor: '#F55443'
    },
    points2: {
        backgroundColor: '#fcbd24'
    },
    points3: {
        backgroundColor: '#59838b'
    },
    points4: {
        backgroundColor: '#4d98e4'
    },
    points5: {
        backgroundColor: '#418e50'
    },
    points6: {
        backgroundColor: '#7b7fec'
    },
    points7: {
        backgroundColor: '#3abaa4'
    },
    item: {
        padding: 2,
    }

});