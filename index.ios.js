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
import {Router, Scene} from 'react-native-router-flux'

class acetrainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        selectedTab: 'mons'
    };
  }
  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar={true}>
          <Scene key="mons" component={App} title="App" initial={true} />
          <Scene key="map" component={MapDetail} title="Map" />
        </Scene>
      </Router>
    );
  }
}

AppRegistry.registerComponent('acetrainer', () => acetrainer);
