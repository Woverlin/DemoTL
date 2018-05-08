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
export default class Lesson extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.name}` + ' Part II',
    headerTintColor: '#119f81'
  });
  constructor(props) {
    super(props);
    this.itemRef = firebaseApp.database();
    this.listenForItems = this.listenForItems.bind(this);
    this.getAudio = this.getAudio.bind(this);
    this.answer = this.answer.bind(this)
    this.items = [];
    this.state = {
      items: [],
      qs1: 'Listen to question and choose a correct answer.',
      qs2: 'Listen to question and choose a correct answer.',
      answer1: undefined,
      answer2: undefined,
      answer3: undefined,
      da1: false,
      da2: false,
      da3: false,
      da4: false,
      da5: false,
      da6: false,
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
      answer1: undefined,
      answer2: undefined, 
      answer3: undefined,
      answer4: undefined,
      answer5: undefined,
      answer6: undefined,
      qs1: 'Listen to question and choose a correct answer.',
      qs2: 'Listen to question and choose a correct answer.',
      da1: false,
      da2: false,
      da3: false,
      da4: false,
      da5: false,
      da6: false,

    })
  }
  answer(as1, as2, as3, as4, as5, as6, da1, da2, q1, q2) {
    console.log('dapan:' + da1, da2)
    if (da1 === as1) {
      this.setState({
        da1: true
      })
    }
    if (da1 === as2) {
      this.setState({
        da2: true
      })
    }
    if (da1 === as3) {
      this.setState({
        da3: true
      })
    }
    if (da2 === as4) {
      this.setState({
        da4: true
      })
    }
    if (da2 === as5) {
      this.setState({
        da5: true
      })
    }
    if (da2 === as6) {
      this.setState({
        da6: true
      })
    }
    return this.setState({
      answer1: as1,
      answer2: as2,
      answer3: as3,
      answer4: as4,
      answer5: as5,
      answer6: as6,
      qs1: q1,
      qs2: q2
    })
  }
  getAudio(pic) {
    return new Promise((resolve, reject) => {
      var storageRef = firebaseApp.storage().ref(pic);
      storageRef.getDownloadURL().then((url) => {
        resolve(url);
      }, (error) => {
        reject(error);
      });
    });
  }
  listenForItems() {
    const { params } = this.props.navigation.state;
    firebaseApp.database().ref('/Part2').orderByChild('idLesson').equalTo(params.id).on('child_added', (dataSnapshot) => {
      //console.log('napshot', dataSnapshot);
      this.getAudio(dataSnapshot.val().linkAudio, dataSnapshot.val().stt).then((audio) => {
        let item = {
          answer1: dataSnapshot.val().answer1,
          answer2: dataSnapshot.val().answer2,
          answer3: dataSnapshot.val().answer3,
          answer4: dataSnapshot.val().answer4,
          answer5: dataSnapshot.val().answer5,
          answer6: dataSnapshot.val().answer6,
          question2: dataSnapshot.val().question2,
          question3: dataSnapshot.val().question3,
          result2: dataSnapshot.val().result2,
          result3: dataSnapshot.val().result3,
          audio,

        };
        this.setState({
          items: [...this.state.items, item],
        });
      });
    });
  }
  renderBaiHoc(data) {
    //console.log(data);
    let views = data;
    let inputRow = [];
    for (let r = 0; r < views.length; r++) {
      //this.bookmark(views[r].mark,r)
      inputRow.push(
        <View style={{ flex: 1 }}>
          <View style={styles.view1}>
            <View >
              <Text style={styles.qs}> {this.state.qs1}</Text>
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
              </RadioGroup>
            </View>

            <View >
              <Text style={styles.qs} > {this.state.qs2}</Text>
            </View>
            <View>
              <RadioGroup color='#119f81'>
                <RadioButton value={'item1'} >
                  <Text style={[this.state.da4 && styles.da]} >A.{this.state.answer4}</Text>
                </RadioButton>
                <RadioButton value={'item2'}>
                  <Text style={[this.state.da5 && styles.da]}>B.{this.state.answer5}</Text>
                </RadioButton>
                <RadioButton value={'item3'}>
                  <Text style={[this.state.da6 && styles.da]}>C.{this.state.answer6}</Text>
                </RadioButton>
              </RadioGroup>
            </View>
          </View>
          <View style={{ margin: 5, flexDirection: 'row', justifyContent: 'space-between', }}>
            <TouchableOpacity onPress={() => this.playTrack(views[r].audio)}>
              <Image style={{ marginLeft: 10, height: 50, width: 50 }}
                source={require('../image/icon_play.png')} />
            </TouchableOpacity>
            <Text style={{ fontSize: 18, padding: 12,color:'white' }}> Question and Response</Text>
            <TouchableOpacity onPress={() => this.answer(views[r].answer1, views[r].answer2, views[r].answer3,
              views[r].answer4, views[r].answer5, views[r].answer6, views[r].result2, views[r].result3, views[r].question2, views[r].question3)}>
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
  },
  qs:{
    fontSize:15,
    color:'black'
  }
})