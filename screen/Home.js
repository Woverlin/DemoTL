import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet, Image, ListView, TouchableOpacity
} from 'react-native';
import { firebaseApp } from '../Config.js';
export default class Home extends Component {
  // static navigationOptions={
  //     tabBarIcon:({ tintColor }) => (
  //           <Image 
  //           style ={[styles.icon,{tintColor: tintColor}]} 
  //           source={require('../image/icon_book.png')}/>
  //     ),
  // };
  constructor(props) {
    super(props);
    this.itemRef = firebaseApp.database();
    this.state = {
      img: [],

      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
    }
  }

  deleteSpace(data) {
    data = data.toLowerCase();
    for (i = 0; i < data.length; i++) {
      data = data.replace(" ", "_");
      data = data.replace("&", "and");
    }
    return data;
  }

  getPic(pic, number) {
    console.log('getPic running');
    var imgPic = [];
    var storageRef = firebaseApp.storage().ref(pic);
    storageRef.getDownloadURL().then(function (url) {
      imgPic[1] = url;
    }, function (error) {
      console.log(error);
    });
    this.setState({ img: imgPic });
  }

  getPic2(items) {
    console.log('getPic2 running');
    console.log(items);
    var a = [];
    for (var i = 0; i < items.length; i++) {
      var storageRef = firebaseApp.storage().ref(items[i].picture);
      storageRef.getDownloadURL().then(function (url) {
        // console.log('url la :')
        a[i] = url
        console.log('a' + i + '=' + a[i])
      }, function (error) {
        console.log(error);
      });
    }
    //   // for(var i=0;i<a.length;i++)
    //   // console.log('a'+ a[i]);
    //   //this.setState({img : a});
    //   //console.log('change'+this.state.img);
  }


  listenForItems(itemRef) {
    var items = [];
    this.itemRef.ref('/ChuDe').on('child_added', (dataSnapshot) => {
      items.push({
        name: dataSnapshot.val().word,
        picture: dataSnapshot.val().linkImg,
        stt: dataSnapshot.val().id,
        pic: 'http://600tuvungtoeic.com/template/english/images/lesson/' + this.deleteSpace(dataSnapshot.val().word + '.jpg'),
        key: dataSnapshot.key,
        //pic2 : this.getPic(dataSnapshot.val().linkImg, dataSnapshot.val().stt)
      });
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items),
      });
    });
    console.log(items)
    //this.getPic2(items)
    //console.log('img_sau:'+this.state.img);

  }

  render() {
    const { navigate } = this.props.navigation;
    return (

      <View style={{
        flex: 1,
        justifyContent: 'center', padding: 20, backgroundColor: '#119f81'
      }}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
            <View style={{ marginBottom: 10, backgroundColor: '#119f81' }}>
              <TouchableOpacity style={styles.lesson}
                onPress={() => {
                  navigate('Lesson', { name: rowData.name, id: rowData.stt });
                }}
              >
                <Image
                  style={styles.pic}
                  //source={require('../image/icon_pic.png')}/>
                  source={{ uri: rowData.pic }} />
                <Text style={styles.lsname}>
                  Lesson {rowData.stt}: {rowData.name}

                </Text>
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    );
  }
  componentDidMount() {
    this.listenForItems(this.itemRef);
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
    color: 'red',
    fontSize: 15,
    padding: 17
  }
});
