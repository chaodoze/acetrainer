import React, {Component} from 'react'
import {Text} from 'react-native'
import {Provider} from 'react-redux'
import configureStore from '../store/configureStore'
import * as db from '../db'
import ReminderList from './ReminderList'

const store = configureStore()
db.init(store.dispatch)

export default function App() {
  return (
    <Provider store={store}>
      <ReminderList />
    </Provider>
  )
}
