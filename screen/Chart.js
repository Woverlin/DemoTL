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
        }, console.log('state loading', this.state.isLoading))
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
                    <Text style={styles.header}> Đang phân tích dữ liệu...</Text>
                </View >
            );
        else {
            const { data } = this.state
            console.log('processdata', data)
            return (
                <View >
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
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5fcff"
    },
    header: {
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'red'
    }
});