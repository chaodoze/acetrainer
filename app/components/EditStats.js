import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  TextInput,
  Dimensions,
  View
} from 'react-native';

import { 
  List, ListItem, Text, Thumbnail, Input, Icon, Button } from 'native-base';
import TrainerLevel from './TrainerLevel'
import myTheme from './Themes/myTheme';
import layout from './Styles';


const window = Dimensions.get('window')
const imageDimensions = {
  height: window.height,
  width: window.width
}

class EditStats extends Component {

  render() {
    return (
      <View style={{flex: 1}}>
        <View>    
          <Image style={[imageDimensions, {position: 'absolute'}]} source={require('./images/Thumbs/thumb.png')} />
        </View>
        <View style={styles.editOverlay}>
          <View style={styles.trash}>
            <Button  theme={myTheme} transparent>
              <Icon name='trash' style={{color:'#ffffff'}}/>
            </Button>
          </View>
          <View>
            <List theme={myTheme}>
              <ListItem style={[styles.firstItem, layout.alignLeft, styles.noBorder]}>
                <View style={{flex:2}}>
                  <Text style={styles.header5}>Pokémon Species</Text>
                  <TextInput style={styles.editMonInput} />
                </View>
                <View style={{flex:1}}>
                  <Text style={styles.header5}>CP</Text>
                  <TextInput style={styles.editMonInput} />
                </View>
                <View style={{flex:1}}>
                  <Text style={styles.header5}>HP</Text>
                  <TextInput style={styles.editMonInput}/>
                </View> 
              </ListItem>
              <ListItem style={styles.suggestMon} >
                <List style={{backgroundColor:'#ffffff'}}>
                  <ListItem>
                    <Thumbnail source={require('./images/pokemon_cc/1.png')} />
                    <Text>Bulbasaur</Text>
                  </ListItem>
                  <ListItem>
                    <Thumbnail source={require('./images/pokemon_cc/2.png')} />
                    <Text>IvySaur</Text>
                  </ListItem>
                  <ListItem>
                    <Thumbnail source={require('./images/pokemon_cc/3.png')} />
                    <Text>Venasaur</Text>
                  </ListItem>
                  <ListItem>
                    <Thumbnail source={require('./images/pokemon_cc/4.png')} />
                    <Text>Charmandar</Text>
                  </ListItem>
                </List>
              </ListItem>

              <ListItem style={[layout.alignRight, styles.noBorder]}>
                <View style={{flex:1}}>
                  <Text style={styles.header5}>Your Trainer Level</Text>
                  <TextInput style={[styles.editMonInput, styles.levelInput]}/>
                </View> 
                <View style={layout.alignRight}>
                  <Button small  style={styles.button}>Update</Button>
                  <Button small bordered info style={styles.button}>Cancel</Button>
                </View>
              </ListItem>
            </List>
          </View>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  editOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)', flex:1, borderColor:'#ffffff', borderWidth:2
  },

  header5: {
    fontWeight:'bold', fontSize:13, color:'#ffffff',
  },

  editMonInput: {
    height: 30, borderColor: 'gray', borderWidth: 1, borderRadius:4, padding:3,
    color:'#ffffff', marginRight:5
  },
  levelInput: {
    width:170,
  },
  trash: {
    position:'absolute', top:20, right:10,
  },
  firstItem: {
    marginTop:80, borderColor:'transparent'
  },
  noBorder: {
    borderColor:'transparent'
  },
  button: {
    marginRight:5,
    marginTop:16
  },

  suggestMon: {
    borderColor:'transparent', marginRight:5,
    marginTop:-14
  },

});

module.exports = EditStats;