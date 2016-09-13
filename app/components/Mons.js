import React, { Component } from 'react';
import {
  StyleSheet,
  NavigatorIOS,
} from 'react-native';

import MonsDetails from './MonsDetails'


var styles = StyleSheet.create({
  container: {
      flex: 1
  }
});

class Mons extends Component {
  render() {
    return (
      <NavigatorIOS
          style={styles.container}
          initialRoute={{
      title: 'My Pokemons',
      component: MonsDetails,
      rightButtonTitle: 'Sort by',
      }}/>
    );
  }
}

module.exports = Mons;
