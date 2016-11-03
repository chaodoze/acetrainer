import moment from 'moment'
import * as _ from 'lodash-es'
import React, { Component, PropTypes } from 'react';
import {
  Text,
  AppState,
  AsyncStorage,
  NativeAppEventEmitter,
} from 'react-native';
const Permissions = require('react-native-permissions')
import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux'
import {MonList} from './MonList'
import {PokemonImager} from 'NativeModules'
import Pokemon from '../db/pokemon'
import {selectMon} from '../actions'

class MonListP extends Component {
  constructor(props) {
    super(props);
    this.state = {
        status: 'checking'
    };
    console.log('Trainer Level: ', this.props.trainerLevel)
  }
  scanForScreenshots() {
    let {trainerLevel} = this.props
    trainerLevel = parseInt(trainerLevel, 10)
    AsyncStorage.getItem('MonListP:lastScan').then( lastScan=>{
      lastScan = parseInt(lastScan,10) || moment().subtract(20, 'days').unix()*1000
      console.log('reactivated from', new Date(lastScan))
      PokemonImager.scan(trainerLevel, lastScan)
      AsyncStorage.setItem('MonListP:lastScan', ''+Date.now())
    })
  }

  reactToAppStates() {
    AppState.addEventListener('change', appState=>{
      if (appState == 'inactive') {
        AsyncStorage.setItem('MonListP:lastScan', ''+Date.now())
      }
      else if (appState == 'active') {
        this.scanForScreenshots()
      }
    })
  }
  componentDidMount() {
    Permissions.getPermissionStatus('photo').then((r)=>console.log('photo perm', r))
    Permissions.requestPermission('photo').then(response=>{
      console.log('request perm', response)
      if (response == 'authorized') {
        console.log('got perm',response)
        this.reactToAppStates()
        this.setState({status:'good'})
        this.scanForScreenshots()
      }
      else {
        this.setState({status:'unauthorized'})
      }
    })
    this.pokeSubscription = NativeAppEventEmitter.addListener('Pokemon', (stats)=>{
      console.log('new stats', stats)
      const {mons} = this.props
      const alreadyInDb = mons.find(mon=>mon.url == stats.url)
      if (alreadyInDb) {
        alreadyInDb.update(stats)
      }
      else {
        Pokemon.addFromScan(stats)
      }
    })
  }

  render() {
    const {status} = this.state
    if (status == 'checking') {
      return (<Text>checking permissions</Text>)
    }
    else if (status=='unauthorized') {
      return (<Text>Sorry, we don't have permission to access your photos</Text>)
    }
    const {mons, unknowns, onMonClick} = this.props
    console.log('unknowns', unknowns)
    return <MonList mons={mons} unknowns={unknowns} onMonClick={onMonClick}/>
  }
}

const mapStateToProps = ({mons, trainerLevel}) => {
  [mons, unknowns] = _.partition(_.values(mons), (mon)=>mon.isKnown())
  return {
    mons,
    trainerLevel,
    unknowns,
  }
}

const mapDispatchToProps = dispatch=> ({
  onMonClick: (mon)=>{
    dispatch(selectMon(mon))
    Actions.mondetails()
  }
})

MonListP = connect(mapStateToProps, mapDispatchToProps)(MonListP)

export default MonListP
