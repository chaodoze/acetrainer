import moment from 'moment'
import React, { Component } from 'react';
import RN,{
  AppRegistry,
  TabBarIOS,
  NativeAppEventEmitter,
} from 'react-native';

import App from './app/components/app'
import PokeMap from './app/components/PokeMap'
import Login from './app/components/Login'
import LinkDetails from './app/components/LinkDetails'
import Options from './app/components/Options'
import Icon from 'react-native-vector-icons/FontAwesome';

class acetrainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        selectedTab: 'mons'
    };
  }
  render() {
    return (
      <TabBarIOS selectedTab={this.state.selectedTab}>
        <Icon.TabBarItemIOS
          selected={this.state.selectedTab === 'mons'}
          title="My Pokemons"
          iconName="bug"
          selectedIconName="bug"
          onPress={() => {
              this.setState({
                  selectedTab: 'mons'
            });
          }}>
          <App />
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          selected={this.state.selectedTab === 'pokemap'}
          title="Map"
          iconName="map-marker"
          selectedIconName="map-marker"
          onPress={() => {
              this.setState({
                  selectedTab: 'pokemap'
            });
          }}>
          <PokeMap/>
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          selected={this.state.selectedTab === 'login'}
          title="Account"
          iconName="user"
          selectedIconName="user"
          onPress={() => {
              this.setState({
                  selectedTab: 'login'
            });
          }}>
          <Login />
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          selected={this.state.selectedTab === 'options'}
          title="Options"
          iconName="gear"
          selectedIconName="gear"
          onPress={() => {
              this.setState({
                  selectedTab: 'options'
              });
          }}>
          <Options/>
        </Icon.TabBarItemIOS>
      </TabBarIOS>
    );
  }
}

AppRegistry.registerComponent('acetrainer', () => acetrainer);
