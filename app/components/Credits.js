
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

const openInBrowser = url=>{}

class Credits extends Component {

  render() {
    return (
      <Container theme={myTheme}>
        <Header >
          <Button onPress={() => Actions.pop()} transparent><Icon name='chevron-left' /></Button>
          <Title>Credits</Title>
        </Header>
        <Content theme={myTheme} style={styles.content}>
          <Text style={styles.headerText}>Thanks to all of these open source projects and Creative Commons licensed images</Text>
          <Card>
            <CardItem button onPress={()=> openInBrowser('https://facebook.github.io/react')}>
              <Text>React</Text>
            </CardItem> 
            <CardItem button onPress={()=> openInBrowser('https://facebook.github.io/react-native/')}>
              <Text>React Native</Text>
            </CardItem>
            <CardItem button onPress={()=> openInBrowser('https://firebase.google.com/')}>
              <Text>Firebase</Text>
            </CardItem>
            <CardItem button onPress={()=> openInBrowser('http://nativebase.io/')}>
              <Text>Native Base</Text>
            </CardItem>            
            <CardItem button onPress={()=> openInBrowser('https://facebook.github.io/react')}>
              <Text>Pokémon Game Info</Text>
            </CardItem> 
            <CardItem button onPress={()=> openInBrowser('https://www.iconfinder.com/GeoGavilanes')}>
              <Text>Pokémon icons by Geovanny Gavilanes</Text>
            </CardItem>
            <CardItem button onPress={()=> openInBrowser('https://pokemongo.gamepress.gg')}>
              <Text>Game Press Pokémon Go</Text>
            </CardItem>
            <CardItem button onPress={()=> openInBrowser('https://lodash.com/')}>
              <Text>Lodash</Text>
            </CardItem>
            <CardItem button onPress={()=> openInBrowser('http://momentjs.com')}>
              <Text>Moment</Text>
            </CardItem>
            <CardItem button onPress={()=> openInBrowser('https://github.com/sindresorhus/query-string')}>
              <Text>query-string</Text>
            </CardItem>
            <CardItem button onPress={()=> openInBrowser('https://github.com/oblador/react-native-collapsible')}>
              <Text>react-native-collapsible</Text>

            </CardItem>
            <CardItem button onPress={()=> openInBrowser('https://github.com/rebeccahughes/react-native-device-info')}>
              <Text>react-native-device-info</Text>

            </CardItem>
            <CardItem button onPress={()=> openInBrowser('https://github.com/root-two/react-native-drawer')}>
              <Text>react-native-drawer</Text>
            </CardItem>
            <CardItem button onPress={()=> openInBrowser('https://github.com/evollu/react-native-fcm')}>
              <Text>react-native-fcm</Text>
            </CardItem>
            <CardItem button onPress={()=> openInBrowser('https://www.npmjs.com/package/react-native-parallax-scroll-view')}>
              <Text>react-native-parallax-scroll-view</Text>
            </CardItem>
            <CardItem button onPress={()=> openInBrowser('https://github.com/yonahforst/react-native-permissions')}>
              <Text>react-native-permissions</Text>
            </CardItem>
            <CardItem button onPress={()=> openInBrowser('https://github.com/aksonov/react-native-router-flux')}>
              <Text>react-native-router-flux</Text>
            </CardItem>
            <CardItem button onPress={()=> openInBrowser('https://github.com/oblador/react-native-vector-icons')}>
              <Text>react-native-vector-icons</Text>
            </CardItem>
            <CardItem button onPress={()=> openInBrowser('https://github.com/alinz/react-native-webview-bridge')}>
              <Text>react-native-webview-bridge</Text>
            </CardItem>
            <CardItem button onPress={()=> openInBrowser('https://github.com/reactjs/react-redux')}>
              <Text>react-redux</Text>
            </CardItem> 
            <CardItem button onPress={()=> openInBrowser('https://github.com/reactjs/redux')}>
              <Text>redux</Text>
            </CardItem>
            <CardItem button onPress={()=> openInBrowser('https://github.com/evgenyrodionov/redux-logger')}>
              <Text>redux-logger</Text>
            </CardItem>         
          </Card>
        </Content>
      </Container>
    );
  }
}

module.exports = Credits;
