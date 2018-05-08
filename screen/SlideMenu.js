import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconOcticons from 'react-native-vector-icons/Octicons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';

export default class SlideMenu extends Component {
  render() {
    console.log('props',this.props)
    const { navigate } = this.props.navigation;
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <View style={{ alignItems: 'center',paddingTop: 10, }}>
        <Image style={styles.avt} source={require('../image/avt1.png')} />
        </View>
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center',borderBottomColor: '#bbb', borderBottomWidth: StyleSheet.hairlineWidth,}} onPress={() => { navigate('Home1') }}>
        <Icon style={styles.icon} name="book" size={20} />
        <Text style={styles.button} > Từ vựng theo chủ đề</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center',borderBottomColor: '#bbb', borderBottomWidth: StyleSheet.hairlineWidth,}} onPress={() => { navigate('Grammar1') }}>
        <Icon1 style={styles.icon} name="book-open-page-variant" size={20} />
        <Text style={styles.button} > Ngữ pháp</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center',borderBottomColor: '#bbb', borderBottomWidth: StyleSheet.hairlineWidth,}} onPress={() => { navigate('TopicSaved1') }}>
        <IconEntypo style={styles.icon} name="bookmarks" size={20} />
        <Text style={styles.button} > Chủ đề đã lưu</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', borderBottomColor: '#bbb', borderBottomWidth: StyleSheet.hairlineWidth,}}onPress={() => { navigate('VocabSave1') }}>
        <IconEntypo style={styles.icon} name="bookmark" size={20} />
        <Text style={styles.button} > Từ vựng đã lưu</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center',borderBottomColor: '#bbb', borderBottomWidth: StyleSheet.hairlineWidth,}} onPress={() => { navigate('Game1') }}>
        <IconEntypo style={styles.icon} name="game-controller" size={20} />
        <Text style={styles.button} > Luyện tập</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center',borderBottomColor: '#bbb', borderBottomWidth: StyleSheet.hairlineWidth,}} onPress={() => { navigate('Search1') }}>
        <IconOcticons style={styles.icon} name="search" size={20} />
        <Text style={styles.button} > Tìm kiếm</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center',borderBottomColor: '#bbb', borderBottomWidth: StyleSheet.hairlineWidth,}} onPress={() => { navigate('Support1') }}>
        <IconOcticons style={styles.icon} name="comment" size={20} />
        <Text style={styles.button} > Góp ý </Text>
      </TouchableOpacity>
      </View >
    );
  }
}
const styles = StyleSheet.create({
  avt: {
    tintColor :"#119f81",
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
  },
  button: {
    padding: 8,
    fontSize: 17,
    color: '#119f81'
  },
  icon: {
    paddingLeft: 5,
  }
})