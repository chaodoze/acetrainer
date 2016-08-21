import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';
// import crypto from 'crypto'
// import pogobuf from 'pogobuf'
import GoogleAuth from './GoogleAuth'

const clientId = '848232511240-73ri3t7plvk96pj4f85uj8otdat2alem.apps.googleusercontent.com'
const receiveCode = code => {
    console.log('PogoGoogleAuth got code', code)
}

class PogoGoogleAuth extends Component {
  render() {
    return <GoogleAuth onCode={receiveCode} clientId={clientId} />
  }
}

export default PogoGoogleAuth
