import moment from 'moment'
import * as _ from 'lodash-es'
import React, { Component, PropTypes } from 'react';
import {
  Text,
  AppState,
  NativeAppEventEmitter,
} from 'react-native';
const Permissions = require('react-native-permissions')
import { connect } from 'react-redux';
import {MonList} from './MonList'
import * as db from '../db'
import {PokemonImager} from 'NativeModules'

class MonListP extends Component {
  constructor(props) {
    super(props);
    this.state = {
        status: 'checking'
    };
  }
  componentDidMount() {
    Permissions.getPermissionStatus('photo').then((r)=>console.log('photo perm', r))
    Permissions.requestPermission('photo').then(response=>{
      console.log('request perm', response)
      if (response == 'authorized') {
        console.log('got perm',response)
        PokemonImager.scan(21, moment().subtract(20, 'days').unix()*1000)
        this.setState({status:'good'})
      }
      else {
        this.setState({status:'unauthorized'})
      }
    })
    this.pokeSubscription = NativeAppEventEmitter.addListener('Pokemon', (stats)=>{
      console.log('stats', stats)
      db.addMon(stats)
    })
    AppState.addEventListener('change', appState=>console.log('new app state', appState))
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
    console.log('status', status, mons.length)
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
