/* @flow */

import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet, Image, Button, TouchableOpacity
} from 'react-native';
import { StackNavigator, NavigationActions, TabNavigator, DrawerNavigator } from "react-navigation";

import Search from './screen/Search';
import Grammar from './screen/Grammar';
import Lesson from './screen/Lesson';
import Home2 from './screen/Home2';
import SlieMenu from './screen/SlideMenu'

import Test from './screen/Test';

import Lst_Test from './screen/Lst_Test';
import Game from './screen/Game';
import Lst_LuyenNghe from './screen/Lst_LuyenNghe';
import Game_LuyenNghe from './screen/Game_LuyenNghe';

import Game_NghiaTV from './screen/Game_NghiaTV';
import Lst_NghiaTV from './screen/Lst_NghiaTV';

import Game_NghiaTA from './screen/Game_NghiaTA';
import Lst_NghiaTA from './screen/Lst_NghiaTA';

//import Game_LuyenViet from './screen/Game_LuyenViet';
import Lst_LuyenViet from './screen/Lst_LuyenViet';
import TestPart1 from './screen/TestPart1';
import TestPart2 from './screen/TestPart2';
import TestPart3 from './screen/TestPart3';
import TestPart4 from './screen/TestPart4';
import TestPart5 from './screen/TestPart5';
import TestPart6 from './screen/TestPart6';
import TestPart7 from './screen/TestPart7';
import Grammar_View from './screen/Grammar_View'
import VocabSave from './screen/VocabSave';
import Support from './screen/Support'
import TopicSaved from './screen/TopicSave'
import Login from './screen/Login'
import Register from './screen/Register'
import ListTestAll from './screen/ListTestALL'
import TestAllPart1 from './screen/TestAllPart1'
import TestAllPart7 from './screen/TestAllPart7'
import TestAllPart2 from './screen/TestAllPart2'
const Stack_Home = StackNavigator({
    Home: {
        screen: Home2,
        navigationOptions: ({ navigation }) => ({
            title: '600 Từ vựng Toeic',
            tintColor: 'red',
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
                    <Image
                        style={{ margin: 5, height: 25, width: 25, tintColor: '#26a8ff' }}
                        source={require('./image/icon_menu.png')}
                    />
                </TouchableOpacity>
            ),
            headerStyle: { backgroundColor: "#4C3E54", paddingLeft: 10, paddingRight: 10 },
            headerTitleStyle: { color: "white" }
        }),
    },
    Lesson: { screen: Lesson },
    Lst_Test: { screen: Lst_Test },
    TestPart1: { screen: TestPart1 },
    TestPart2: { screen: TestPart2 },
    TestPart3: { screen: TestPart3 },
    TestPart4: { screen: TestPart4 },
    TestPart5: { screen: TestPart5 },
    TestPart6: { screen: TestPart6 },
    TestPart7: { screen: TestPart7 },
    // Grammar: { screen: Grammar, },
    // Game: { screen: Game },
    // Search: { screen: Search, },
    // Grammar_View: { screen: Grammar_View },
    // Lst_LuyenNghe: { screen: Lst_LuyenNghe },
    // Game_LuyenNghe: { screen: Game_LuyenNghe },
    // Game_NghiaTV: { screen: Game_NghiaTV },
    // Lst_NghiaTV: { screen: Lst_NghiaTV },
    // Game_LuyenViet: { screen: Game_LuyenViet },
    // Lst_LuyenViet: { screen: Lst_LuyenViet },
    // Game_NghiaTA: { screen: Game_NghiaTA },
    // Lst_NghiaTA: { screen: Lst_NghiaTA },
    // VocabSave: { screen: VocabSave },
},
    {
        initialRouteName: 'Home'
    });
const Stack_Grammar = StackNavigator({    //tao header cho Ngu phap
    Home: {
        screen: Grammar,
        navigationOptions: ({ navigation }) => ({
            title: 'Ngữ pháp',
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
                    <Image
                        style={{ margin: 5, height: 25, width: 25, tintColor: '#26a8ff' }}
                        source={require('./image/icon_menu.png')}
                    />
                </TouchableOpacity>
            ),
            headerStyle: { backgroundColor: "#4C3E54", paddingLeft: 10, paddingRight: 10 },
            headerTitleStyle: { color: "white", }
        }),
    },
    Grammar_View: { screen: Grammar_View },
})
const Stack_TopicSaved = StackNavigator({    //tao header cho chủ đề đã lưu
    Home: {
        screen: TopicSaved,
        navigationOptions: ({ navigation }) => ({
            title: 'Chủ đề đã lưu',
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
                    <Image
                        style={{ margin: 5, height: 25, width: 25, tintColor: '#26a8ff' }}
                        source={require('./image/icon_menu.png')}
                    />
                </TouchableOpacity>
            ),
            headerStyle: { backgroundColor: "#4C3E54", paddingLeft: 10, paddingRight: 10 },
            headerTitleStyle: { color: "white", }

        }),
    },
    Lesson: { screen: Lesson }
})
const Stack_VocabSaved = StackNavigator({    //tao header cho từ vựng đã lưu
    Home: {
        screen: VocabSave,
        navigationOptions: ({ navigation }) => ({
            title: 'Từ vựng đã lưu',
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
                    <Image
                        style={{ margin: 5, height: 25, width: 25, tintColor: '#26a8ff' }}
                        source={require('./image/icon_menu.png')}
                    />
                </TouchableOpacity>
            ),
            headerStyle: { backgroundColor: "#4C3E54", paddingLeft: 10, paddingRight: 10 },
            headerTitleStyle: { color: "white", }
        }),
    },
})
const Stack_Game = StackNavigator({    //tao header cho Game
    Home: {
        screen: ListTestAll,
        navigationOptions: ({ navigation }) => ({
            title: 'Luyện tập',
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
                    <Image
                        style={{ margin: 5, height: 25, width: 25, tintColor: '#26a8ff' }}
                        source={require('./image/icon_menu.png')}
                    />
                </TouchableOpacity>
            ),
            headerStyle: { backgroundColor: "#4C3E54", paddingLeft: 10, paddingRight: 10 },
            headerTitleStyle: { color: "white", }

        }),
    },
    TestAllPart1: { screen: TestAllPart1 },
    TestAllPart7: { screen: TestAllPart7 },
    TestAllPart2: { screen: TestAllPart2 },
    // Lst_LuyenNghe: { screen: Lst_LuyenNghe },
    // Game_LuyenNghe: { screen: Game_LuyenNghe },
    // Game_NghiaTV: { screen: Game_NghiaTV },
    // Lst_NghiaTV: { screen: Lst_NghiaTV },

    // Lst_LuyenViet: { screen: Lst_LuyenViet },
    // Game_NghiaTA: { screen: Game_NghiaTA },
    // Lst_NghiaTA: { screen: Lst_NghiaTA },
})
const Stack_Search = StackNavigator({    //tao header cho tìm kiếm
    Home: {
        screen: Search,
        navigationOptions: ({ navigation }) => ({
            title: 'Tìm kiếm',
            // tintColor: '#1e5fc6',
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
                    <Image
                        style={{ margin: 5, height: 25, width: 25, tintColor: '#26a8ff' }}
                        source={require('./image/icon_menu.png')}
                    />
                </TouchableOpacity>
            ),
            headerStyle: { backgroundColor: "#4C3E54", paddingLeft: 10, paddingRight: 10 },
            headerTitleStyle: { color: "white", }

        }),
    },
})
const Stack_Support = StackNavigator({    //tao header cho tìm kiếm
    Home: {
        screen: Support,
        navigationOptions: ({ navigation }) => ({
            title: 'Góp ý',
            // tintColor: '#1e5fc6',
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
                    <Image
                        style={{ margin: 5, height: 25, width: 25, tintColor: '#26a8ff' }}
                        source={require('./image/icon_menu.png')}
                    />
                </TouchableOpacity>
            ),
            headerStyle: { backgroundColor: "#4C3E54", paddingLeft: 10, paddingRight: 10 },
            headerTitleStyle: { color: "white", }

        }),
    },
})
const drawernav = DrawerNavigator({

    Home1: { screen: Stack_Home },
    Grammar1: { screen: Stack_Grammar },
    Game1: { screen: Stack_Game },
    VocabSave1: { screen: Stack_VocabSaved },
    Search1: { screen: Stack_Search },
    TopicSaved1: { screen: Stack_TopicSaved },
    Support1: { screen: Stack_Support }
}, {
        initialRouteName: 'Home1',
        drawerWidth: 230,
        contentComponent: props => <SlieMenu {...props} />
    });

const Stack_Login = StackNavigator({
    Login: { screen: Login },
    Register: { screen: Register },
    drawernav: { screen: drawernav }
}, {
        headerMode: 'none',
        headerVisible: false,
    })
//export default ;
export default Stack_Login;
//AppRegistry.registerComponent('DemoTL', () => Test);