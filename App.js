import React, {Component} from 'react';
import { StyleSheet, Text, View, AppRegistry } from 'react-native';
import App2 from './src'


class App extends Component {
  render() {
    return (
        <App2/>
    );
  }
}

export default App

AppRegistry.registerComponent('App',()=>App)

