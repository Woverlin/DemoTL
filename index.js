// import { AppRegistry } from 'react-native';
// import LogoScreen from './screen/LogoScreen'
// import App from './App';

// AppRegistry.registerComponent('DemoTL', () => LogoScreen);

import React, { Component } from 'react';
import { View, Text, AppRegistry } from 'react-native';
import App from './App'
import LogoScreen from './screen/LogoScreen'
export default class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            component: <LogoScreen />
        }
    }

    componentDidMount() {

        // Start counting when the page is loaded
        this.timeoutHandle = setTimeout(() => {
            // Add your logic for the transition
            this.setState({ component: <App /> })
        }, 3000);
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutHandle);
    }

    render() {
        return (
            this.state.component
        );
    }
}
AppRegistry.registerComponent('DemoTL', () => index);