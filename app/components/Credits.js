
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableHighlight, TouchableOpacity

} from 'react-native';

import {
  Container, Content, Card, CardItem, Thumbnail, Button, Icon, Header, Title, Text } from 'native-base';
import myTheme from './Themes/myTheme';


var styles = StyleSheet.create({
  content: { margin:10, marginTop:10, padding:5},
  headerText: { fontSize:16, marginBottom:10}
});

class Credits extends Component {

  render() {
    return (
      <Container theme={myTheme}>
        <Header >
          <Button onPress={() => this.props.openDrawer()} transparent><Icon name='chevron-left' /></Button>    
          <Title>Credits</Title>
        </Header>
        <Content theme={myTheme} style={styles.content}>
            <Text style={styles.headerText}>Thanks to all of these open source projects and Creative Common Licensed Images</Text>
        <Card>
        <CardItem>                       
            <Thumbnail source={require('./images/icons/iconfinderfavicon.png')} />
            <Text>Pokémon icons by Geovanny Gavilanes</Text>
            <Text note>https://www.iconfinder.com/GeoGavilanes</Text>
        </CardItem>
        <CardItem>                       
            <Thumbnail source={require('./images/icons/ggfavicon.png')} />
            <Text>Game Press Pokémon Go</Text>
            <Text note>https://pokemongo.gamepress.gg</Text>
        </CardItem>

        <CardItem>                       
            <Thumbnail source={require('./images/icons/gameinfofavicon.png')} />
            <Text>Pokémon Game Info</Text>
            <Text note>https://pokemon.gameinfo.io</Text>
        </CardItem>                
        </Card>

        </Content>          
      </Container>
    );
  }
}
 
module.exports = Credits;

