import * as _ from 'lodash-es'
import React, { Component, PropTypes } from 'react';
import {
  Text,
  AppState,
  NativeAppEventEmitter,
} from 'react-native';
import { connect } from 'react-redux';
import {MonList} from './MonList'
import * as db from '../db'

class MonListP extends Component {
  componentDidMount() {
    this.pokeSubscription = NativeAppEventEmitter.addListener('Pokemon', (stats)=>{
      console.log('stats', stats)
      db.addMon(stats)
    })
    AppState.addEventListener('change', appState=>console.log('new app state', appState))
  }
  render() {
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
