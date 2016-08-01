import React, {Component} from 'react'
import {Text} from 'react-native'
import {applyMiddleware, createStore} from 'redux'
import {Provider} from 'react-redux'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'

const logger = createLogger()
const createStoreWithMiddleware = applyMiddleware(logger)(createStore)
const store = createStoreWithMiddleware(rootReducer)

import firebase from 'firebase'
const config = {
  apiKey: "AIzaSyBWvVTIVhdCARWTPEAipe5TjkWCguDZjvg",
  authDomain: "acetrainer-ce9c9.firebaseapp.com",
  databaseURL: "https://acetrainer-ce9c9.firebaseio.com",
  storageBucket: "acetrainer-ce9c9.appspot.com",
}
firebase.initializeApp(config);

export default function Wrapper() {
  return (
    <Provider store={store}>
      <Text>Hello wrapper</Text>
    </Provider>
  )
}
