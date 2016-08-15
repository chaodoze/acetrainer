import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text
} from 'react-native';

import { MapView } from 'react-native';

var styles = StyleSheet.create({
  description: {
      fontSize: 20,
      backgroundColor: 'white'
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    },
  map: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
  }
});
 
class MapDetail extends Component {
  render() {
    return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
      />
    </View>
    );
  }
}
 
module.exports = MapDetail;