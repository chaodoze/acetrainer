/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import FCM from 'react-native-fcm';

class LoginDetails extends Component {
  componentDidMount() {
     this._setupGoogleSignin();
     FCM.requestPermissions(); // for iOS
     FCM.getFCMToken().then(token => {
       console.log('token', token)
       // store fcm token in your server
     });
     this.notificationUnsubscribe = FCM.on('notification', (notif) => {
       // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
     });
     this.refreshUnsubscribe = FCM.on('refreshToken', (token) => {
       console.log(token)
       // fcm token may not be available on first load, catch it here
     });

     FCM.subscribeToTopic('/topics/foo-bar');
   }

   componentWillUnmount() {
     // prevent leaking
     this.refreshUnsubscribe();
     this.notificationUnsubscribe();
   }

   async _setupGoogleSignin() {
     try {
       await GoogleSignin.hasPlayServices({ autoResolve: true });
       await GoogleSignin.configure({
         // scopes: ["https://www.googleapis.com/auth/drive.readonly"],
         iosClientId: '330376946588-mc8t12s6r5koj4selosv9u7u7gfhus9e.apps.googleusercontent.com',
         webClientId: '330376946588-mc8t12s6r5koj4selosv9u7u7gfhus9e.apps.googleusercontent.com',
         offlineAccess: false
       });

       const user = await GoogleSignin.currentUserAsync();
       console.log('init', user);
     }
     catch(err) {
       console.log("Google signin error", err.code, err.message);
     }
   }

  _signIn() {
    GoogleSignin.signIn()
    .then((user) => {
      console.log('signed in',user);
    })
    .catch((err) => {
      console.log('WRONG SIGNIN', err);
    })
    .done();
  }

  _signOut() {
    GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut()).then(() => {
      this.setState({user: null});
      console.log('signed out')
    })
    .done();
  }

  render() {
    return (
      <View style={styles.container}>
        <GoogleSigninButton
          style={{width: 312, height: 48}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={this._signIn.bind(this)}/>
        <TouchableOpacity onPress={() => {this._signOut(); }}>
          <View style={{marginTop: 50}}>
            <Text style={styles.container}>Log out</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  buttonText: {
  fontSize: 18,
  color: 'white',
  alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});

module.exports = LoginDetails;