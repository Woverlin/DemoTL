import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  FlatList,
  Text,
  View, Button,
  AsyncStorage,
  TouchableOpacity, ListView, Image, WebView, ScrollView,
} from 'react-native';
import { firebaseApp } from '../Config.js';
//import Swiper from 'react-native-swiper';

import Sound from 'react-native-sound';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import { PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator } from 'rn-viewpager';
import ControllAudio from './ControllAudio';


export default class TestPart3 extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.name}` + ' Part III',
    headerTintColor: '#119f81'
  });
  constructor(props) {
    super(props);
    this.itemRef = firebaseApp.database();
    this.listenForItems = this.listenForItems.bind(this);
    //this.getAudio = this.getAudio.bind(this);
    this.answer = this.answer.bind(this)
    this.state = {
      items: {},
      da1: false,
      da2: false,
      da3: false,
      da4: false,
      da5: false,
      da6: false,
      da7: false,
      da8: false,
      da9: false,
      da10: false,
      da11: false,
      da12: false,
      linkHTML: '',
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
      da1: false,
      da2: false,
      da3: false,
      da4: false,
      da5: false,
      da6: false,
      htmlenable: false,
      myAnswer1: null,
      myAnswer2: null,
      myAnswer3: null
    })
  }
  GetUser = async () => {
    //const value = await AsyncStorage.getItem('user');
    const UserKey = await AsyncStorage.getItem('userKey');
    await this.setState({
      userKey: UserKey
    })
  }
  answer(data) {
    this.setState({
      htmlenable: true
    })
    //console.log('linkhtml', data.html)
    var da1 = data.result1;
    var da2 = data.result2;
    var da3 = data.result3;
    console.log('myas1,myas2,myas3', this.state.myAnswer1, this.state.myAnswer2, this.state.myAnswer3)
    console.log('da1,da2,da3', da1, da2, da3)
    const id = this.props.navigation.state.params.id
    var percent = 0
    if (da1 === this.state.myAnswer1) {
      percent = percent + 33
    }
    if (da2 === this.state.myAnswer2) {
      percent = percent + 33
    }
    if (da3 === this.state.myAnswer3) {
      percent = percent + 34
    }
    firebaseApp.database().ref('/User/' + this.state.userKey + '/Process/' + id).update({
      part3: percent
    });
    this.setState(prevState => {
      return { linkHTML: data.html }
    }, () => {
      console.log('state linkhtml' + this.state.linkHTML)
    })

    if (da1 === data.answer1) {
      this.setState({
        da1: true
      })
    }
    if (da1 === data.answer2) {
      this.setState({
        da2: true
      })
    }
    if (da1 === data.answer3) {
      this.setState({
        da3: true
      })
    }
    if (da1 === data.answer4) {
      this.setState({
        da4: true
      })
    }
    if (da2 === data.answer5) {
      this.setState({
        da5: true
      })
    }
    if (da2 === data.answer6) {
      this.setState({
        da6: true
      })
    }
    if (da2 === data.answer7) {
      this.setState({
        da7: true
      })
    }
    if (da2 === data.answer8) {
      this.setState({
        da8: true
      })
    }
    if (da3 === data.answer9) {
      this.setState({
        da9: true
      })
    }
    if (da3 === data.answer10) {
      this.setState({
        da10: true
      })
    }
    if (da3 === data.answer11) {
      this.setState({
        da11: true
      })
    }
    if (da3 === data.answer12) {
      this.setState({
        da12: true
      })
    }

  }
  getLink(pic) {
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
    firebaseApp.database().ref('/Part3').orderByChild('idLesson').equalTo(params.id).on('child_added', (dataSnapshot) => {
      this.getLink(dataSnapshot.val().linkAudio)
        .then((audio) => {
          this.getLink(dataSnapshot.val().linkdialogue)
            .then((html) => {
              let item = {
                answer1: dataSnapshot.val().answer1,
                answer2: dataSnapshot.val().answer2,
                answer3: dataSnapshot.val().answer3,
                answer4: dataSnapshot.val().answer4,
                answer5: dataSnapshot.val().answer5,
                answer6: dataSnapshot.val().answer6,
                answer7: dataSnapshot.val().answer7,
                answer8: dataSnapshot.val().answer8,
                answer9: dataSnapshot.val().answer9,
                answer10: dataSnapshot.val().answer10,
                answer11: dataSnapshot.val().answer11,
                answer12: dataSnapshot.val().answer12,
                question1: dataSnapshot.val().question4,
                question2: dataSnapshot.val().question5,
                question3: dataSnapshot.val().question6,
                result1: dataSnapshot.val().result4,
                result2: dataSnapshot.val().result5,
                result3: dataSnapshot.val().result6,
                audio,
                html,
              };
              this.setState({
                items: [...this.state.items, item],
              });
            });
        });
    });
  }
  renderBaiHoc(data) {
    console.log(data);
    let item = data;
    let inputRow = [];
    console.log('data1', data)
    for (let r = 0; r < item.length; r++) {
      console.log('da2')
      var audio = new Sound(item[r].audio, null, (e) => { })
      console.log('audio', item[r].audio)
      inputRow.push(
        <View style={{ flex: 1 }}>
          {this.state.htmlenable && <View style={styles.view1}>
            <WebView
              source={{ uri: item[r].html }}
              style={{ backgroundColor: 'white' }}
            />
          </View>}
          <View style={{ padding: 2 }} />
          <View style={styles.view1}>
            <ScrollView>
              <View >
                <Text style={styles.qs}> {item[r].question1}</Text>
              </View>
              <View>
                <RadioGroup color='#119f81'
                  onSelect={(index, value) => this.setState({ myAnswer1: value })}
                >
                  <RadioButton value={item[r].answer1} >
                    <Text style={[this.state.da1 && styles.da]} >A.{item[r].answer1}</Text>
                  </RadioButton>
                  <RadioButton value={item[r].answer2}>
                    <Text style={[this.state.da2 && styles.da]}>B.{item[r].answer2}</Text>
                  </RadioButton>
                  <RadioButton value={item[r].answer3}>
                    <Text style={[this.state.da3 && styles.da]}>C.{item[r].answer3}</Text>
                  </RadioButton>
                  <RadioButton value={item[r].answer4}>
                    <Text style={[this.state.da4 && styles.da]}>D.{item[r].answer4}</Text>
                  </RadioButton>
                </RadioGroup>
              </View>
              <View >
                <Text> {item[r].question2}</Text>
              </View>
              <View>
                <RadioGroup color='#119f81'
                  onSelect={(index, value) => this.setState({ myAnswer2: value })}
                >
                  <RadioButton value={item[r].answer5} >
                    <Text style={[this.state.da5 && styles.da]} >A.{item[r].answer5}</Text>
                  </RadioButton>
                  <RadioButton value={item[r].answer6}>
                    <Text style={[this.state.da6 && styles.da]}>B.{item[r].answer6}</Text>
                  </RadioButton>
                  <RadioButton value={item[r].answer7}>
                    <Text style={[this.state.da7 && styles.da]}>C.{item[r].answer7}</Text>
                  </RadioButton>

                  <RadioButton value={item[r].answer8}>
                    <Text style={[this.state.da8 && styles.da]}>D.{item[r].answer8}</Text>
                  </RadioButton>
                </RadioGroup >
              </View>
              <View >
                <Text> {item[r].question3}</Text>
              </View>
              <View>
                <RadioGroup color='#119f81'
                  onSelect={(index, value) => this.setState({ myAnswer3: value })}
                >
                  <RadioButton value={item[r].answer9} >
                    <Text style={[this.state.da9 && styles.da]} >A.{item[r].answer9}</Text>
                  </RadioButton>
                  <RadioButton value={item[r].answer10}>
                    <Text style={[this.state.da10 && styles.da]}>B.{item[r].answer10}</Text>
                  </RadioButton>
                  <RadioButton value={item[r].answer11}>
                    <Text style={[this.state.da11 && styles.da]}>C.{item[r].answer11}</Text>
                  </RadioButton>

                  <RadioButton value={item[r].answer12}>
                    <Text style={[this.state.da12 && styles.da]}>D.{item[r].answer12}</Text>
                  </RadioButton>
                </RadioGroup>
              </View>
            </ScrollView>
          </View>
          <View style={{ margin: 5, flexDirection: 'row', justifyContent: 'space-between', }}>
            {/* <TouchableOpacity onPress={() => this.playTrack(item[r].audio)}>
            <Image style={{ marginLeft: 10, height: 50, width: 50 }}
              source={require('../image/icon_play.png')} />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, padding: 12, color: 'white' }}> Short Conversations </Text>
          <TouchableOpacity onPress={() => this.answer(item[r])}>
            <Image style={{ height: 50, width: 50, padding: 20 }}
              source={require('../image/icon_rs.png')} />
          </TouchableOpacity> */}

            <ControllAudio audio={audio} des='Short Conversations' />
            <TouchableOpacity onPress={() => this.answer(item[r])}>
              <Image style={{ height: 50, width: 50, padding: 20 }}
                source={require('../image/icon_rs.png')} />
            </TouchableOpacity>
          </View>
        </View>
      )
    }
    return inputRow
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
  async componentWillMount() {
    await this.GetUser();
    await this.listenForItems();
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
  qs: {
    fontSize: 15,
    color: 'black',
  }
})