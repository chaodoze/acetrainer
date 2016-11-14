import React, { Component } from 'react';
import RN,{
  AppRegistry,
} from 'react-native';

import App from './app/components/app'

class acetrainer extends Component {
  render() {
    return (
      <App />
    )
  }
}


AppRegistry.registerComponent('acetrainer', () => acetrainer);
