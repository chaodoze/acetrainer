
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight, TouchableOpacity

} from 'react-native';

import OptionOne from './OptionOne'

var styles = StyleSheet.create({
  container: {
      backgroundColor: '#F5FCFF',
  },
  row: {
    flex: 1,
    padding: 10,
  },

  row2: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  header: {
    flex:1,
    backgroundColor: '#50a4ff',
    padding: 10,
  },
  headerTitle: {
    color: '#fff',
  },

  label: {
    fontSize:13,
  },
  separator: {
       height: 1,
       backgroundColor: '#dddddd'
   },
  listView: {
    backgroundColor: '#F5FCFF'
  } 
});

class OptionDetails extends Component {

  gotoNext() {
   this.props.navigator.push({
      component: OptionOne,
      passProps: {
        id: 'MY ID',
      },
    })
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Pokemons</Text>
          </View>
          <TouchableHighlight  onPress={ () => this.gotoNext() }>
          <View style={ styles.row2 }>
            <Text style={ styles.label }>Option 1</Text>
            <Text style={ styles.label }>></Text>
          </View>

          </TouchableHighlight>
          <View style={styles.separator} />
          <View style={styles.row}>
            <Text style={styles.label}>Option 2</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.row}>
            <Text style={styles.label}>Option 3</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.row}>
            <Text style={styles.label}>Option 4</Text>
          </View>
          <View style={styles.separator} />
        </View>
      </ScrollView>
    );
  }
}
 
module.exports = OptionDetails;

