import moment from 'moment'
import * as _ from 'lodash-es'
import React, { Component, PropTypes } from 'react';
import {
  Text,
  AppState,
  AsyncStorage,
  NativeAppEventEmitter,
} from 'react-native';
import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux'

import {MonList} from './MonList'
import {PokemonImager} from 'NativeModules'
import Pokemon from '../db/pokemon'
import {selectMon} from '../actions'

class MonListP extends Component {
  scanForScreenshots() {
    let {trainerLevel} = this.props
    trainerLevel = parseInt(trainerLevel, 10)
    AsyncStorage.getItem('MonListP:lastScan').then( lastScan=>{
      console.log('scanForScreenshots', lastScan)
      lastScan = parseInt(lastScan,10) || moment().subtract(20, 'days').unix()*1000
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
    this.reactToAppStates()
    this.scanForScreenshots()

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
    const {mons, unknowns, onMonClick, onUnknownClick, onDeleteUnknowns, onOpenDrawer} = this.props
    return <MonList mons={mons} unknowns={unknowns} onMonClick={onMonClick} onUnknownClick={onUnknownClick} onDeleteUnknowns={onDeleteUnknowns} onOpenDrawer={onOpenDrawer}/>
  }
}

const mapStateToProps = ({mons, trainerLevel}, ownProps) => {
  [mons, unknowns] = _.partition(_.values(mons), (mon)=>mon.isKnown())
  const onDeleteUnknowns = ()=>{
    unknowns.forEach(unknown=>unknown.destroy())
  }
  return {
    mons,
    trainerLevel,
    unknowns,
    onDeleteUnknowns,
  }
}

const mapDispatchToProps = (dispatch, ownProps)=> ({
  onMonClick: (mon)=>{
    dispatch(selectMon(mon))
    Actions.mondetails()
  },
  onUnknownClick: mon=>{
    dispatch(selectMon(mon))
    Actions.editunknownstats()
  },
})

MonListP = connect(mapStateToProps, mapDispatchToProps)(MonListP)

export default MonListP
