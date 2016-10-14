import React, { Component } from 'react';
import {connect, Provider} from 'react-redux'
import {Router, Scene} from 'react-native-router-flux'
import configureStore from '../store/configureStore'
import * as db from '../db'
import Mons from './Mons'
import MonDetails from './MonDetails'

const RouterWithRedux = connect()(Router)
const store = configureStore()
db.init(store.dispatch)

export default function App() {
  return (
    <Provider store={store}>
      <RouterWithRedux>
        <Scene key="root" hideNavBar={true}>
          <Scene key="mons" component={Mons} title="Mons" initial={true} />
          <Scene key="mondetails" component={MonDetails} title="Monster Info" />
        </Scene>
      </RouterWithRedux>
    </Provider>
  )
}
