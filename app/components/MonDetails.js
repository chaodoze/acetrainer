import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Image,
  ScrollView,
  TextInput,TouchableHighlight,
  Modal,
  View,
  Picker,
  Dimensions
} from 'react-native';
import {
  Container, Content, List, ListItem, Text, InputGroup,
  Input, Icon, Badge, Button } from 'native-base';
import {Actions} from 'react-native-router-flux';
import { Col, Row, Grid } from "react-native-easy-grid";
import PercentageCircle from 'react-native-percentage-circle';
import multipleStyles from 'react-native-multiple-styles';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {PokemonImager} from 'NativeModules'
import Move from './Move';
import MonTypeBadge from './MonTypeBadge';
import Grade from './Grade'
import TrainerLevel from './TrainerLevel'
import EditStats from './EditStats'
import myTheme from './Themes/myTheme';
import layout from './Styles';

const PARALLAX_HEADER_HEIGHT = 250;
const STICKY_HEADER_HEIGHT = 70;
const window = Dimensions.get('window');
import {updateMon} from '../db/index'

class MonDetails extends Component {
  changeTrainerLevel(newLevel) {
    console.log('changeTrainerLevel', newLevel)
    const {mon} = this.props
    const localIdentifier = mon.url.replace('ph://', '')
    PokemonImager.scanOne(newLevel, localIdentifier)
  }
 
  render() {
    const {mon, goBack} = this.props
    console.log('render mon details')
    return (
      <ParallaxScrollView
        stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
        parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
        style={styles.parallelContainer}
        renderBackground={() =>
          <View key="background">
          <Image source={{uri:mon.url}} style={{width: window.width, height: window.height}} />
          <View
            style={{position: 'absolute', top: 0, width: window.width, backgroundColor: 'rgba(0,0,0,.7)',height: PARALLAX_HEADER_HEIGHT}}/>
          </View>
        }
        renderStickyHeader={() => (
          <View key="sticky-header" style={styles.stickySection}>
            <Text style={styles.stickySectionText}>{mon.Name}</Text>
          </View>
        )}
        renderFixedHeader={() =>
          <View key="fixed-header" style={styles.fixedSection}>
            <Button  theme={myTheme} transparent onPress={goBack}>
              <Icon name='close' style={{color:'#ffffff'}}/>
            </Button>
          </View>
        }

        renderForeground={() => (
          <View key="parallax-header" style={ styles.parallaxHeader }>
            <Text style={ styles.sectionMonText }>
              {mon.Name}
            </Text>
            <View style={layout.alignCenter}>{mon.specie().types().map(type=><MonTypeBadge key={type.id} pokemonType={type} />)}</View>
          </View>
        )}>

        <List>
          <TrainerLevel level={mon.trainerLevel} onLevelChange={(level)=>this.changeTrainerLevel(level)}/>
          <ListItem style={styles.mon_data}>
          <Grid style={layout.alignCenter}>
            <Col size={2} style={layout.alignLeft}><Text> CP: {mon.CP} </Text></Col>
            <Col size={2}><Text>HP: {mon.HP}</Text></Col>
            <Col size={2}><Text>Level: 21</Text></Col>
            <Col size={2}><Text>IV: {mon.ivRangeStr()}</Text></Col>
            <Col size={1}>
              <PercentageCircle radius={20} percent={mon.avgIVPercent()} borderWidth={5} color={"#3498db"}></PercentageCircle>
            </Col>
            <Col><EditStats /></Col>
          </Grid>
          </ListItem>
        </List>
        <View style={styles.list_header}>
            <Text style={styles.list_headerTitle}>MOVESETS</Text>
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
                  <View><Icon theme={myTheme} name='info-circle' style={{fontSize: 18}} /></View>
                </TouchableHighlight>
              </Col>
            </Grid>
          </ListItem>
          <View style={styles.list_header}>
            <Text style={styles.list_headerTitle}>BATTLE</Text>
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
      </ParallaxScrollView>
    );
  }
}

var styles = StyleSheet.create({

  parallelContainer: {
    flex: 1,
    backgroundColor: 'black'
  },

  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    width: 300,
    justifyContent: 'flex-end'
  },
  stickySectionText: {
    color: 'white',
    fontSize: 20,
    margin: 10
  },
  fixedSection: {
    position: 'absolute',
    bottom: 10,
    right: 10
  },
  fixedSectionText: {
    color: '#999',
    fontSize: 20
  },
  parallaxHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 100
  },

  sectionMonText: {
    color: 'white',
    fontSize: 24,
    paddingVertical: 5
  },
  sectionTitleText: {
    color: 'white',
    fontSize: 18,
    paddingVertical: 5
  },


  list_header: {
    flex:1,
    flexDirection:'row',
    backgroundColor: '#f3f3f3',
    borderColor:'#dddddd',
    borderTopWidth:1,
    borderBottomWidth:1,
    padding: 10,
    justifyContent:'space-between',
  },
  list_headerTitle: {
    color: '#666666',
    fontSize:13,
    letterSpacing: 3,
    fontWeight:'bold',
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
    padding:5, borderBottomWidth:0,
  },

  stats: { fontWeight:'bold'},
  level: { color:'#1780fb', fontSize:13 },

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

  linkcolor: {
    color:'#1d8696',
  }

});

const mapStateToProps = ({selectedMon}) => ({
  mon: selectedMon,
  quick: selectedMon.quickMove(), //use quick and charge so that component will re-render, when these change
  charge: selectedMon.chargeMove(),
  trainerLevel: selectedMon.trainerLevel,
})
const mapDispatchToProps = dispatch=> ({
  goBack: ()=>{
    Actions.pop()
  }
})

MonDetails = connect(mapStateToProps,mapDispatchToProps)(MonDetails)

module.exports = MonDetails;
