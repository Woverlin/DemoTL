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
import Sound from 'react-native-sound';
import CheckAlert from "react-native-awesome-alert"
export default class VocabSave extends Component {
  constructor(props) {
    super(props);
    this.getPic = this.getPic.bind(this);
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
  compare(a, b) {
    if (a.key < b.key)
      return -1;
    if (a.key > b.key)
      return 1;
    return 0;
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
    await firebaseApp.database().ref('/User/' + this.state.userKey + '/Vocab').on('child_added', (dataSnapshot) => {
      let item = {
        stt: dataSnapshot.val().stt,
        name: dataSnapshot.val().name,
        key: dataSnapshot.key,
        mean: dataSnapshot.val().mean,
        example: dataSnapshot.val().example,
        explainMean: dataSnapshot.val().explainMean,
        explainExample: dataSnapshot.val().explainExample,
        type: dataSnapshot.val().type,
        pronounce: dataSnapshot.val().pronounce,
        parent: dataSnapshot.val().parent,
        pic: dataSnapshot.val().pic,
        audio: dataSnapshot.val().audio,
      };
      arr.push(item);
    })
    let result = arr.sort(this.compare);
    this.setState({
      items: result
    })
    console.log('items', this.state.items)
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
  indexOf(giatri) {
    let temp = this.state.items
    for (var i = 0; i < temp.length; i++) {
      if (temp[i].key == giatri)
        return i
    }
  }
  delete(key, stt) {
    firebaseApp.database().ref('/User/' + this.state.userKey + '/Vocab/' + stt).remove();
    let temp = this.state.items.filter((x) => x.stt !== stt);
    this.setState({ items: temp });
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
  des(item) {
    this.checkAlert.alert(item.name + item.type,
      <View style={{ padding: 3, alignItems: 'center', textAlign: 'center' }}>
        <Image
          style={{ alignItems: 'center', height: 150, width: 200 }}
          source={{ uri: item.pic }} />
        {/* <Text style={{fontSize:17}}> {name} : {phienam}</Text> */}
        <Text style={{ fontSize: 17, color: "red" }}> {item.pronounce}</Text>
        <Text style={{ fontSize: 19, color: "#119f81", textAlign: 'center' }}> {item.mean}</Text>
        <Text style={{ fontSize: 15, color: "#005b9f", textAlign: 'center' }}> example: {item.example}</Text>
        <TouchableOpacity style={{ paddingTop: 5, }} onPress={() => this.playTrack(item.audio)}>
          <Icon name="volume-up" size={30} />
        </TouchableOpacity>
      </View>,
      [
        { text: "Trở về", onPress: () => console.log("Cancel touch") }
      ])
  }
  render() {
    const { navigate } = this.props.navigation;
    const { items } = this.state;
    return (

      <View style={{ flex: 1, justifyContent: 'center', padding: 10, backgroundColor: '#119f81' }}>
        <CheckAlert //tuy chinh cho alert 
          styles={{
            modalContainer: { backgroundColor: "rgba(49,49,49,0.8)" },
            checkBox: { padding: 10 },
            modalView: {
              marginBottom: 10,
              borderRadius: 10,
              borderColor: 'black',
              borderWidth: StyleSheet.hairlineWidth
            },
            button: {
              justifyContent: 'center',
              alignItems: 'center',
              padding: 15,
              borderColor: 'gray'
            },
            buttonContainer: {
              flexDirection: 'row',
              justifyContent: 'center',
              borderColor: 'gray',
              borderTopWidth: StyleSheet.hairlineWidth
            },
          }}
          ref={ref => (this.checkAlert = ref)}
          transparent={true}
          animationType={"fade"}
        />
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
                    onPress={() => { this.des(item) }}>
                    <Image
                      style={styles.pic}
                      source={{ uri: item.pic }}
                    />
                    <View style={{ flexDirection: 'column' }}>
                      <Text style={styles.lsname}>
                        {item.name} {item.type}
                      </Text>
                      <Text style={{ fontSize: 15, color: 'red' }}>
                        {item.pronounce}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.delete(item.key, item.stt)} >
                    <Icon1 style={styles.trash} name="trash" size={30} />
                  </TouchableOpacity>
                </View>
              </View>
            )
          }
          } />
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
  trash: {
    marginRight: 10,
  },
  icon: {
    width: 25,
    height: 25,
  },
  lesson: {
    alignContent: 'center',
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
  lsname: {
    color: '#119f81',
    fontSize: 17,
  },
});
