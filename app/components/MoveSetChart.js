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
import myTheme from './Themes/myTheme';
import layout from './Styles';
import Grade from './Grade'
import {PokemonSpecie, PokemonMove} from '../db/pogo.js'

export default class MoveSetChart extends Component {
  constructor(props) {
    super(props);
    this.state = {modalVisible: false};
  }

  openModal() {
    this.setState({modalVisible: true});
  }

  closeModal() {
    this.setState({modalVisible: false});
  }

  renderChartFor(type) {
    const {quick, charge, specie} = this.props
    const movesets = specie[`${type}Movesets`]()
    const bestRank = movesets[0].rank
    const rankPercent = rank=>Math.round(100*rank/bestRank)
    const isCurrentMoveset = moveset=>moveset.quick==quick.displayName && moveset.charge == charge.displayName

    return (
      <List>
        {movesets.map(moveset=>{
          return (
            <ListItem key={`${moveset.quick}-${moveset.charge}`} style={[styles.movesetList, layout.alignLeft, isCurrentMoveset(moveset) && styles.yourmove]}>
              <View style={{flex:3}}><Text style={styles.cell}>{moveset.quick} / {moveset.charge}</Text></View>
              <View style={[layout.alignRight, {flex:1}]}>
                <Text style={styles.cell}>{rankPercent(moveset.rank)}%</Text>
              </View>
              <View style={[layout.alignRight, {flex:1}]}>
                <Grade rank={rankPercent(moveset.rank)/100} />
              </View>
            </ListItem>
          )}
        )}
      </List>
    )
  }
  renderModal() {
    const {modalVisible} = this.state
    if (modalVisible) {

      return (
      <Modal
        animationType={"slide"}
        transparent={true}
        >
        <View style={layout.modal_outer}>
          <View style={layout.modal_inner}>
            <View>
              <View style={layout.choice_title}>
                <View style={{flexDirection:'row', justifyContent:'center'}}>
                  <Text style={layout.choice_title_text}>MOVESET GRADE</Text>
                  <Text style={{fontSize:10}}>by Pokémon Go Info</Text>
                </View>
                <Button style={layout.fixedClose} theme={myTheme} transparent small onPress={() => {this.closeModal()}}>
                  <Icon name='close' style={{color:'#333333'}}/>
                </Button>
              </View>
              <View style={layout.modal_list_header}>
                <Image source={require('./images/icons/sword.png')} style={layout.icon} />
                <Text>Attack</Text>
              </View>
              {this.renderChartFor('attack')}
              <View style={layout.modal_list_header}>
                <Image source={require('./images/icons/shield.png')} style={layout.icon} />
                <Text>Defense</Text>
              </View>
              {this.renderChartFor('defense')}
            </View>
          </View>
        </View>
      </Modal>
    )}
  }
  render() {
    return (
      <View>
        <TouchableHighlight onPress={() => {this.openModal()}}>
          <View><Icon theme={myTheme} name='info-circle' style={{fontSize: 18, color:'#1780fb'}} /></View>
        </TouchableHighlight>
        {this.renderModal()}
      </View>
    )
  }
}

MoveSetChart.propTypes = {
  quick: React.PropTypes.instanceOf(PokemonMove).isRequired,
  charge: React.PropTypes.instanceOf(PokemonMove).isRequired,
  specie: React.PropTypes.instanceOf(PokemonSpecie).isRequired,
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

  movesetList:{
    marginLeft:-10, marginRight:-10, paddingLeft:20, paddingRight:20, height:42
  },

  yourmove: {
    backgroundColor:'#fcf8e3', 
  },

});
