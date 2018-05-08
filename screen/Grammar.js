import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ListView,
  TouchableOpacity,
  AsyncStorage,
  FlatList, RefreshControl
} from 'react-native';
import { firebaseApp } from '../Config.js';
import { NavigationActions } from 'react-navigation'
export default class Grammar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    }
  }


  listenForItems2() {
    firebaseApp.database().ref('/Grammar').on('child_added', (dataSnapshot) => {
      let item = {
        name: dataSnapshot.val().name,
        link: dataSnapshot.val().linkHtml,
      };
      this.setState({
        items: [...this.state.items, item]
      });
    });
  }
  listenForItems() {
    firebaseApp.database().ref('/Grammar').once('value', (dataSnapshot) => {
      console.log('data',dataSnapshot.val())
      this.setState({
        items:dataSnapshot.val()
      });
    });
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
    this.listenForItems();
  }
  render() {
    const { navigate } = this.props.navigation;
    const { items } = this.state;  
    console.log('items',this.state.items)
    return (
      <View style={{ flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#119f81' }}>
        <FlatList
          data={items}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) =>
            <View style={{ marginBottom: 10, backgroundColor: '#119f81' }}>
              <TouchableOpacity
                style={styles.lesson}
                onPress={() => { navigate('Grammar_View', { path: item.linkHtml, name: item.name }); }}>
                <Text style={styles.lsname}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            </View>
          }
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
        />
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
    color: '#119f81',
    fontSize: 15,
    padding: 17
  }
});
