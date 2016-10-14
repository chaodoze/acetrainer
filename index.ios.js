import moment from 'moment'
import React, { Component } from 'react';
import RN,{
  AppRegistry,
  TabBarIOS,
  NativeAppEventEmitter,
} from 'react-native';

import App from './app/components/app'
import MapDetail from './app/components/MapDetail'
import Login from './app/components/Login'
import LinkDetails from './app/components/LinkDetails'
import Options from './app/components/Options'
import Icon from 'react-native-vector-icons/FontAwesome';

class acetrainer extends Component {
  render() {
    return (
      <App />
    )
  }
}

AppRegistry.registerComponent('acetrainer', () => acetrainer);
