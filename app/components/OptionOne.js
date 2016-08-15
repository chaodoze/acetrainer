import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Switch,
  Text
} from 'react-native';


var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
 

var OptionOne = React.createClass({

  getInitialState() {
    return {
      trueSwitchIsOn: true,
      falseSwitchIsOn: false,
    };
  },

  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Option Example
        </Text>
        <Text style={styles.instructions}>
          Option Switch Examples
        </Text>
        <View>
        <Switch
          onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
          style={{marginBottom: 10}}
          value={this.state.falseSwitchIsOn} />
        <Switch
          onValueChange={(value) => this.setState({trueSwitchIsOn: value})}
          value={this.state.trueSwitchIsOn} />
      </View>
      </View>
    );
  }
});
 
module.exports = OptionOne;


