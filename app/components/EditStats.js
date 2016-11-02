import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  TouchableHighlight,
  Modal,
  Dimensions,
  View
} from 'react-native';

import { 
  List, ListItem, Text, InputGroup, 
  Input, Icon, Button } from 'native-base';
import TrainerLevel from './TrainerLevel'
import { Col, Row, Grid } from "react-native-easy-grid";
import myTheme from './Themes/myTheme';

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
              <ListItem style={{ marginTop:80, borderColor:'transparent' }}>
                <Grid>
                 <Col size={2}>
                  <View style={{marginRight:5}}>
                    <Text style={styles.header5}>Pokemon Species</Text>
                    <TextInput style={styles.editMonInput} />
                    </View>
                  </Col>
                  <Col size={1}>
                  <View style={{marginRight:5}}>
                    <Text style={styles.header5}>CP</Text>
                    <TextInput style={styles.editMonInput} />
                    </View>
                  </Col>
                  <Col size={1}>
                  <View>
                    <Text style={styles.header5}>HP</Text>
                    <TextInput style={styles.editMonInput}/>
                    </View>
                  </Col>                 
                </Grid>         
              </ListItem>
              <ListItem style={{ borderColor:'transparent' }}>
                <Grid>
                 <Col size={1}>
                  <View style={{marginRight:5}}>
                  </View>
                </Col>
                <Col Col size={2} style={{justifyContent: 'flex-end', alignItems:'flex-end', flexDirection:'row'}}>
                  <View style={{marginRight:5}}>
                    <TouchableHighlight onPress={() => {
                    this.setModalVisible(!this.state.modalVisible)
                    }}>
                    <View style={{marginTop:18}}><Button small >Update</Button></View>
                    </TouchableHighlight>
                  </View>
                  <View style={{marginRight:5}}>
                    <TouchableHighlight onPress={() => {
                    this.setModalVisible(!this.state.modalVisible)
                    }}>
                    <View style={{marginTop:18}}><Button small bordered info >Cancel</Button></View>
                    </TouchableHighlight>
                  </View>
                </Col>
              </Grid>         
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
    fontWeight:'bold', fontSize:12, color:'#ffffff',
  },

  editMonInput: {
    height: 30, borderColor: 'gray', borderWidth: 1, borderRadius:4, padding:3,
    color:'#ffffff'
  },
  trash: {
    position:'absolute', top:20, right:10,
  }
});


module.exports = EditStats;