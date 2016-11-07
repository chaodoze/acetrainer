import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash'
import {
  AsyncStorage,
  StyleSheet,
  Image,
  TextInput,
  Dimensions,
  View
} from 'react-native';
import {Actions} from 'react-native-router-flux'

import {PokemonImager} from 'NativeModules'
import {PokemonSpecie} from '../db/pogo'
import {monLevelRaised} from '../actions'

import {
  List, ListItem, Text, Thumbnail, Input, Icon, Button } from 'native-base';
import {updateMon} from '../db/'
import TrainerLevel from './TrainerLevel'
import myTheme from './Themes/myTheme';
import layout from './Styles';


const window = Dimensions.get('window')
const imageDimensions = {
  height: window.height,
  width: window.width
}

class EditStats extends Component {
  constructor(props) {
    super(props)
    const {mon} = this.props
    this.chooseSpecie = this.chooseSpecie.bind(this)
    this.changeText = this.changeText.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.state = {specieText:mon.Name, specieFocus:false, specie:mon.specie(), cp:mon.CP, hp:mon.HP}
  }
  changeTrainerLevel(newLevel) {
    console.log('changeTrainerLevel', newLevel)
    const {mon, trainerLevel, onTrainerLevelChanged} = this.props
    const localIdentifier = mon.url.replace('ph://', '')
    PokemonImager.scanOne(newLevel, localIdentifier)
    if (onTrainerLevelChanged && newLevel > mon.trainerLvl()) {
      onTrainerLevelChanged(newLevel)
    }
  }
  renderSuggestions() {
    const {specieText, specieFocus, specie} = this.state
    if (!specie && specieFocus && specieText && specieText.length > 0) {
      return (
        <ListItem style={styles.suggestMon} >
          <Suggestions text={this.state.specieText} onPress={this.chooseSpecie}/>
        </ListItem>
      )
    }
    return false
  }
  changeText(newText) {
    const newState = {specieText:newText}
    const {specie} = this.state
    if (specie && specie.displayName != newText) {
      newState.specie = null
    }
    this.setState(newState)
  }
  chooseSpecie(specie) {
    console.log('specie chosen', specie.displayName)
    this.setState({specie, specieText:specie.displayName})
  }
  onSubmit() {
    const {mon} = this.props
    const {specie, hp, cp} = this.state
    if (!specie) {
      return console.error('Pokemon specie not found!')
    }
    mon.pokemon_number = specie.id
    mon.HP = hp
    mon.CP = cp
    mon.ivCandidates = null
    mon.calcIVPossibilities()
    console.log('onSubmit', mon.isKnown(), mon.HP, mon.CP, mon)
    if (mon.isKnown()) {
      updateMon(mon)
      Actions.pop()
    }
    else {
      console.error('onSubmit', mon.isKnown(), mon.HP, mon.CP, mon)
    }
  }

  render() {
    const {mon, goBack} = this.props
    const {specieText, hp, cp} = this.state
    return (
      <View style={{flex: 1}}>
      <View>
        <Image style={[imageDimensions, {position: 'absolute'}]} source={{uri:mon.url}} />
      </View>
      <View style={styles.editOverlay}>
        <View style={styles.trash}>
          <Button  theme={myTheme} transparent>
            <Icon name='trash' style={{color:'#ffffff'}}/>
          </Button>
        </View>
        <View>
          <List theme={myTheme}>
            <ListItem style={[styles.firstItem, layout.alignLeft, styles.noBorder]}>
              <View style={{flex:2}}>
                <Text style={styles.header5}>Pokémon Species</Text>
                <TextInput style={styles.editMonInput}
                  onChangeText={this.changeText}
                  onFocus={()=>this.setState({specieFocus:true})}
                  onBlur={()=>this.setState({specieFocus:false})}
                  value={this.state.specieText} />
              </View>
              <View style={{flex:1}}>
                <Text style={styles.header5}>CP</Text>
                <TextInput style={styles.editMonInput} value={cp} onChangeText={val=>{this.setState({cp:val})}} keyboardType="numeric" />
              </View>
              <View style={{flex:1}}>
                <Text style={styles.header5}>HP</Text>
                <TextInput style={styles.editMonInput} value={hp} onChangeText={val=>this.setState({hp:val})}   keyboardType="numeric" />
              </View>
            </ListItem>
            {this.renderSuggestions()}
            <ListItem style={[layout.alignRight, styles.noBorder]}>
              <TrainerLevel level={mon.trainerLvl()} onLevelChange={(level)=>this.changeTrainerLevel(level)}/>
              <View style={layout.alignRight}>
                <Button onPress={this.onSubmit} small  style={styles.button}>Update</Button>
                <Button onPress={goBack} small bordered info style={styles.button}>Cancel</Button>
              </View>
            </ListItem>
          </List>
          <View style={styles.errorAlert}><Text style={styles.errorLabel}>We can't figure out the specie, can you select manually?</Text></View>
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
    fontWeight:'bold', fontSize:13, color:'#ffffff',
  },

  errorLabel: {
    color:'#ff0000', fontWeight:'bold',
  },
  errorInput: {
    borderColor:"#ff0000",
  },

  errorAlert: {
    position:'absolute', top:63, left:17,
  },
  editMonInput: {
    height: 30, borderColor: 'gray', borderWidth: 1, borderRadius:4, padding:3,
    color:'#ffffff', marginRight:5
  },
  levelInput: {
    width:170,
  },
  trash: {
    position:'absolute', top:20, right:10,
  },
  firstItem: {
    marginTop:80, borderColor:'transparent'
  },
  noBorder: {
    borderColor:'transparent'
  },
  button: {
    marginRight:5,
    marginTop:16
  },

  suggestMon: {
    borderColor:'transparent', marginRight:5,
    marginTop:-14
  },

  suggestMonList: {
    borderColor:'#999999',
    marginLeft:0,
  },

});

const getSuggestions = text=>{
  let species = PokemonSpecie.suggestByName(text)
  species = _.sortBy(species, specie=>specie.displayName.toLowerCase().indexOf(text.toLowerCase()))
  return species.map(specie=>({uri:specie.iconUrl(), text:specie.displayName, obj:specie}))
}

const Suggestion = ({uri, text, obj, onPress})=>(
  <ListItem style={styles.suggestMonList} onPress={()=>onPress(obj)}>
    <Thumbnail source={{uri:uri}} />
    <Text>{text}</Text>
  </ListItem>
)

const Suggestions = ({text, onPress})=>{
  suggestions = getSuggestions(text)
  return (
    <List style={{backgroundColor:'rgba(255,255,255,0.6)'}}>
      {suggestions.map(({uri,text,obj})=><Suggestion key={text} uri={uri} text={text} obj={obj} onPress={onPress}/>)}
    </List>
  )
}

const mapStateToProps = ({selectedMon}) => ({
  mon: selectedMon,
})
const mapDispatchToProps = dispatch=> ({
  goBack: _.once(()=>{
    Actions.pop()
  }),
  onTrainerLevelChanged: (newLvl)=>{
    dispatch(monLevelRaised(level))
  }
})

EditStats = connect(mapStateToProps,mapDispatchToProps)(EditStats)

module.exports = EditStats;
