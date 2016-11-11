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
import {updateMon, deleteMon} from '../db/'
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
    this.state = {specieText:mon.Name, specieFocus:false, specie:mon.specie(), cp:mon.CP, hp:mon.HP, level:mon.level}
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
    this.setState({specie, specieText:specie.displayName, noSpecieErr:false})
  }
  onDeleteMon() {
    console.log('onDeleteMon')
    const {mon} = this.props
    deleteMon(mon)
    Actions.mydrawer({type:'reset'})
  }
  onSubmit() {
    const {mon} = this.props
    const {specie, hp, cp, level} = this.state
    if (!specie) {
      return this.setState({noSpecieErr:true})
    }
    mon.pokemon_number = specie.id
    mon.HP = hp
    mon.CP = cp
    mon.level = level

    mon.ivCandidates = null
    mon.calcIVPossibilities()
    console.log('onSubmit', mon.isKnown(), mon.HP, mon.CP, mon)
    if (mon.isKnown()) {
      updateMon(mon)
      Actions.pop()
    }
    else {
      this.setState({noIVsErr:true})
    }
  }
  renderErrors() {
    const {noSpecieErr, noIVsErr} = this.state
    const specieErr = noSpecieErr && <Text style={styles.errorLabel}>We can't figure out the specie :(</Text>
    const ivErr = noIVsErr && <Text style={styles.errorLabel}>No possible IV from this stats :( If the Arc behind the specie is covered, try tweaking the monster level.</Text>
    return (
      <View style={styles.errorAlert}>
        {ivErr}
        {specieErr}
      </View>
    )
  }

  render() {
    const {mon, goBack} = this.props
    const {specieText, hp, cp, level, noSpecieErr} = this.state
    return (
      <View style={{flex: 1}}>
        <View>
          <Image style={[imageDimensions, {position: 'absolute'}]} source={{uri:mon.url}} />
        </View>
        <View style={styles.editOverlay}>
          <View>
            <View style={styles.editHeader}>
              <View><Text style={styles.headerTitle}>EDIT STATS</Text></View>
              <TrainerLevel style={styles.levelLink} level={mon.trainerLvl()} onLevelChange={(level)=>this.changeTrainerLevel(level)}/>
            </View>
            <List theme={myTheme}>
              <ListItem style={[layout.alignLeft, styles.noBorder]}>
                <View style={{flex:2}}>
                  <Text style={styles.header5}>Pokémon Specie</Text>
                  <TextInput style={[styles.editMonInput, noSpecieErr && styles.errorInput]}
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
                <View style={{flex:1}}>
                  <Text style={styles.header5}>Monster Level</Text>
                  <TextInput style={[styles.editMonInput, styles.levelInput]} value={level}
                    onChangeText={val=>this.setState({level:val})} keyboardType="numeric" />
                </View>
                <View style={layout.alignRight}>
                  <Button onPress={this.onSubmit} small  style={styles.button}>Update</Button>
                  <Button onPress={goBack} small bordered info style={styles.button}>Cancel</Button>
                </View>
              </ListItem>
            </List>
            {this.renderErrors()}
          </View>
        </View>
        <View style={styles.goback}>
          <Button  theme={myTheme} transparent onPress={goBack}>
            <Icon name='chevron-left' style={{color:'#ffffff'}}/>
          </Button>
        </View>
        <View style={{position: 'absolute', left: 0, right: 0, bottom: 10, backgroundColor:'transparent'}}>
          <View style={[layout.alignRight, {marginRight:15}]}>
            <Button small  danger  theme={myTheme} onPress={()=>this.onDeleteMon()} >
              <Icon name='trash' style={{color:'#ffffff'}}/>Delete
            </Button>  
          </View>      
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  editOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)', flex:1
  },

  header5: {
    fontWeight:'bold', fontSize:13, color:'#ffffff',
  },

  errorLabel: {
    color:'#ff0000', fontWeight:'bold', fontSize:13,
  },
  errorInput: {
    borderColor:"#ff0000",
  },

  errorAlert: {
    position:'absolute', top:70, left:15, right:15
  },
  editMonInput: {
    height: 30, borderColor: 'gray', borderWidth: 1, borderRadius:4, padding:3,
    color:'#ffffff', marginRight:5
  },
  levelInput: {
    width:100,
  },
  goback: {
    position:'absolute', top:20, left:10,
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

  editHeader: {
    marginTop:120, flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    paddingLeft:15, paddingRight:15, height:25
  },

  levelLink: { color:'#5bc0de', fontSize:14 },

  headerTitle: { color:'#ffffff', fontWeight:'bold'}

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
    dispatch(monLevelRaised(newLvl))
  },
})

EditStats = connect(mapStateToProps,mapDispatchToProps)(EditStats)

module.exports = EditStats;
