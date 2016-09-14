import React, {Component} from 'react'
import {Provider} from 'react-redux'
import configureStore from '../store/configureStore'
import * as db from '../db'
import MonListP from './MonListP'

const store = configureStore()
db.init(store.dispatch)

export default function App() {
  return (
    <Provider store={store}>
      <MonListP />
    </Provider>
  )
}
