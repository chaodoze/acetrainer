import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  TextInput,
  View
} from 'react-native';

import { Input, Text, Button } from 'native-base';
import TrainerLevel from './TrainerLevel'

class Intro extends Component {

  render() {

    return (

      <View style={styles.container}>
        <Text style={styles.description}>
          What was (or is) your level at the time you took the screenshots?
        </Text>
        <TrainerLevel  />

        <View >


          <Button style={{alignSelf:'center', marginTop:20}}>Scan Photos</Button>
        </View>
      </View>

    );
  }
}


const styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 200,
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  
  searchInput: {
    height: 40,
    padding: 4,
    marginRight: 5,
    flex: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    color: '#48BBEC'
  },

});

module.exports = Intro;