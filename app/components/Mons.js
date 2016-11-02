import React, { Component } from 'react';
import {
  StyleSheet,
  NavigatorIOS,
} from 'react-native';

import MonListP from './MonListP'


var styles = StyleSheet.create({
  container: {
      flex: 1
  }
});

class Mons extends Component {
  render() {
    return (
      <MonListP />
    );
  }
}

module.exports = Mons;
