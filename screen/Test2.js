import React, { Component } from 'react';
import {  View, Text, } from 'react-native';
import {Button} from 'native-base'
export default class Test2 extends Component {
  render() {
    return (
      <View>
        <Button> textInComponent </Button>
        <Button> textInComponent </Button>
        <Button> textInComponent </Button>
        <Button> textInComponent </Button>
      </View>
    );
  }
}
