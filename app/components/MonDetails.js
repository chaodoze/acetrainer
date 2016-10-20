import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
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
import layout from './Styles';
import Move from './Move';
import MonTypeBadge from './MonTypeBadge';
import Grade from './Grade'
import myTheme from './Themes/myTheme';

class MonDetails extends Component {
  render() {
    const {mon, goBack} = this.props
    console.log('render mon details')
    return (
      <View style={{flex: 1}}>
        <Container>
          <Content  theme={myTheme}>
            <Image source={{uri:mon.url}} style={styles.img_container}>
              <View style={styles.overlay_box}></View>
              <View style={styles.overlay_box_text} >
                <View style={layout.alignCenterCol}>
                   <View><Text style={ styles.mon_name }>{mon.Name}</Text></View>
                   <View style={layout.alignCenter}>{mon.specie().types().map(type=><MonTypeBadge key={type.id} pokemonType={type} />)}</View>
                </View>
              </View>
              <List style={styles.mon_data_box}>
                <View style={styles.header}>
                  <View><Text style={styles.headerTitle}>STATS</Text></View>
                  <TouchableHighlight onPress={() => {
                          this.setModalVisible(true)
                        }}>
                    <View><Text style={styles.level}>Trainer Level 23</Text></View>
                   </TouchableHighlight>
                </View>
                <ListItem style={styles.mon_data}>
                <Grid style={layout.alignCenter}>
                  <Col size={2} style={layout.alignLeft}><Text> CP: {mon.CP} </Text></Col>
                  <Col size={2}><Text>HP: {mon.HP}</Text></Col>
                  <Col size={2}><Text>IV: {mon.ivRangeStr()}</Text></Col>
                  <Col size={1}>
                    <PercentageCircle radius={20} percent={mon.avgIVPercent()} borderWidth={5} color={"#3498db"}></PercentageCircle>
                  </Col>
                </Grid>
                </ListItem>
              </List>
              <View style={styles.header}>
                  <Text style={styles.headerTitle}>MOVESETS</Text>
              </View>
              <List style={styles.mon_analysis}>
                <ListItem>
                  <Move mon={mon} type="quick" />
                </ListItem>
                <ListItem>
                  <Move mon={mon} type="charge" />
                </ListItem>
                <ListItem style={styles.move_grade}>
                  <Grid>
                    <Col size={2} style={layout.alignCenter}>
                      <Image source={require('./images/icons/sword.png')} style={styles.icon} />          
                      <Text>Attack </Text>
                      <Grade grade={mon.attackGrade()} />
                    </Col>
                    <Col size={2} style={multipleStyles(layout.alignCenter, styles.defence)}>
                      <Image source={require('./images/icons/shield.png')} style={styles.icon} />          
                      <Text style={styles.defence_text}>Defence</Text>
                      <Grade grade={mon.defenseGrade()} />
                    </Col>
                    <Col size={1} style={layout.alignRight}>
                        <TouchableHighlight>
                          <View><Icon name='info-circle' style={{fontSize: 18}} /></View>
                        </TouchableHighlight>
                    </Col>
                  </Grid>
                </ListItem>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>BATTLE</Text>
                </View>
                <ListItem >
                  <View>
                    <Text style={styles.header4}>STRONG AGAINST</Text>
                    <View style={styles.many_types}>
                      {mon.specie().strongAgainst().map(type=><MonTypeBadge key={type.id} pokemonType={type} />)}
                    </View>
                  </View>
                </ListItem>
                <ListItem >
                  <View >
                    <Text style={styles.header4}>RESISTANT TO</Text>
                    <View style={styles.many_types}>
                      {mon.specie().resistantTo().map(type=><MonTypeBadge key={type.id} pokemonType={type} />)}
                    </View>
                  </View>
                </ListItem>
              </List>
            </Image>
          </Content>
        </Container>
        <View style={styles.floating_footer}>
          <Button  theme={myTheme} rounded info onPress={goBack} style={styles.floating_btn}>
          <Icon name='close' /></Button>
        </View>
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

  header: {
    flex:1,
    flexDirection:'row',
    backgroundColor: '#f3f3f3',
    borderColor:'#dddddd',
    borderTopWidth:1,
    borderBottomWidth:1,
    padding: 10,
    justifyContent:'space-between',
  },
  headerTitle: {
    color: '#666666',
    fontSize:13,
    letterSpacing: 3,
    fontWeight:'bold',
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

  icon: {
    width:16,
    height:16,
    marginRight:5,
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

  square_badge: {
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

  many_types: { flexWrap:'wrap', flexDirection:'row', marginLeft:-3, },

  floating_footer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'transparent',
    position:'absolute',
    bottom:0, left:0, right:0,
  },
  floating_btn: {
    backgroundColor:'#1d8696',
    borderColor: '#ffffff',
    borderWidth:1,
    alignSelf:'center',
    marginBottom:15,
    shadowColor: "#000000",
    shadowOpacity: 0.7,
    shadowRadius: 6,
    shadowOffset: {
      height: 3,
      width: 0
    }
  },

  header4: {
    fontSize:12,
    fontWeight:'bold',
    color:'#1d484d',
    marginBottom:2,
  },

});

const mapStateToProps = ({selectedMon}) => ({
  mon: selectedMon,
  quick: selectedMon.quickMove(), //use quick and charge so that component will re-render, when these change
  charge: selectedMon.chargeMove()
})
const mapDispatchToProps = dispatch=> ({
  goBack: ()=>{
    Actions.pop()
  }
})

MonDetails = connect(mapStateToProps,mapDispatchToProps)(MonDetails)

module.exports = MonDetails;
