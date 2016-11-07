import React, { Component } from 'react';
import {connect, Provider} from 'react-redux'
import {Router, Scene} from 'react-native-router-flux'
import configureStore from '../store/configureStore'
import * as db from '../db'
import Mons from './Mons'
import MonDetails from './MonDetails'
import Intro from './Intro'
import EditStats from './EditStats'
import MyDrawer from './MyDrawer'
import Credits from './Credits'

const RouterWithRedux = connect()(Router)
const store = configureStore()
db.init(store.dispatch)

export default function App() {
  return (
    <Provider store={store}>
      <RouterWithRedux>
        <Scene key="root" hideNavBar={true}>
          <Scene key="intro" component={Intro} title="Intro" initial={true} />
          <Scene key="mondetails" component={MonDetails} title="Monster Info" />
          <Scene key="mydrawer" component={MyDrawer} title="MyDrawer"/>
          <Scene key="editstats" component={EditStats} title="Edit Mon Stats" />
          <Scene key="credits" component={Credits} title="Credits" />
        </Scene>
      </RouterWithRedux>
    </Provider>
  )
}
