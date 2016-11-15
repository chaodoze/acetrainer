import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  AppState,
  AsyncStorage,
  StyleSheet,
  TouchableHighlight,
  TextInput,
  View
} from 'react-native';

import { Input, Text, Button } from 'native-base';
import {Actions} from 'react-native-router-flux'
const Permissions = require('react-native-permissions')

import LevelPicker from './LevelPicker'
import {setTrainerLevel} from '../actions'

class Intro extends Component {
  constructor(props) {
    super(props)
    const {onProceed} = this.props
    this.onPress = this.onPress.bind(this)
    this.onLevelChange = this.onLevelChange.bind(this)
    this.state = {readTrainerLevel:false, photoPermStatus:'checking', showErr:false}
    AsyncStorage.getItem('TrainerLevel').then(lvl=>{
      if (lvl) {
        this.trainerLevel = parseInt(lvl,10)
        this.requestPhotoPerm()
      }
      else {
        this.setState({readTrainerLevel:true})
      }
    })
  }
  onLevelChange(lvl) {
    this.setState({chosenLevel:lvl, showErr:false})
  }
  onPress() {
    const {chosenLevel} = this.state
    if (!chosenLevel) {return this.setState({showErr:true})}
    AsyncStorage.setItem('TrainerLevel', JSON.stringify(chosenLevel))
    this.trainerLevel = chosenLevel
    this.requestPhotoPerm()
  }
  requestPhotoPerm(trainerLevel) {
    const {onProceed} = this.props
    Permissions.requestPermission('photo').then(response=>{
      console.log("photo perm", response)
      if (response == 'authorized') {
        onProceed(this.trainerLevel)
      }
      else {
        this.setState({photoPermStatus: 'unauthorized'})
        this.appStateListener = appState=>{
          if (appState == 'active') {
            Permissions.getPermissionStatus('photo').then(response=>{
              if (response == 'authorized') {
                AppState.removeEventListener('change', this.appStateListener)
                onProceed(this.trainerLevel)
              }
            })
          }
        }
        AppState.addEventListener('change', this.appStateListener)
      }
    })
  }
  renderPhotoPermUnauthorized() {
    return <Text>Need Photo Permissions!</Text>
  }
  render() {
    let {showErr, readTrainerLevel, photoPermStatus} = this.state
    if (photoPermStatus == 'unauthorized') {return this.renderPhotoPermUnauthorized()}
    if (!readTrainerLevel || !this.props.uid) {return <Text>Loading...</Text>}
    showErr = showErr && <Text>Please select your Trainer Level!</Text>
    return (

      <View style={styles.container}>
        <Text style={styles.description}>
          What was (or is) your level at the time you took the screenshots?
        </Text>
        {showErr}
        <LevelPicker initialLevel={10} startLevel={1} onValueChange={this.onLevelChange}  />

        <View >
          <Button onPress={this.onPress} style={{alignSelf:'center', marginTop:20}}>Scan Photos</Button>
        </View>
      </View>

    );
  }
}

const mapStateToProps = ({uid}) => {
  return {uid}
}

const mapDispatchToProps = dispatch=> ({
  onProceed: (level)=>{
    dispatch(setTrainerLevel(level))
    Actions.mydrawer()
  }
})

Intro = connect(mapStateToProps, mapDispatchToProps)(Intro)

const styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 200,
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },

  searchInput: {
    height: 40,
    padding: 4,
    marginRight: 5,
    flex: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    color: '#48BBEC'
  },

});

module.exports = Intro;
