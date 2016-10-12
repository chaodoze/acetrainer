import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,TouchableHighlight,
  Modal,
  View
} from 'react-native';

import { 
  Container, Content, List, ListItem, Text, InputGroup, 
  Input, Icon, Picker, Badge, Button } from 'native-base';
import {Actions} from 'react-native-router-flux';
import { Col, Row, Grid } from "react-native-easy-grid";
import PercentageCircle from 'react-native-percentage-circle';
import multipleStyles from 'react-native-multiple-styles';
import ModalPicker from 'react-native-modal-picker'

const Item = Picker.Item

class MonDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {modalVisible: false};
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
 
  render() {

     let index = 0;
        const data = [
            { key: index++, section: true, label: 'Quick Move' },
            { key: index++, label: 'Dragon Breath' },
            { key: index++, label: 'Steel Wing' },
        ]; 

    return (
      <View style={{flex: 1}}>
      <ScrollView>
        <Container> 
          <Content>
            <Image source={require('./images/Thumbs/thumb.png')} style={styles.img_container}>          
              <View style={styles.overlay_box}></View>
              <View style={styles.overlay_box_text} >
                <View style={styles.alignCenterCol}>
                   <View><Text style={ styles.mon_name }>Vaporeon</Text></View>
                   <View><Badge style={multipleStyles(styles.t_water)}>Water</Badge></View>
                </View>
              </View>
              <List style={styles.mon_data_box}>
                <ListItem style={styles.mon_data}>
                <Grid style={styles.alignCenter}>
                  <Col size={2} style={styles.alignLeft}><Text> CP: 1360 </Text></Col>
                  <Col size={2}><Text>HP: 153</Text></Col>
                  <Col size={2}><Text>IV 85%-90%</Text></Col>
                  <Col size={1}>
                    <PercentageCircle radius={20} percent={90} borderWidth={5} color={"#3498db"}></PercentageCircle>
                  </Col>
                </Grid>
                </ListItem>
              </List>
              <List style={styles.mon_analysis}>
                <ListItem itemDivider>
                  <Text>MOVESETS</Text>
                </ListItem> 
                <ListItem style={ styles.move_row }>                  
                  <Grid style={styles.alignCenter}>   
                   <Col style={styles.alignLeft}><Text style={ styles.move_label_text }>QUICK MOVE</Text></Col>
                    <Col>
                     <TextInput
                          style={{height:35}}
                          editable={false}
                          value="Hyper Beam" />
                    </Col>
                    <Col style={styles.alignRight}><Badge style={styles.t_ice}>Ice</Badge></Col>
                  </Grid>
                </ListItem> 
                <ListItem style={ styles.move_row }>
                  <Grid style={styles.alignCenter}>
                    <Col style={styles.alignLeft}><Text style={ styles.move_label_text }>CHARGE MOVE</Text></Col>
                    <Col>
                      <ModalPicker
                        data={data}
                        initValue="Select something yummy!"
                        onChange={(option)=>{ this.setState({textInputValue:option.label})}}>           
                        <TextInput
                            style={{borderWidth:0, borderColor:'transparent', height:35}}
                            editable={false}
                            placeholder="Select..."
                            value={this.state.textInputValue} />
                    
                      </ModalPicker> 
                    </Col>                   
                    <Col style={styles.alignRight}><Badge style={styles.t_unknown}>?</Badge></Col>
                  </Grid>
                </ListItem>            
                 <Grid style={styles.alignCenter}>
                  <Col size={2} >
                   <ListItem iconLeft style={ styles.move_grade }>
                     <Icon name='shield' style={{fontSize: 18}} />
                     <Text>Defence: 98%</Text>
                   </ListItem> 
                  </Col>
                   <Col size={2}>
                    <ListItem iconLeft style={ styles.move_grade }>
                    <Icon name='star' style={{fontSize: 18}} />
                    <Text>Attack: 90%</Text>
                  </ListItem> 
                  </Col>
                  <Col size={1} style={styles.alignRight}>
                    <ListItem style={ styles.move_grade }>
                      <Modal
                        animationType={"slide"}
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {alert("Modal has been closed.")}}
                        >
                       <View style={{backgroundColor: 'rgba(0, 0, 0, 0.5)', flex: 1, justifyContent: 'center',padding: 20,}}>
                          <View style={{backgroundColor: '#fff', padding: 20, borderRadius: 10,alignItems: 'center',}}>
                          <Text>Hello World!</Text>
                          <TouchableHighlight onPress={() => {
                            this.setModalVisible(!this.state.modalVisible)
                          }}>
                             <View><Text>Hide Modal</Text></View>
                          </TouchableHighlight>
                        </View>
                       </View>
                      </Modal>

                      <TouchableHighlight onPress={() => {
                        this.setModalVisible(true)
                      }}>
                        <View><Icon name='info-circle' style={{fontSize: 18}} /></View>
                      </TouchableHighlight>
                    </ListItem> 
                  </Col>
                </Grid>             
                <ListItem itemDivider>
                    <Text>BATTLE</Text>
                </ListItem>  
                <ListItem >
                 <Grid style={styles.alignCenter}>   
                    <Col size={1} style={styles.alignLeft}>
                      <Text>Weakness</Text>
                    </Col>
                    <Col size={3} style={styles.alignRight}>
                      <Badge primary>Water</Badge>
                      <Badge style={styles.t_grass}>Grass</Badge>
                      <Badge style={styles.t_ice}>Ice</Badge>
                      <Badge style={styles.t_electric}>Electric</Badge>
                    </Col>
                  </Grid>
                </ListItem>
                <ListItem >
                  <Text>Resistant To</Text>
                  <Badge style={styles.t_normal}>Normal</Badge>
                </ListItem>
                <ListItem>
                  <Text>Train Against</Text>
                </ListItem>
              </List>
            </Image>
          </Content>
        </Container>
      </ScrollView>
    <Button rounded info onPress={Actions.pop} style={{alignSelf:'center', marginBottom:10}}><Icon name='close' /></Button>
  </View>
    );
  }
}

var styles = StyleSheet.create({

 img_container: {
    flex: 1,
    width: undefined,
    height: undefined,
    top:-60, 
  },
  overlay_box: {
    backgroundColor:'rgba(0, 0, 0, 0.6)',
    position:'absolute',
    top:0,
    left:0,
    right:0,
    left:0,
    height:250,
  },

  overlay_box_text: {
    position:'absolute',
    top:150,
    left:0,
    right:0,
    left:0,
    height:250,  
  },

  mon_data_box: {
    marginTop:250, 
    backgroundColor:'rgba(255,255,255,0.8)',
  },

  mon_name: {
    color:'#ffffff',
    fontSize:28,
    lineHeight:32,
    marginBottom:10,
    fontWeight:'bold',
    textAlign :'center',
  },

  mon_data: {
    opacity:0.7, padding:5, borderBottomWidth:0,
  },

  mon_analysis: {
    backgroundColor:'#ffffff',
  },
  move_row: {  },
  move_grade: {
     borderBottomWidth:0,
  },

  move_label_text: {
    fontSize:14,
    fontWeight:'bold',
    color:'#1d484d',
  },

  alignRight: {
    flexWrap: 'wrap',  justifyContent: 'flex-end', alignItems: 'flex-end',flexDirection:'row',
  },
  alignLeft: {
    flexWrap: 'wrap',  justifyContent: 'flex-start', alignItems: 'flex-start',flexDirection:'row',
  },

  alignCenter: {
    flexWrap: 'wrap',  justifyContent: 'center', alignItems: 'center',flexDirection:'row',
  },

  alignCenterCol: {
    flexWrap: 'wrap',  justifyContent: 'center', alignItems: 'center', flexDirection:'column'
  },

  type: { marginRight:2},
  t_normal: { backgroundColor:'#a8a878'},
  t_fighting: { backgroundColor:'#c02038'},
  t_flying: { backgroundColor:'#a28ae7'},
  t_poison: { backgroundColor:'#a040a0'},
  t_ground: { backgroundColor:'#e0c068'},
  t_rock: { backgroundColor:'#b8a038'},
  t_bug: { backgroundColor:'#a8b820'},
  t_ghost: { backgroundColor:'#705898'},
  t_steel: { backgroundColor:'#b8b8d0'},
  t_fire: { backgroundColor:'#f08030'},
  t_water: { backgroundColor:'#6890f0'},
  t_grass: { backgroundColor:'#78c850'},
  t_electric: { backgroundColor:'#f8d030'},
  t_psychic: { backgroundColor:'#f85888'},
  t_ice: { backgroundColor:'#5bc0de'},
  t_dragon: { backgroundColor:'#7038f8'},
  t_dark: { backgroundColor:'#705848'},
  t_fairy: { backgroundColor:'#ee99ac'},
  t_unknown: { backgroundColor:'#cccccc'}

});

module.exports = MonDetails;