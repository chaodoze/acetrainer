import querystring from 'querystring'
import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';

import WebViewBridge from 'react-native-webview-bridge'


var styles = StyleSheet.create({
  container: {
      flex: 1
  }
});

const injectScript = `
  (function() {
    console.log('hello from web')
    var urlPath = document.URL.split('?')[0]
    if (window.WebViewBridge && urlPath == 'https://accounts.google.com/o/oauth2/approval') {
      WebViewBridge.send(document.title)
    }
  }())
`

class GoogleAuth extends Component {
  constructor(props) {
    super(props)
    const clientId = this.props.clientId
    const scope = this.props.scope || 'openid+email+https:%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email'
    this.authUrl = `https://accounts.google.com/o/oauth2/auth?access_type=offline&client_id=${clientId}&redirect_uri=urn:ietf:wg:oauth:2.0:oob&response_type=code&scope=${scope}`
  }
  onBridgeMessage(message) {
    console.log('got web bridge', message)
    const match = message.match(/^\s*Success\s*(.*)$/)
    if (match) {
      const {code} = querystring.parse(match[1])
      console.log('got code',code)
      if (this.props.onCode) {
        this.props.onCode(code)
      }
    }
  }
  render() {
    return (
      <WebViewBridge source={{uri:this.authUrl}} injectedJavaScript={injectScript}
        onBridgeMessage={this.onBridgeMessage.bind(this)} />
    );
  }
}

export default GoogleAuth
