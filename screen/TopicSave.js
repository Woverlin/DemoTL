import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ListView,
    TouchableOpacity,
    AsyncStorage,
    FlatList,
    RefreshControl
} from 'react-native';
import { firebaseApp } from '../Config.js';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/FontAwesome';
export default class Home extends Component {
    constructor(props) {
        super(props);
        //this.listenForItems = this.listenForItems.bind(this);
        this.getPic = this.getPic.bind(this);
        //this.items = [];

        this.state = {
            img: [],
            items: [],
            refreshing: false,
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
    GetUser = async () => {
        const value = await AsyncStorage.getItem('user');
        const UserKey = await AsyncStorage.getItem('userKey');
        await this.setState({
            user: value,
            userKey: UserKey
        })
        await console.log('user and key', this.state.user, this.state.userKey)
    }
    async listenForItems() {
        await this.GetUser();
        let arr = [];
        await firebaseApp.database().ref('/User/' + this.state.userKey + '/Topic').on('child_added', (dataSnapshot) => {
            console.log('data:', dataSnapshot.val());
            let item = {
                name: dataSnapshot.val().name,
                stt: dataSnapshot.val().id,
                mean: dataSnapshot.val().mean,
                key: dataSnapshot.key,
                pic2: dataSnapshot.val().pic
            };
            arr.push(item);
            //return arr
            //array
            //array.push(item) neu soluong === so luong can
            //return array
            //sdung ham then -> sap xep bo setState
        });
        let result = arr.sort(this.compare);
        this.setState({
            items: result
        })
    }
    _onRefresh() {
        this.setState({
            refreshing: true
        })
        setTimeout(function () {
            this.setState({
                refreshing: false
            })
        }.bind(this), 1000)
    }
    delete(stt) {
        firebaseApp.database().ref('/User/' + this.state.userKey + '/Topic/' + stt).remove();
        let temp = this.state.items.filter((x) => x.stt !== stt);
        this.setState({ items: temp });
    }
    render() {
        const { navigate } = this.props.navigation;
        const { items } = this.state;
        //console.log('Items Items', items);
        return (

            <View style={{ flex: 1, justifyContent: 'center', padding: 10, backgroundColor: '#119f81' }}>

                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            title="Pull to refresh"
                            tintColor="#fff"
                            titleColor="#fff" />
                    }
                    data={items}
                    keyExtractor={(item) => item.stt}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ backgroundColor: '#119f81' }}>
                                <View style={styles.lesson}>
                                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', flex: 9 }}
                                        onPress={() => { navigate('Lesson', { name: item.name, id: item.stt }); }}>
                                        <Image
                                            style={styles.pic}
                                            source={{ uri: item.pic2 }}
                                        />
                                        <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                            <Text style={styles.lsname}>
                                                Lesson {item.stt}: {item.name}
                                            </Text>
                                            <Text style={styles.lsname1}>
                                                {item.mean}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.delete(item.stt)}>
                                        <Icon1 style={styles.trash} name="trash" size={30} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }
                    }

                />
            </View>
        );
    }
    componentWillMount() {
        this.listenForItems();
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
        justifyContent: 'space-between',
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
    trash: {
        marginRight: 10,
    },
    lsname: {
        color: '#119f81',
        fontSize: 15,
        paddingLeft: 15,
        paddingBottom: 10
    },
    lsname1: {
        color: '#ff0000',
        fontSize: 12,
        paddingLeft: 15,
        paddingBottom: 5
    }
});
