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
import ModalPicker from 'react-native-modal-picker';
import myTheme from './Themes/myTheme';


const MonTypeBadge = ({pokemonType}) => {
  const style = `t_${pokemonType.displayName.toLowerCase()}`
  return (
    <Badge style={multipleStyles(styles[style])}>{pokemonType.displayName}</Badge>
  )
}

class MonDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {modalVisible: false};
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    const {mon} = this.props
    return (
      <View style={{flex: 1}}>
      <ScrollView>
        <Container>
          <Content  theme={myTheme}>
            <Image source={{uri:mon.url}} style={styles.img_container}>
              <View style={styles.overlay_box}></View>
              <View style={styles.overlay_box_text} >
                <View style={styles.alignCenterCol}>
                   <View><Text style={ styles.mon_name }>{mon.Name}</Text></View>
                   <View style={styles.alignCenter}>{mon.specie().types().map(type=><MonTypeBadge key={type.id} pokemonType={type} />)}</View>
                </View>
              </View>
              <List style={styles.mon_data_box}>
                <ListItem itemDivider>
                  <Grid>   
                   <Col style={styles.alignLeft}><Text style={styles.stats}>STATS</Text></Col>
                   <Col style={styles.alignRight}>
                   <TouchableHighlight onPress={() => {
                          this.setModalVisible(true)
                        }}>
                      <View>
                        <Text style={styles.level}>Trainer Level 23</Text>
                      </View>
                    </TouchableHighlight>
                   </Col>
                  </Grid>
                </ListItem> 
                <ListItem style={styles.mon_data}>
                <Grid style={styles.alignCenter}>
                  <Col size={2} style={styles.alignLeft}><Text> CP: {mon.CP} </Text></Col>
                  <Col size={2}><Text>HP: {mon.HP}</Text></Col>
                  <Col size={2}><Text>IV 85%-90%</Text></Col>
                  <Col size={1}>
                    <PercentageCircle radius={20} percent={mon.avgIVPercent()} borderWidth={5} color={"#3498db"}></PercentageCircle>
                  </Col>
                </Grid>
                </ListItem>
              </List>
              <List style={styles.mon_analysis}>
                <ListItem itemDivider>
                  <Text>MOVESETS</Text>
                </ListItem>
                <ListItem>
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
                <ListItem>
                  <Grid style={styles.alignCenter}>
                    <Col style={styles.alignLeft}><Text style={ styles.move_label_text }>CHARGE MOVE</Text></Col>
                    <Col>
                      <TouchableHighlight onPress={() => {
                          this.setModalVisible(true)
                        }}>
                        <View>
                          <TextInput
                            style={{borderWidth:0, borderColor:'transparent', height:35}}
                            editable={false}
                            placeholder="Select..."
                            />
                          </View>
                        </TouchableHighlight>


                    </Col>
                    <Col style={styles.alignRight}><Badge style={styles.t_unknown}>?</Badge></Col>
                  </Grid>
                </ListItem>
                <ListItem style={styles.move_grade}>
                  <Grid>
                    <Col size={1} style={styles.alignLeft}>
                        <Text style={ styles.move_label_text }>GRADE</Text>
                    </Col>
                    <Col size={2} style={styles.alignCenter}>
                       <Icon name='star' style={styles.grade_icon} />
                       <Text>Attack </Text>
                      <View style={multipleStyles(styles.grade_badge, styles.grade_a)}>
                        <Text style={styles.grade_text}>A</Text>
                      </View>
                    </Col>
                    <Col size={2} style={multipleStyles(styles.alignCenter, styles.defence)}>
                      <Icon name='shield' style={styles.grade_icon} />
                      <Text style={styles.defence_text}>Defence</Text>
                      <View style={multipleStyles(styles.grade_badge, styles.grade_d)}>
                        <Text style={styles.grade_text}>D</Text>
                      </View>
                    </Col>
                    <Col size={1} style={styles.alignRight}>
                      <Modal
                          animationType={"slide"}
                          transparent={true}
                          visible={this.state.modalVisible}
                          onRequestClose={() => {alert("Modal has been closed.")}}
                          >
                        <View style={styles.modal_outer}>
                          <View style={styles.modal_inner}>
                          <View>
                          <List>
                            <ListItem>
                              <Text style={{textAlign:'center'}}>Charge Move</Text>
                            </ListItem>
                            <TouchableHighlight>
                            <View>
                              <ListItem>
                                 <Text style={{textAlign:'center', color:'#2182f7'}}>Dragon Breath</Text>
                              </ListItem>
                            </View>
                            </TouchableHighlight>
                            <ListItem>
                               <Text style={{textAlign:'center', color:'#2182f7'}}>Steel Wing</Text>
                            </ListItem>
                            </List>
                            </View>
                          </View>

                          <TouchableHighlight onPress={() => {
                              this.setModalVisible(!this.state.modalVisible)
                            }}>
                            <View style={{backgroundColor: '#fff', padding: 10, borderRadius: 10,alignItems: 'center', marginTop:5}}>
                              <View><Text style={{color:'#666666'}}>Cancel</Text></View>
                            </View>
                          </TouchableHighlight>
                         </View>
                        </Modal>

                        <TouchableHighlight onPress={() => {
                          this.setModalVisible(true)
                        }}>
                          <View><Icon name='info-circle' style={{fontSize: 18}} /></View>
                        </TouchableHighlight>
                    </Col>
                  </Grid>
                </ListItem>
                <ListItem itemDivider>
                  <Text>BATTLE</Text>
                </ListItem>
                <ListItem >
                 <Grid style={styles.alignCenter}>
                    <Col size={1} style={styles.alignLeft}>
                      <Text>Strong Against</Text>
                    </Col>
                    <Col size={3} style={styles.alignRight}>
                      {mon.specie().strongAgainst().map(type=><MonTypeBadge key={type.id} pokemonType={type} />)}
                    </Col>
                  </Grid>
                </ListItem>
                <ListItem >
                  <Grid style={styles.alignCenter}>
                    <Col size={1} style={styles.alignLeft}>
                      <Text>Resistant To</Text>
                    </Col>
                    <Col size={3} style={styles.alignRight}>
                      {mon.specie().resistantTo().map(type=><MonTypeBadge key={type.id} pokemonType={type} />)}
                    </Col>
                  </Grid>
                </ListItem>
              </List>
            </Image>
          </Content>
        </Container>
      </ScrollView>
    <Button  theme={myTheme} rounded info onPress={Actions.pop} style={{alignSelf:'center', marginBottom:10}}><Icon name='close' /></Button>
  </View>
    );
  }
}

var styles = StyleSheet.create({

 img_container: {
    flex: 1,
    width: undefined,
    height: undefined,
    top:0, 
  },
  overlay_box: {
    backgroundColor:'rgba(0, 0, 0, 0.6)',
    position:'absolute',
    top:0,
    left:0,
    right:0,
    left:0,
    height:200,
  },

  overlay_box_text: {
    position:'absolute',
    top:70,
    left:0,
    right:0,
    left:0,
  },

  mon_data_box: {
    marginTop:200, 
    backgroundColor:'#ffffff',
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

  stats: { fontWeight:'bold'},
  level: { color:'#666', fontSize:13 },

  mon_analysis: {
    backgroundColor:'#ffffff',
  },
  move_grade: {
     paddingTop:15,
     paddingBottom:15,
     borderBottomWidth:0,
  },

  grade_icon: {
    fontSize: 18, marginRight:4
  },

  grade_badge: {
    padding:7, 
    paddingTop:1, 
    paddingBottom:1, 
    borderRadius:2, 
    marginLeft:5
  },

  grade_a: { backgroundColor:'#00a700'},
  grade_b: { backgroundColor:'#98d000'},
  grade_c: { backgroundColor:'#ded100'},
  grade_d: { backgroundColor:'#dea300'},

  grade_text: { color:'#ffffff'},


  defence: { opacity:0.3, marginLeft:30},

  modal_outer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
    flex: 1, justifyContent: 'center',padding: 20,
  },
  modal_inner: {
    backgroundColor: '#fff', padding: 10, borderRadius: 10,
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

  type: { marginRight:4},
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