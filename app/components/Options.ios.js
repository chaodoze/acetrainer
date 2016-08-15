import React, { Component } from 'react';
import {
  StyleSheet,
  NavigatorIOS
} from 'react-native';

import OptionDetails from './OptionDetails'


var styles = StyleSheet.create({
  container: {
      flex: 1
  }
});
 
class Options extends Component {
  render() {
    return (
      <NavigatorIOS
          style={styles.container}
          initialRoute={{
      title: 'Options',
      component: OptionDetails
      }}/>            
    );
  }
}
 
module.exports = Options;