import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Sound from 'react-native-sound';
class ControllAudio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            play_on: true,
            play_off: false,
        }
    }
    componentWillUnmount() {
        this.props.audio.stop()
    }
    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                {this.state.play_on && <TouchableOpacity onPress={() => { this.props.audio.play(), this.setState({ play_off: true, play_on: false }) }}>
                    <Image style={{ marginLeft: 10, height: 50, width: 50 }}
                        source={require('../image/icon_play.png')} />
                </TouchableOpacity>}
                {this.state.play_off && <TouchableOpacity onPress={() => { this.props.audio.pause(), this.setState({ play_off: false, play_on: true }) }} >
                    <Image style={{ marginLeft: 10, height: 50, width: 50 }}
                        source={require('../image/icon_pause.png')} />
                </TouchableOpacity>}
                <Text style={{ fontSize: 18, padding: 12, color: 'white' }}> {this.props.des} </Text>
            </View>
        );
    }
}

export default ControllAudio;
