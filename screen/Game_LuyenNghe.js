import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View, Button,
  AsyncStorage,
  TouchableOpacity, ListView, Image, TextInput
} from 'react-native';
import { firebaseApp } from '../Config.js';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator } from 'rn-viewpager';
import Sound from 'react-native-sound';

export default class Game_LuyenNghe extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.name}`,
    headerTintColor: '#119f81',

  });
  constructor(props) {
    super(props);
    this.itemRef = firebaseApp.database();
    this.listenForItems = this.listenForItems.bind(this);
    this.getPic = this.getPic.bind(this);
    this.items = [];
    this.state = {
      items: [],
      text: '',
      dung: false,
      sai: false,

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

  playTrack(audio) {
    console.log('play run :', audio)
    const track = new Sound(audio, null, (e) => {
      if (e) {
        console.log('error loading track:', e)
      } else {
        track.play()
      }
    })
  }

  playTrackDung() {
    console.log('audio dung')
    const track = new Sound(require('../audio/dung.mp3'), null, (e) => {
      if (e) {
        console.log('error loading track:', e)
      } else {
        track.play()
      }
    })
  }
  playTrackSai() {
    console.log('audio sai')
    const track = new Sound(require('../audio/sai.mp3'), null, (e) => {
      if (e) {
        console.log('error loading track:', e)
      } else {
        track.play()
      }
    })
  }
  check(text1, text2) {
    if (text1 === text2) {
      //console.log('dunggggggg')
      // var url =require('../audio/dung.mp3')
      this.playTrackDung()
      return this.setState({ dung: true, sai: false })
      //var url =require('../audio/dung.mp3')
      //this.playTrack('../audio/dung.mp3')
    } else {
      this.setState({ sai: true, dung: false })
      var url2 = require('../audio/sai.mp3')
      this.playTrackSai()
    }
  }
  onPageScroll() {
    return this.setState({
      dung: false,
      sai: false
    })
  }
  listenForItems() {

    const { params } = this.props.navigation.state;
    console.log('id :' + params.id)
    console.log('name :' + params.name)
    firebaseApp.database().ref('/Vocab').orderByChild('parent').equalTo(params.id).on('child_added', (dataSnapshot) => {
      console.log('napshot', dataSnapshot.val().word);
      this.getPic(dataSnapshot.val().linkImg, dataSnapshot.val().stt)
        .then((pic2) => {
          this.getPic(dataSnapshot.val().linkAudio, dataSnapshot.val().stt).then((audio) => {
            let item = {
              name: dataSnapshot.val().word,
              key: dataSnapshot.key,
              mean: dataSnapshot.val().mean,
              audio,

            };
            // console.log('audio:'+audio);
            this.setState({
              items: [...this.state.items, item],
            });
          });
        });
    });

  }
  renderBaiHoc(data) {
    //console.log(data);
    let views = data
    let inputRow = []
    for (let r = 0; r < views.length; r++) {
      inputRow.push(
        <View >
          <View style={styles.viewLs}>
            <View style={styles.lesson} >
              <TouchableOpacity onPress={() => this.playTrack(views[r].audio)}>
                <Image style={styles.audio} source={require('../image/icon_audio.png')} />
              </TouchableOpacity>
              <TextInput underlineColorAndroid='transparent' style={styles.nghia}
                onChangeText={(text) => this.setState({ text })}
              />
              {this.state.dung && <Text style={styles.dung}>{views[r].name}</Text>}
              {this.state.sai && <Text style={styles.sai}>{views[r].name}</Text>}
            </View>
          </View>
          <View style={{ alignItems: 'center', marginTop: 10, flexDirection: 'row' }}>
            <Text style={{ flex: 3, textAlign: 'right' }}></Text>
            <TouchableOpacity onPress={() => this.check(views[r].name, this.state.text)}>
              <Image
                style={styles.reload}
                source={require('../image/icon_submit.png')} />
            </TouchableOpacity>
            <Text style={{ flex: 3, textAlign: 'left' }}></Text>
          </View>
        </View>
      );
    }

    return inputRow;
  }
  render() {
    const { params } = this.props.navigation.state;
    const { goBack } = this.props.navigation;

    return (

      <View style={{
        flex: 1,
        justifyContent: 'center', padding: 20, backgroundColor: '#119f81', elevation: 2
      }}>
        {/* <Swiper showsPagination={false}>
         { this.renderBaiHoc(this.state.items)}
         </Swiper> */}
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
  container: {
    flex: 1,
  },
  reload: {
    width: 200,
    height: 50,
    //alignItems:'center',
  },
  dung: {
    color: '#007ae3',
    fontSize: 19,
    margin: 5,
    alignItems: 'center',
    textAlign: 'center'
  },
  sai: {
    color: 'red',
    fontSize: 17,
    margin: 5,
    alignItems: 'center',
    textAlign: 'center'
  },
  nghia: {
    elevation: 5,
    color: 'green',
    fontSize: 20,
    margin: 15,
    textAlign: 'center',
    borderRadius: 5,
    borderWidth: 1,
    width: 200,
    borderColor: '#f0f0ff',
    backgroundColor: '#f0f0ff'
  },
  viewLs: {
    height: 400,
    elevation: 5,
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#f0f0ff',
    margin: 5,
    backgroundColor: '#f0f0ff'
  },
  icon: {
    width: 35,
    height: 35,
  },
  audio: {
    margin: 20,
    height: 150,
    width: 150,
  },
  lesson: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  pic: {
    margin: 10,
    height: 150,
    width: 250,
  },
  lsname: {
    color: 'red',
    fontSize: 17,
    margin: 5,
    alignItems: 'center',
    textAlign: 'center'
  }
});
