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
import Icon from 'react-native-vector-icons/FontAwesome';
import Sound from 'react-native-sound';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import { PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator } from 'rn-viewpager';
export default class TestAllPart1 extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Test Part I',
    headerTintColor: '#119f81'
  });
  constructor(props) {
    super(props);
    this.itemRef = firebaseApp.database();
    this.listenForItems = this.listenForItems.bind(this);
    this.getPic = this.getPic.bind(this);
    this.answer = this.answer.bind(this);
    this.items = [];
    this.state = {
      items: [],
      answer1: undefined,
      answer2: undefined,
      answer3: undefined,
      answer4: undefined,
      play_on: true,
      play_off: false,
      da1: false,
      da2: false,
      da3: false,
      da4: false
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
    //console.log('play run :'+ audio)
    const track = new Sound(audio, null, (e) => {
      if (e) {
        console.log('error loading track:', e)
      } else {
        track.play()
      }
    })
  }

  controllAudio(audio) {
    if (this.state.audio === false) {
      console.log('playyyyyyyyy')
      audio.play()
      return (
        this.setState({
          audio: true,
          audio_on: true,
        }))
    }
    else {
      console.log('stopppppppppppppppp')
      audio.stop()
      return (
        this.setState({
          audio: false
        })
      )
    }
  }

  onPageScroll() {
    return this.setState({
      answer1: undefined,
      answer2: undefined,
      answer3: undefined,
      answer4: undefined,
      da1: false,
      da2: false,
      da3: false,
      da4: false
    })
  }
  answer(as1, as2, as3, as4, da) {
    console.log('dapan:' + da)
    if (da === as1) {
      this.setState({
        da1: true
      })
    }
    if (da === as2) {
      this.setState({
        da2: true
      })
    }
    if (da === as3) {
      this.setState({
        da3: true
      })
    }
    if (da === as4) {
      this.setState({
        da4: true
      })
    }
    return this.setState({
      answer1: as1,
      answer2: as2,
      answer3: as3,
      answer4: as4
    })
  }
  listenForItems() {
    const { params } = this.props.navigation.state;
    firebaseApp.database().ref('/Part1').on('child_added', (dataSnapshot) => {
      console.log('avaf')
      console.log('napshot', dataSnapshot.val());
      this.getPic(dataSnapshot.val().linkPicture)
        .then((pic2) => {
          this.getPic(dataSnapshot.val().linkAudio).then((audio) => {
            let item = {
              answer1: dataSnapshot.val().answer1,
              answer2: dataSnapshot.val().answer2,
              answer3: dataSnapshot.val().answer3,
              answer4: dataSnapshot.val().answer4,
              result: dataSnapshot.val().result,
              pic2,
              audio,
            };
            this.setState({
              items: [...this.state.items, item],
            });
          });
        });
    });
  }
  renderBaiHoc(data) {
    //console.log(data);
    let views = data;
    let inputRow = [];
    for (let r = 0; r < views.length; r++) {
      var audio = new Sound(views[r].audio, null, (e) => { })
      inputRow.push(
        <View style={{ flex: 1 }}>
          <View style={styles.view1}>
            <View style={{ alignItems: 'center' }} >
              <Image style={{ margin: 10, height: 200, width: 300 }}
                source={{ uri: views[r].pic2 }} />
            </View>
            <View>
              <RadioGroup color='#119f81'>
                <RadioButton value={'item1'} >
                  <Text style={[this.state.da1 && styles.da]} >A.{this.state.answer1}</Text>
                </RadioButton>
                <RadioButton value={'item2'}>
                  <Text style={[this.state.da2 && styles.da]}>B.{this.state.answer2}</Text>
                </RadioButton>
                <RadioButton value={'item3'}>
                  <Text style={[this.state.da3 && styles.da]}>C.{this.state.answer3}</Text>
                </RadioButton>

                <RadioButton value={'item4'}>
                  <Text style={[this.state.da4 && styles.da]}>D.{this.state.answer4}</Text>
                </RadioButton>
              </RadioGroup>
            </View>
          </View>
          <View style={{ margin: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
            {this.state.play_on && <TouchableOpacity onPress={() => { audio.play(), this.setState({ play_off: true }) }}>
              <Image style={{ marginLeft: 10, height: 50, width: 50 }}
                source={require('../image/icon_play.png')} />
            </TouchableOpacity>}
            {/* ,this.setState({ play_off:false,play_on:true }) */}
            {this.state.play_off && <TouchableOpacity onPress={() => { audio.pause() }} >
              <Image style={{ marginLeft: 10, height: 50, width: 50 }}
                source={require('../image/icon_pause.png')} />
            </TouchableOpacity>}
            <Text style={{ fontSize: 18, padding: 12, color: 'white' }}> Picture Description </Text>
            <TouchableOpacity onPress={() => this.answer(views[r].answer1, views[r].answer2, views[r].answer3, views[r].answer4, views[r].result)}>
              <Image style={{ marginLeft: 40, height: 50, width: 50, padding: 20 }}
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