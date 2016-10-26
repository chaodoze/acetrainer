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

class SampleApp2 extends Component {
  constructor(props) {
    super(props);
    this.state = {modalVisible: false};
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View>    
          <Image style={[imageDimensions, {position: 'absolute'}]} source={require('./images/Thumbs/thumb.png')} />
        </View>
      <ScrollView style={{marginTop:100}}>
        <View>
          <TouchableHighlight onPress={() => {
              this.setModalVisible(true)
            }}>
              <View><Text>Click here</Text></View>
          </TouchableHighlight>
        </View>
      </ScrollView>
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {alert("Modal has been closed.")}}
        >
        <View style={{backgroundColor: 'rgba(0, 0, 0, 0.7)', flex:1, borderColor:'#ffffff', borderWidth:2}}>
        <View>
          <Text style={{fontWeight:'bold', fontSize:12, color:'#ffffff', marginTop:80, marginLeft:20}}>Sorry, we couldn't read the screenshot :( 
            Please enter them manually and we'll do the rest.</Text>
          <List theme={myTheme}>
            <ListItem style={{ marginTop:10, borderColor:'transparent' }}>
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
                  <Text style={styles.header5}>Your Trainer Level</Text>
                  <TextInput
                    style={styles.editMonInput}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text} />
                </View>
              </Col>
              <Col Col size={2} style={{justifyContent: 'flex-end', alignItems: 'flex-end',flexDirection:'row'}}>
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
      </Modal>
    </View>
    );
  }
}

var styles = StyleSheet.create({

  header5: {
    fontWeight:'bold', fontSize:12, color:'#ffffff',
  },

  editMonInput: {
    height: 30, borderColor: 'gray', borderWidth: 1, borderRadius:4, padding:3,
    color:'#ffffff'
  },

});


module.exports = SampleApp2;