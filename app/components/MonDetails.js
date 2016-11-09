import _ from 'lodash'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  AsyncStorage,
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
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {PokemonImager} from 'NativeModules'
import {setTrainerLevel} from '../actions'
import Move from './Move';
import MonTypeBadge from './MonTypeBadge';
import Grade from './Grade'
import TrainerLevel from './TrainerLevel'
import EditStats from './EditStats'
import MoveSetChart from './MoveSetChart'
import CPChart from './CPChart'
import myTheme from './Themes/myTheme';
import layout from './Styles';

const PARALLAX_HEADER_HEIGHT = 250;
const STICKY_HEADER_HEIGHT = 70;
const window = Dimensions.get('window');
import {updateMon} from '../db/index'

class MonDetails extends Component {
  changeTrainerLevel(newLevel) {
    console.log('changeTrainerLevel', newLevel)
    const {mon, trainerLevel, onTrainerLevelChanged} = this.props
    const localIdentifier = mon.url.replace('ph://', '')
    PokemonImager.scanOne(newLevel, localIdentifier)
    if (onTrainerLevelChanged && newLevel > trainerLevel) {
      onTrainerLevelChanged(newLevel)
    }
  }

  renderMovesetChart(mon) {
    const [quick, charge] = [mon.quickMove(), mon.chargeMove()]
    if (quick && charge) {
      return (
        <MoveSetChart specie={mon.specie()} quick={mon.quickMove()} charge={mon.chargeMove()}/>
      )
    }
  }

  render() {
    const {mon, goBack, trainerLevel} = this.props
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
          <View style={styles.header}>
            <View><Text style={styles.headerTitle}>STATS</Text></View>
            <TrainerLevel  style={styles.levelLink} level={trainerLevel} onLevelChange={(level)=>this.changeTrainerLevel(level)}/>
          </View>
          <ListItem style={styles.mon_data} theme={myTheme}>
              <View style={{justifyContent:'space-between', alignItems: 'center',flexDirection:'row'}} >
                <View style={{justifyContent:'flex-start', alignItems: 'center',flexDirection:'row'}}>
                <Text style={styles.mon_stat}>CP</Text>
                <Text style={styles.mon_stat_value}>{mon.CP}</Text>
                <Text style={styles.mon_stat}>HP</Text>
                <Text style={styles.mon_stat_value}>{mon.HP}</Text>
                <Text style={styles.mon_stat}>Level</Text>
                <Text style={styles.mon_stat_value}>{mon.level}</Text>
                <Text style={styles.mon_stat}>IV</Text>
                <Text style={styles.mon_stat_value}>{mon.ivRangeStr()}</Text>
                <View style={{width:30, height:30}}>
                  <PercentageCircle radius={15} textStyle={{fontSize: 9}} percent={mon.avgIVPercent()} borderWidth={3} color={"#3498db"}></PercentageCircle>
                </View>
                </View>
                <View style={{justifyContent:'flex-end'}}>
                <Icon style={{ fontSize:16, color:'#1780fb'}}  name="pencil" />
                </View>
              </View>
          </ListItem>
        </List>
        <View style={layout.list_header}>
            <Text style={layout.list_headerTitle}>MOVESETS</Text>
        </View>
        <List style={styles.mon_analysis}>
          <ListItem>
            <Move mon={mon} type="quick" />
          </ListItem>
          <ListItem>
            <Move mon={mon} type="charge" />
          </ListItem>
          <ListItem style={styles.last_row}>
            <Grid>
              <Col size={2} style={layout.alignCenter}>
                <Image source={require('./images/icons/sword.png')} style={layout.icon} />
                <Text>Attack </Text>
                <Grade rank={mon.attackRank()} />
              </Col>
              <Col size={2} style={[layout.alignCenter, styles.defence]}>
                <Image source={require('./images/icons/shield.png')} style={layout.icon} />
                <Text style={styles.defence_text}>Defence</Text>
                <Grade rank={mon.defenseRank()} />
              </Col>
              <Col size={1} style={layout.alignRight}>
                {this.renderMovesetChart(mon)}
              </Col>
            </Grid>
          </ListItem>
          <View style={layout.list_header}>
            <Text style={layout.list_headerTitle}>BATTLE</Text>
          </View>
          <ListItem style={layout.alignLeft} >
            <Text style={{flex:2, fontWeight:'bold', fontSize:12}}>Good Against</Text>
            <Text style={{flex:2, fontWeight:'bold', fontSize:12}}>Effectiveness</Text>
            <Text style={{flex:3, fontWeight:'bold', fontSize:12}}>Top Tier Mons</Text>
          </ListItem>
          {mon.strongAgainst().map(strength=><StrengthChartItem key={strength.type.displayName} strength={strength} />)}
          <View style={layout.list_header}>
            <Text style={layout.list_headerTitle}>POWER UPS</Text>
          </View>
          <CPChart mon={mon} trainerLevel={trainerLevel} />
        </List>
      </ParallaxScrollView>
    );
  }
}

const StrengthChartItem = ({strength})=>(
  <ListItem style={layout.alignLeft} >
    <View style={{flex:2}}>
      <MonTypeBadge pokemonType={strength.type} />
    </View>
    <View style={{flex:2}}>
      <View style={layout.alignLeft}>
        {_.range(0,strength.attack).map(i=><Image key={`attack${i}`} source={require('./images/icons/sword.png')} style={layout.icon_ef} />)}
        {_.range(0,strength.stab).map(i=><Image key={`stab${i}`} source={require('./images/icons/star.png')} style={layout.icon_ef} />)}
        {_.range(0,strength.defense).map(i=><Image key={`defense${i}`} source={require('./images/icons/shield.png')} style={layout.icon_ef} />)}
      </View>
    </View>
    <View style={{flex:3}}>
      <View style={layout.alignLeft}>
        {strength.type.topTier().map(specie=><Image key={specie.displayName} source={{uri:specie.iconUrl()}} style={layout.icon_mon} />)}
      </View>
    </View>
  </ListItem>
)
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

  mon_name: {
    color:'#ffffff',
    fontSize:28,
    lineHeight:32,
    marginBottom:10,
    fontWeight:'bold',
    textAlign :'center',
  },

  mon_data: {
     borderBottomWidth:0,
  },

  mon_analysis: {
    backgroundColor:'#ffffff',
  },
  last_row: {
     paddingTop:15,
     paddingBottom:15,
     borderBottomWidth:0,
  },

  defence: { opacity:0.3, marginLeft:30},

  many_types: { flexWrap:'wrap', flexDirection:'row', marginLeft:-3, },

  header4: {
    fontSize:12,
    fontWeight:'bold',
    color:'#1d484d',
    marginBottom:2,
  },

  cell: {
    fontSize:13,
  },

  linkcolor: {
    color:'#1780fb',
  },

  mon_stat: {
    fontSize:12,
    marginRight:2,
    color:'#999999',
    fontFamily: 'Roboto',
  },

  mon_stat_value: {
    paddingRight:10,
    fontSize:16,
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
  levelLink: { color:'#1780fb', fontSize:13 },

  type: { marginRight:2, marginBottom:2,},
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
  t_unknown: { backgroundColor:'#cccccc'},

});

const mapStateToProps = ({selectedMon}) => ({
  mon: selectedMon,
  quick: selectedMon.quickMove(), //use quick and charge so that component will re-render, when these change
  charge: selectedMon.chargeMove(),
  trainerLevel: selectedMon.trainerLvl(),
})
const mapDispatchToProps = dispatch=> ({
  goBack: _.once(()=>{
    Actions.pop()
  }),
  onTrainerLevelChanged: (newLvl)=>{
    dispatch(monLevelRaised(level))
  },
})

MonDetails = connect(mapStateToProps,mapDispatchToProps)(MonDetails)

module.exports = MonDetails;
