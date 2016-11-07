import firebase from 'firebase'
import DeviceInfo from 'react-native-device-info'
import {AsyncStorage} from 'react-native'

const uuid = DeviceInfo.getUniqueID()
let subscribedUid = null
const monPath = ()=>`/users/${subscribedUid}/mons`

export const init = (dispatch) => {
  const config = {
    apiKey: "AIzaSyBWvVTIVhdCARWTPEAipe5TjkWCguDZjvg",
    authDomain: "acetrainer-ce9c9.firebaseapp.com",
    databaseURL: "https://acetrainer-ce9c9.firebaseio.com",
    storageBucket: "acetrainer-ce9c9.appspot.com",
  }
  firebase.initializeApp(config)
  AsyncStorage.getItem('uuid').then(uuid=>{
    if (uuid) {
      subscribedUid = uuid
      subscribeToMons(dispatch)
      console.log('uuid', subscribedUid)
    }
  })
  firebase.auth().onAuthStateChanged(user=>{
    if (!user) {
      firebase.auth().signInAnonymously()
    } else {
      if (subscribedUid != user.uid) {
        subscribedUid = user.uid
        AsyncStorage.setItem('uuid', subscribedUid)
        subscribeToMons(dispatch)
        dispatch({
          type:'USER_SIGNIN',
          uid: subscribedUid,
        })
      }
    }
  })
}

const subscribeToMons = (dispatch)=> {
  const ref = firebase.database().ref(monPath())
  ref.on('child_added', (mon)=> {
    dispatch({
      type: 'MON_ADDED',
      mon:mon.val(),
    })
  })
  ref.on('child_changed', (mon)=>{
    dispatch({
      type:'MON_CHANGED',
      mon:mon.val(),
    })
  })
  ref.on('child_removed', (mon)=>{
    dispatch({
      type:'MON_REMOVED',
      mon:mon.val(),
    })
  })
}

export const addMon = (mon)=> {
  const ref = firebase.database().ref(monPath())
  ref.update({[mon.key()]:mon})
}

export const deleteMon = (mon)=> {
  const ref = firebase.database().ref(monPath())
  ref.child(mon.key()).remove()
}

export const updateMon = addMon
