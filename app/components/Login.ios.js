import React, { Component } from 'react';
import {
  StyleSheet,
  NavigatorIOS
} from 'react-native';

import LoginDetails from './LoginDetails'


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
        component: LoginDetails
        }}/>            
    );
  }
}
 
module.exports = Login;