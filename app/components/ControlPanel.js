import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import {Actions} from 'react-native-router-flux';

import { Container, Content, List, ListItem, Button, Header, Title, Text } from 'native-base';

class ControlPanel extends Component {
  render() {
      return (
        <View style={styles.sideNav}>
          <List>
              <ListItem button style={styles.navItem}>
                  <Text style={styles.navItemText}>Set Trainer Level (21)</Text>
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

});

module.exports = ControlPanel;
