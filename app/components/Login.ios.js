import React, { Component } from 'react';
import {
  StyleSheet,
  NavigatorIOS,
  Text
} from 'react-native';

import PogoGoogleAuth from './PogoGoogleAuth'


var styles = StyleSheet.create({
  container: {
      flex: 1
  }
});

class Login extends Component {
  render() {
    return (
        <NavigatorIOS
            style={styles.container}
            initialRoute={{
        title: 'Login',
        component: PogoGoogleAuth
        }}/>
    );
  }
}

module.exports = Login;
