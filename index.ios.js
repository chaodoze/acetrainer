import React, { Component } from 'react';
import {
  AppRegistry,
  TabBarIOS
} from 'react-native';

import App from './app/components/app'
import PokeMap from './app/components/PokeMap'
import Login from './app/components/Login'
import Options from './app/components/Options'

class acetrainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        selectedTab: 'pokemap'
    };
  }

  render() {
    return (
      <TabBarIOS selectedTab={this.state.selectedTab}>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'pokemap'}
          systemIcon="featured"
          onPress={() => {
              this.setState({
                  selectedTab: 'pokemap'
            });
          }}>
          <PokeMap/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'login'}
          systemIcon="contacts"
          onPress={() => {
              this.setState({
                  selectedTab: 'login'
            });
          }}>
          <Login/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'app'}
          systemIcon="search"
          onPress={() => {
              this.setState({
                  selectedTab: 'app'
            });
          }}>
          <App/>
        </TabBarIOS.Item>        
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'options'}
          systemIcon="more"
          onPress={() => {
              this.setState({
                  selectedTab: 'options'
              });
          }}>
          <Options/>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}
 
AppRegistry.registerComponent('acetrainer', () => acetrainer);
