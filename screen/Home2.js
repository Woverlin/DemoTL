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
export default class Home extends Component {
  constructor(props) {
    super(props);
    //this.listenForItems = this.listenForItems.bind(this);
    this.getPic = this.getPic.bind(this);
    //this.items = [];

    this.state = {
      user: '',
      userKey: '',
      img: [],
      items: [],
      refreshing: false,
      mark: false,
      listTopicSave: []
    }
  }
  async getPic(pic) {
    let url = await firebaseApp.storage().ref(pic).getDownloadURL();
    return url
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
  favorite(item) {
    console.log('itemmmmm', item)
    console.log('userKey', this.state.userKey)
    var user = this.state.user
    console.log('love run', item.stt, item.mark)
    // tao mang temp tu mang chinh
    // tim vi tri cua gia tri trong mang
    // thay doi gia tri mark cua mang phu va truyen lai vao mang chinh
    // var vitri = null
    // var vitri = this.indexOf(key)
    var key = item.stt - 1;
    //console.log('vitri', key)
    if (item.mark === true) {
      firebaseApp.database().ref('/User/' + this.state.userKey + '/TopicSaved/' + item.stt).remove();
      let temp = [...this.state.items];
      temp[key] = { ...temp[key], mark: false };
      this.setState({ items: temp });
    }
    if (item.mark === false) {
      firebaseApp.database().ref('/User/' + this.state.userKey + '/TopicSaved/' + item.stt).update({
        id: item.stt,
        name: item.name,
        mean: item.mean,
        pic: item.pic2
      });
      let temp = [...this.state.items];
      temp[key] = { ...temp[key], mark: true };
      this.setState({ items: temp });
    }
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
  async GetListTopicSave() {
    await this.GetUser()
    await console.log('109-getlisttopicSave run', this.state.userKey)
    await firebaseApp.database().ref('User/' + this.state.userKey + '/TopicSaved').on('child_added', (dataSnapshot) => {
      console.log(dataSnapshot.key)
      let topic = { key: dataSnapshot.key };
      this.setState({
        listTopicSave: [...this.state.listTopicSave, topic]
      });
    });
  }
  async GetMark(id) {   //kiem tra id cua bai hoc co trong list save hay ko
    let mark = false
    const listTopicSaved = this.state.listTopicSave
    console.log('list saved', listTopicSaved)
    for (var i = 0; i < listTopicSaved.length; i++) {
      if (id == listTopicSaved[i].key) {
        mark = true
        console.log('mark 108', mark)
        return mark
      }
    }
    return mark
  }
  listenForItems() {
    let arr = [];
    firebaseApp.database().ref('/ChuDe').on('child_added', (dataSnapshot) => {
      this.GetMark(dataSnapshot.val().id).then((mark) => {
        this.getPic(dataSnapshot.val().linkImg)
          .then((pic2) => {
            let item = {
              name: dataSnapshot.val().word,
              stt: dataSnapshot.val().id,
              mean: dataSnapshot.val().mean,
              key: dataSnapshot.key,
              pic2,
              mark
            };
            //console.log('data', item)
            arr.push(item);
            return arr
            //array
            //array.push(item) neu soluong === so luong can
            //return array
            //sdung ham then -> sap xep bo setState
          })
          .then(result => {
            if (result.length === 50) {
              result = result.sort(this.compare);
              this.setState({
                items: result
              })
            }
          });
      })
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
  async componentWillMount() {
    await this.GetListTopicSave();
    await this.listenForItems();
  }
  render() {
    //console.log('topic saveddd', this.state.listTopicSave)
    console.log('list data', this.state.items)
    const { navigate } = this.props.navigation;
    const { items } = this.state;
    //console.log('Items', items);
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
                  <TouchableOpacity onPress={() => this.favorite(item)}>
                    <Icon style={{ marginRight: 5 }} name={item.mark ? 'star' : 'star-border'} size={30} />
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
