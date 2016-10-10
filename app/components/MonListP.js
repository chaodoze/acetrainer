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
import {MonList} from './MonList'
import {PokemonImager} from 'NativeModules'
import Pokemon from '../db/pokemon'
const trainerLevel = 28

class MonListP extends Component {
  constructor(props) {
    super(props);
    this.state = {
        status: 'checking'
    };
  }
  reactToAppStates() {
    AppState.addEventListener('change', appState=>{
      if (appState == 'inactive') {
        AsyncStorage.setItem('MonListP:inactive', ''+Date.now())
      }
      else if (appState == 'active') {
        AsyncStorage.getItem('MonListP:inactive').then( lastScan=>{
          lastScan = parseInt(lastScan,10)
          if (lastScan) {
            console.log('reactivated from', new Date(lastScan))
            PokemonImager.scan(trainerLevel, lastScan)
          }
        })
      }
    })
  }
  componentDidMount() {
    Permissions.getPermissionStatus('photo').then((r)=>console.log('photo perm', r))
    Permissions.requestPermission('photo').then(response=>{
      console.log('request perm', response)
      if (response == 'authorized') {
        console.log('got perm',response)
        PokemonImager.scan(trainerLevel, moment().subtract(20, 'days').unix()*1000)
        this.reactToAppStates()
        this.setState({status:'good'})
      }
      else {
        this.setState({status:'unauthorized'})
      }
    })
    this.pokeSubscription = NativeAppEventEmitter.addListener('Pokemon', (stats)=>{
      console.log('stats', stats)
      Pokemon.addFromScan(stats)
    })
  }

  render() {
    const status = this.state.status
    if (status == 'checking') {
      return (<Text>checking permissions</Text>)
    }
    else if (status=='unauthorized') {
      return (<Text>Sorry, we don't have permission to access your photos</Text>)
    }
    const {mons} = this.props
    return <MonList mons={mons} />
  }
}
const mapStateToProps = ({mons}) => {
  mons = _.values(mons)
  return {
    mons
  }
}

MonListP = connect(mapStateToProps)(MonListP)

export default MonListP
