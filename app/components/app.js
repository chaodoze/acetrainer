import React, {Component} from 'react'
import {Provider} from 'react-redux'
import configureStore from '../store/configureStore'
import * as db from '../db'
import Mons from './Mons'
import DeviceInfo from 'react-native-device-info'

const store = configureStore()
db.init(store.dispatch)
console.log('device info', DeviceInfo.getUniqueID())

export default function App() {
  return (
    <Provider store={store}>
      <Mons />
    </Provider>
  )
}
