import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  AsyncStorage,
  StyleSheet,
  TouchableHighlight,
  TextInput,
  View
} from 'react-native';

import { Input, Text, Button } from 'native-base';
import {Actions} from 'react-native-router-flux'
import LevelPicker from './LevelPicker'
import {setTrainerLevel} from '../actions'

class Intro extends Component {
  constructor(props) {
    super(props)
    const {onProceed} = this.props
    this.onPress = this.onPress.bind(this)
    this.onLevelChange = this.onLevelChange.bind(this)
    this.state = {}
    AsyncStorage.getItem('TrainerLevel').then(lvl=>{
      if (lvl) {
        onProceed(parseInt(lvl,10))
      }
      else {
        this.setState({gotTrainerLevel:true})
      }
    })
  }
  onLevelChange(lvl) {
    this.setState({chosenLevel:lvl, showErr:false})
  }
  onPress() {
    const {onProceed} = this.props
    const {chosenLevel} = this.state
    if (!chosenLevel) {return this.setState({showErr:true})}
    AsyncStorage.setItem('TrainerLevel', JSON.stringify(chosenLevel))
    onProceed(chosenLevel)
  }
  render() {
    let {showErr, gotTrainerLevel} = this.state
    if (!gotTrainerLevel && !this.props.uid) {return <Text>Loading...</Text>}
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

Intro = connect(null, mapDispatchToProps)(Intro)

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
