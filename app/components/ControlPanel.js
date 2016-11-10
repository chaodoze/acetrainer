import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import {Actions} from 'react-native-router-flux';
import TrainerLevel from './TrainerLevel'

import { Container, Content, List, ListItem, Button, Header, Title, Text } from 'native-base';
import layout from './Styles';

class ControlPanel extends Component {
  render() {
      return (
        <View style={styles.sideNav}>
          <List>
              <ListItem button style={styles.navItem}>
                 <View style={layout.alignLeft}><Text style={styles.navItemText}>Set </Text><TrainerLevel style={styles.levelLink} level={30} /></View>
              </ListItem>
              <ListItem button style={styles.navItem}>
                  <Text style={styles.navItemText}>Help</Text>
              </ListItem>
              <ListItem button style={styles.navItem} onPress={()=>Actions.credits()}>
                  <Text style={styles.navItemText}>Credits</Text>
              </ListItem>
          </List>
        </View>
      );
    }
}

var styles = StyleSheet.create({
  sideNav: { marginTop:30 },
  navItem: { marginLeft:0, paddingLeft:10},
  navItemText: { fontSize:14},
  levelLink: { fontSize:14 }

});

module.exports = ControlPanel;
