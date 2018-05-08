
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
  ScrollView, ActivityIndicator
} from 'react-native';
import Sound from 'react-native-sound';
import { SearchBar } from 'react-native-elements'
import { firebaseApp } from '../Config.js';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CheckAlert from "react-native-awesome-alert"
export default class Search extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image
        style={[styles.icon, { tintColor: tintColor }]}
        source={require('../image/icon_search.png')} />
    ),
  };
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      searchText: "",
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

  firstSearch() {
    let arr = []
    var text = this.state.searchText.toString()
    console.log('Text la :' + this.state.searchText);
    if (this.state.searchText == "") {
    }
    else {
      console.log('run else')
      firebaseApp.database().ref('Vocab').limitToFirst(10).orderByChild('word').startAt(text).on('value', (dataSnapshot) => {
        dataSnapshot.forEach((child) => {
          this.setState({
            items: []   //del items old
          })
          this.getPic(child.val().linkImg).then((pic2) => {
            this.getPic(child.val().linkAudio).then((audio) => {
              let data = {
                name: child.val().word,
                stt: child.val().id,
                pronounce: child.val().pronounce,
                type: child.val().type,
                mean: child.val().mean,
                exp: child.val().explainMean,
                pic2,
                audio,
              }
              this.setState({
                items: [...this.state.items, data]
              })
            })
          })
        })
      })

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
  des(item) {
    this.checkAlert.alert(item.name +" "+item.type,
    <View style={{ padding: 3, alignItems: 'center', textAlign: 'center' }}>
        <Image
          style={{ alignItems: 'center', height: 170, width: 220 }}
          source={{ uri: item.pic2 }} />
        <Text style={{ padding: 5, fontSize: 17, color: "red" }}> {item.pronounce}</Text>
        <Text style={{ fontSize: 17, color: "#119f81", textAlign: 'center' }}> {item.mean}</Text>
        <TouchableOpacity style={{paddingTop: 5 ,}} onPress={() => this.playTrack(item.audio)}>
          <Icon name="volume-up" size={30} />
        </TouchableOpacity>
      </View>,
      [
        { text: "Trở về", onPress: () => console.log("Cancel touch") }
      ])
  }
  render() {
    const { items } = this.state;
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View>
          <SearchBar style={{ backgroundColor: 'white' }}
            round
            returnKeyType='search'
            lightTheme
            placeholder='Search...'
            onChangeText={(text) => this.setState({ searchText: text })}
            onSubmitEditing={() => this.firstSearch()}
          />

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
        </View>
        <ScrollView>

          {/* <ActivityIndicator
            size="large"
            color="#3498db"
            //style={styles.activityStyle}
        />    */}
          <FlatList
            data={items}
            keyExtractor={(item) => items.stt}
            renderItem={({ item }) =>
              <View style={{ margin: 4 }}>
                <TouchableOpacity
                  style={styles.lesson}
                  onPress={() => this.des(item)}
                >
                  <Image
                    style={styles.pic}
                    source={{ uri: item.pic2 }} />
                  <View style={{ flexDirection: 'column', paddingRight: 10 }} >
                    <Text style={styles.lsname}>
                      {item.name} {item.type} 
                    </Text>
                    <Text style={{ color: 'red', fontSize: 15, paddingLeft: 17, paddingRight: 10 }}>
                       {item.pronounce}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            }
          />
        </ScrollView>
      </View>
    );
  }
  componentDidMount() {
    this.firstSearch();
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#119f81'
  },
  icon: {
    width: 20,
    height: 20,
  },
  lesson: {
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
    color: '#388e3c',
    fontSize: 15,
    paddingTop: 10,
    paddingLeft: 17,
  }
});

