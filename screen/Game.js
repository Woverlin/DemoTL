
/* @flow */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,Button,
  AsyncStorage,
  TouchableOpacity,ListView,Image,
} from 'react-native';
export default class Game extends Component {
  // static navigationOptions={
  //     tabBarIcon:({ tintColor }) => (
  //           <Image 
  //           style ={[styles.icon,{tintColor: tintColor}]} 
  //           source={require('../image/icon_game.png')}/>
  //     ),
  // };
  render() {
    const{ navigate }=this.props.navigation;
    return (
      <View style={{ flex: 1,padding:20,backgroundColor: '#119f81' }}> 
        <View style={{marginBottom: 10,backgroundColor: '#119f81'}}>
          <TouchableOpacity 
            style={styles.lesson} 
            onPress={()=>{ navigate('Lst_LuyenNghe',{name:"Luyện Nghe",id:"1"});}}> 
            <Text style={styles.lsname}>
              Luyện Nghe
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.lesson} 
            onPress={()=>{ navigate('Lst_NghiaTA',{name:"Nghĩa Tiếng Anh",id:"3"});}}> 
            <Text style={styles.lsname}>
              Nghĩa Tiếng Anh
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.lesson} 
            onPress={()=>{ navigate('Lst_NghiaTV',{name:"Nghĩa Tiếng Việt",id:'4'});}}> 
            <Text style={styles.lsname}>
              Nghĩa Tiếng Việt
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon:{
    width: 30,
    height: 30,
  },
  lesson:{
    elevation: 5,
    alignItems:'center',
    flexDirection:'row',
    alignItems:'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
    margin: 5,
    backgroundColor: 'white'
  },
  pic:{
    margin:10,
    height: 50,
    width: 70,
  },
  lsname:{
    color : '#119f81',
    fontSize:15,
    padding:17
  }
});
