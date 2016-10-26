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

export default class ChooseOrCancel extends Component {
  chosen(cancelled) {
    const {onChosen} = this.props
    if (onChosen) {onChosen(cancelled)}
  }
  render() {
    const {children} = this.props
    return (
/*    <Modal
          animationType={"slide"}
          transparent={true} >
        <View style={styles.modal_outer}>
          <Button onPress={()=>this.chosen(true)}>Cancel</Button>
          <Button onPress={()=>this.chosen(false)}>Choose</Button>
          {children}
        </View>
      </Modal>

    */


      <Modal
        animationType={"slide"}
        transparent={true}
        
        >
        <View style={{backgroundColor: 'rgba(0, 0, 0, 0.7)', flex:1, borderColor:'#ffffff', borderWidth:2}}>
        <View>
          <Text style={{fontWeight:'bold', fontSize:16, color:'#ffffff', marginTop:30, marginLeft:20}}>Edit Stats</Text>

 
          <List theme={myTheme}>
            <ListItem style={{ marginTop:30, borderColor:'transparent' }}>
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
                    style={styles.editMonInput} />
                    {children}
                </View>
              </Col>
              <Col Col size={2} style={{justifyContent: 'flex-end', alignItems: 'flex-end',flexDirection:'row'}}>
                <View style={{marginRight:5}}>

                  <View style={{marginTop:18}}><Button small onPress={()=>this.chosen(false)}>Update</Button></View>

                </View>

                <View style={{marginRight:5}}>

                  <View style={{marginTop:18}}><Button small bordered info onPress={()=>this.chosen(true)}>Cancel</Button></View>
                </View>
              </Col>
            </Grid>         
            </ListItem>
          </List>
        </View>
       </View>
      </Modal>





    )
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
