import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  FlatList,
  Text,
  View, Button,
  AsyncStorage,
  TouchableOpacity, ListView, Image, ScrollView
} from 'react-native';
import { firebaseApp } from '../Config.js';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconOcticons from 'react-native-vector-icons/Octicons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Sound from 'react-native-sound';
import { PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator } from 'rn-viewpager';
export default class Lesson extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.name}`,
    headerTintColor: '#119f81', headerRight: (
      <TouchableOpacity style={{ paddingRight: 10 }} onPress={() => { navigation.navigate('Lst_Test', { name: navigation.state.params.name, id: navigation.state.params.id }) }}>
        <Icon1 name="format-list-checks" size={35} color="#119f81" />
      </TouchableOpacity>
    )
  });
  constructor(props) {
    super(props);
    this.itemRef = firebaseApp.database();
    this.listenForItems = this.listenForItems.bind(this);
    this.getPic = this.getPic.bind(this);
    // this.bookmark = this.bookmark.bind(this)
    //this.items = [];

    this.state = {
      listVocabSave: [],
      count: 0,
      items: [],
      user: '',
      userKey: '',
      // star:false,
      eng: true,
      viet: false,
      colorstar: 'red'
    }
  }
  async getPic(pic) {
    let url = await firebaseApp.storage().ref(pic).getDownloadURL();
    return url
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
  changText() {
    if (this.state.eng == true) {
      return this.setState({
        eng: false,
        viet: true
      })
    }
    this.setState({
      eng: true,
      viet: false
    })
  }
  onPageScroll() {
    return this.setState({
      eng: true,
      viet: false,
      //star : require('../image/icon_star.png')
    })
  }
  compare(a, b) {
    if (a.stt < b.stt)
      return -1;
    if (a.stt > b.stt)
      return 1;
    return 0;
  }
  indexOf(giatri) {
    let temp = this.state.items
    for (var i = 0; i < temp.length; i++) {
      if (temp[i].key == giatri)
        return i
    }
  }
  GetUser = async () => {
    const value = await AsyncStorage.getItem('user');
    const UserKey = await AsyncStorage.getItem('userKey');
    await this.setState({
      user: value,
      userKey: UserKey
    })
  }
  favorite(item) {  //key.mark
    console.log('love run')
    //tao mang temp tu mang chinh
    //tim vi tri cua gia tri trong mang
    //thay doi gia tri mark cua mang phu va truyen lai vao mang chinh
    //var vitri = null
    var vitri = this.indexOf(item.key)
    console.log('vitri', vitri)
    if (item.mark === true) {
      firebaseApp.database().ref('/User/' + this.state.userKey + '/VocabSaved/' + item.stt).remove();
      let temp = [...this.state.items];
      temp[vitri] = { ...temp[vitri], mark: false };
      this.setState({ items: temp });
    }
    if (item.mark === false) {
      firebaseApp.database().ref('/User/' + this.state.userKey + '/VocabSaved/' + item.stt).update({
        stt: item.stt,
        name: item.name,
        mean: item.mean,
        example: item.example,
        explainMean: item.explainMean,
        explainExample: item.explainExample,
        type: item.type,
        pronounce: item.pronounce,
        parent: item.parent,
        mark: item.mark,
        pic: item.pic2,
        audio: item.audio,
      });
      let temp = [...this.state.items];
      temp[vitri] = { ...temp[vitri], mark: true };
      this.setState({ items: temp });
    }
  }
  async GetListVocabSave() {
    await this.GetUser()
    await console.log('get userKey', this.state.userKey)
    await firebaseApp.database().ref('User/' + this.state.userKey + '/Vocab').on('child_added', (dataSnapshot) => {
      let item = {
        stt: dataSnapshot.id,
        name: dataSnapshot.word,
        mean: dataSnapshot.mean,
        example: dataSnapshot.example,
        explainMean: dataSnapshot.explainMean,
        explainExample: dataSnapshot.explainExample,
        type: dataSnapshot.type,
        pronounce: dataSnapshot.pronounce,
        parent: dataSnapshot.parent,
        mark: dataSnapshot.vocabmark,
        pic: dataSnapshot.pic,
        audio: dataSnapshot.audio,
      };
      this.setState({
        listVocabSave: [...this.state.listVocabSave, item]
      })
    });
    await console.log('list vocab saved', this.state.listVocabSave)
  }
  async GetMark(id) {   //kiem tra id cua tu vung co trong list save hay ko
    let mark = false
    const listVocabSave = this.state.listVocabSave
    console.log('list saved', listVocabSave)
    for (var i = 0; i < listVocabSave.length; i++) {
      if (id == listVocabSave[i].key) {
        mark = true
        console.log('mark 108', mark)
        return mark
      }
    }
    return mark
  }
  listenForItems() {
    let arr = []
    const { params } = this.props.navigation.state;
    firebaseApp.database().ref('/Vocab').orderByChild('parent').equalTo(params.id).on('child_added', (dataSnapshot) => {
      this.GetMark(dataSnapshot.val().id).then((mark) => {
        this.getPic(dataSnapshot.val().linkImg)
          .then((pic2) => {
            this.getPic(dataSnapshot.val().linkAudio).then((audio) => {
              let item = {
                stt: dataSnapshot.val().id,
                name: dataSnapshot.val().word,
                key: dataSnapshot.key,
                mean: dataSnapshot.val().mean,
                example: dataSnapshot.val().example,
                explainMean: dataSnapshot.val().explainMean,
                explainExample: dataSnapshot.val().explainExample,
                type: dataSnapshot.val().type,
                pronounce: dataSnapshot.val().pronounce,
                parent: dataSnapshot.val().parent,
                mark,
                pic2,
                audio,
              };
              arr.push(item);
              return arr
            })
              .then(result => {
                console.log(result)
                result = result.sort(this.compare);
                this.setState({
                  items: result
                })
              }
              );
          });
      })

    });
  }
  renderBaiHoc(data) {
    //console.log(data);
    let views = data;
    let inputRow = [];
    for (let r = 0; r < views.length; r++) {
      inputRow.push(
        <View>
          <View style={styles.viewLs}>
            <View style={{ marginBottom: 10, flexDirection: 'row' }}>
              <Image
                style={styles.pic}
                source={{ uri: views[r].pic2 }} />
            </View>
            <View style={styles.lesson} >
              <ScrollView>
                {this.state.eng && <Text style={styles.lsname1}>{views[r].name} {views[r].type} {views[r].pronounce}</Text>}
                {this.state.eng && <Text style={styles.lsname}>{views[r].explainMean} </Text>}

                {this.state.viet && <Text style={styles.nghia1}>{views[r].example} </Text>}
                <View style={{ flexDirection: 'row', justifyContent: 'center', }}>

                  <TouchableOpacity onPress={() => this.playTrack(views[r].audio)}>
                    <Icon style={styles.audio} name="volume-up" size={40} />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.favorite(views[r])}>
                    <Icon style={[styles.audio]} name={views[r].mark ? 'star' : 'star-border'} size={40} />
                  </TouchableOpacity>
                </View>
                {this.state.eng && <Text style={styles.nghia}> {views[r].mean}</Text>}
                {this.state.viet && <Text style={styles.nghia1}>{views[r].explainExample} </Text>}
              </ScrollView>
            </View>
            <View style={{ justifyContent: 'flex-end' }}>
              <TouchableOpacity style={{ paddingBottom: 5 }} onPress={this.changText.bind(this)}>
                <IconOcticons
                  style={styles.audio} name="sync" size={40} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 1 }} />
        </View>
      );
    }

    return inputRow;
  }
  render() {
    return (
      <View style={{
        flex: 1, justifyContent: 'center', padding: 10, backgroundColor: '#119f81', elevation: 2
      }}>
        <IndicatorViewPager style={{ flex: 1 }}
          onPageScroll={this.onPageScroll.bind(this)}
          indicator={this._renderDotIndicator()}>
          {this.renderBaiHoc(this.state.items)}
        </IndicatorViewPager>
      </View>
    );
  }
  _renderDotIndicator() {
    return <PagerDotIndicator pageCount={this.state.items.length} />;
  }
  async componentWillMount() {
    await this.GetListVocabSave();
    await this.listenForItems();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view2: {
    height: 80,
    alignItems: 'center',
    //paddingTop: 5,
    flexDirection: 'column',
    //flex: 2
  },
  reload: {

    width: 40,
    height: 40,
    alignItems: 'center',
  },
  test: {
    height: 30,
    width: 30,
  },
  nghia: {
    color: 'green',
    fontSize: 20,
    margin: 5,
    alignItems: 'center',
    textAlign: 'center'
  },
  nghia1: {
    color: 'green',
    fontSize: 17,
    margin: 5,
    alignItems: 'center',
    textAlign: 'center'
  },
  viewLs: {
    flex: 12,
    elevation: 5,
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#f0f0ff',
    margin: 10,
    backgroundColor: '#f0f0ff'
  },
  icon: {
    width: 40,
    height: 40,
    paddingRight: 10,
  },
  audio: {
    marginLeft: 10,
    height: 40,
    width: 40,
  },
  lesson: {
    flex: 10,
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
  },
  lsname1: {
    color: 'red',
    fontSize: 20,
    margin: 5,
    alignItems: 'center',
    textAlign: 'center'
  }
});

