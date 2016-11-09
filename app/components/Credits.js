
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableHighlight, TouchableOpacity

} from 'react-native';
import {Actions} from 'react-native-router-flux'

import {
  Container, Content, Card, CardItem, Thumbnail, Button, Icon, Header, Title, Text } from 'native-base';
import myTheme from './Themes/myTheme';


var styles = StyleSheet.create({
  content: { margin:10, marginTop:10, padding:5},
  headerText: { fontSize:16, marginBottom:10},
  note: { color:'#999999', fontSize:15, lineHeight:20}
});

class Credits extends Component {

  render() {
    return (
      <Container theme={myTheme}>
        <Header >
          <Button onPress={() => Actions.pop()} transparent><Icon name='chevron-left' /></Button>
          <Title>Credits</Title>
        </Header>
        <Content theme={myTheme} style={styles.content}>
          <Text style={styles.headerText}>Thanks to all of these open source projects and Creative Common Licensed Images</Text>
          <Card>
            <CardItem>
              <Text>React</Text>
              <Text style={styles.note}>https://facebook.github.io/react</Text>
            </CardItem> 
            <CardItem>
              <Text>React Native</Text>
              <Text style={styles.note}>https://facebook.github.io/react-native/</Text>
            </CardItem>
            <CardItem>
              <Text>Firebase</Text>
              <Text style={styles.note}>https://firebase.google.com/</Text>
            </CardItem>
            <CardItem>
              <Text>Native Base</Text>
              <Text style={styles.note}>http://nativebase.io/</Text>
            </CardItem>            
            <CardItem>
              <Text>Pokémon Game Info</Text>
              <Text style={styles.note}>https://pokemon.gameinfo.io</Text>
            </CardItem> 
            <CardItem>
              <Text>Pokémon icons by Geovanny Gavilanes</Text>
              <Text style={styles.note}>https://www.iconfinder.com/GeoGavilanes</Text>
            </CardItem>
            <CardItem>
              <Text>Game Press Pokémon Go</Text>
              <Text style={styles.note}>https://pokemongo.gamepress.gg</Text>
            </CardItem>
            <CardItem>
              <Text>Lodash</Text>
              <Text style={styles.note}>https://lodash.com/</Text>
            </CardItem>
            <CardItem>
              <Text>Moment</Text>
              <Text style={styles.note}>http://momentjs.com</Text>
            </CardItem>
            <CardItem>
              <Text>Query String</Text>
              <Text style={styles.note}>https://github.com/sindresorhus/query-string</Text>
            </CardItem>
            <CardItem>
              <Text>react-native-collapsible</Text>
            </CardItem>
            <CardItem>
              <Text>react-native-device-info</Text>
            </CardItem>
            <CardItem>
              <Text>react-native-drawer</Text>
            </CardItem>
            <CardItem>
              <Text>react-native-fcm</Text>
            </CardItem>
            <CardItem>
              <Text>react-native-parallax-scroll-view</Text>
            </CardItem>
            <CardItem>
              <Text>react-native-permissions</Text>
            </CardItem>
            <CardItem>
              <Text>react-native-router-flux</Text>
            </CardItem>
            <CardItem>
              <Text>react-native-vector-icons</Text>
            </CardItem>
            <CardItem>
              <Text>react-native-webview-bridge</Text>
            </CardItem>
            <CardItem>
              <Text>react-redux</Text>
            </CardItem> 
            <CardItem>
              <Text>redux</Text>
            </CardItem>
            <CardItem>
              <Text>redux-logger</Text>
            </CardItem>         
          </Card>

        </Content>
      </Container>
    );
  }
}

module.exports = Credits;
