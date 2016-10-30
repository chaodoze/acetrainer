import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Modal,
  Image,
  TouchableHighlight,
  View
} from 'react-native';

import { List, ListItem, Text, Icon, Button } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import myTheme from './Themes/myTheme';
import layout from './Styles';
import multipleStyles from 'react-native-multiple-styles';

export default class MoveSetChart extends Component {
  constructor(props) {
    super(props);
    this.state = {modalVisible: false};
  }

  openModal() {
    this.setState({modalVisible: visible});
  }

  closeModal() {
    this.setState({modalVisible: false});
  }

  render() {
    return (
      <View>
        <TouchableHighlight onPress={() => {this.openModal()}}>
          <View><Icon theme={myTheme} name='info-circle' style={{fontSize: 18}} /></View>
        </TouchableHighlight>
        <Modal
          animationType={"slide"}
          transparent={true} 
          >
          <View style={layout.modal_outer}>
            <View style={layout.modal_inner}>
              <View>
                <View style={layout.choice_title}>
                  <Text style={layout.choice_title_text}>MOVESET GRADE</Text>
                  <Button style={layout.fixedClose} theme={myTheme} transparent small onPress={() => {this.closeModal()}}>
                    <Icon name='close' style={{color:'#333333'}}/>
                  </Button>
                </View>
                <View style={layout.modal_list_header}>
                  <Image source={require('./images/icons/sword.png')} style={layout.icon} />
                  <Text>Attack</Text>
                </View>   
                <List>
                  <ListItem>
                    <Grid>
                      <Col size={3}><Text style={styles.cell}>Shadow Claw / Sludge Bomb</Text></Col>
                      <Col size={1}>    
                        <View style={multipleStyles(styles.grade_badge, styles.grade_a)}>
                          <Text style={styles.grade_text}>A</Text>
                        </View>
                      </Col>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid>
                      <Col size={3}><Text style={styles.cell}>Sucker Punch / Sludge Bomb </Text></Col>
                      <Col size={1} >    
                        <View style={multipleStyles(styles.grade_badge, styles.grade_b)}>
                          <Text style={styles.grade_text}>B</Text>
                        </View>
                      </Col>
                    </Grid>
                  </ListItem>
                </List>
                <View style={layout.modal_list_header}>
                  <Image source={require('./images/icons/shield.png')} style={layout.icon} />                  
                  <Text>Defense</Text>
                </View>   
                <List>
                  <ListItem>
                    <Grid>
                      <Col size={3}><Text style={styles.cell}>Shadow Claw / Sludge Bomb</Text></Col>
                      <Col size={1}>    
                        <View style={multipleStyles(styles.grade_badge, styles.grade_a)}>
                          <Text style={styles.grade_text}>A</Text>
                        </View>
                      </Col>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid>
                      <Col size={3}><Text style={styles.cell}>Sucker Punch / Sludge Bomb </Text></Col>
                      <Col size={1} >    
                        <View style={multipleStyles(styles.grade_badge, styles.grade_b)}>
                          <Text style={styles.grade_text}>B</Text>
                        </View>
                      </Col>
                    </Grid>
                  </ListItem>
                </List>


              </View>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}

var styles = StyleSheet.create({

  header5: {
    fontWeight:'bold', fontSize:12, color:'#ffffff',
  },
  cell: {
    fontSize:13,
  },

  grade_badge: {
    padding:7,
    paddingTop:1,
    paddingBottom:1,
    borderRadius:2,
    marginLeft:5,
    width:24,
  },

  grade_a: { backgroundColor:'#00a700'},
  grade_b: { backgroundColor:'#98d000'},
  grade_c: { backgroundColor:'#ded100'},
  grade_d: { backgroundColor:'#dea300'},

  grade_text: { color:'#ffffff'},

});
