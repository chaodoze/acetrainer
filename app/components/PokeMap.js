import React, { Component } from 'react';
import {
  StyleSheet,
  NavigatorIOS
} from 'react-native';

import MapDetail from './MapDetail'


var styles = StyleSheet.create({
  container: {
      flex: 1
  }
});

class PokeMap extends Component {
  render() {
    return (
      <NavigatorIOS
          style={styles.container}
          initialRoute={{
      title: 'PokeMap',
      component: MapDetail
      }}/>
    );
  }
}

module.exports = PokeMap;
