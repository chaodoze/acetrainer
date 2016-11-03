import React, { Component } from 'react'

import {AppRegistry, Text, View, Dimensions, ScrollView, Image, Modal,} from 'react-native'
import { Button } from 'native-base';
import ControlPanel from './ControlPanel'
import MonListP from './MonListP'
import Credits from './Credits'
import Drawer from 'react-native-drawer'

class MyDrawer extends Component {  
  render () {
    return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        type="overlay"
        content={<ControlPanel />}
        tapToClose={true}
        openDrawerOffset={0.5}
        panCloseMask={0.5}
        side="right"
        styles={{
                drawer: {shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 1},
                main: {paddingLeft: 3}
        }}
        tweenHandler={ratio => ({
          main: {
          opacity: 1,
          },
          mainOverlay: {
          opacity: ratio / 2,
          backgroundColor: 'black',
          },
        })}
        >
        <Credits openDrawer={ () => this._drawer.open() } />
      </Drawer>
    )
  }
}

export default MyDrawer;

