import firebase from 'firebase'
import DeviceInfo from 'react-native-device-info'
import {AsyncStorage} from 'react-native'
import Pokemon from '../db/pokemon'
import {firebaseConf} from '../config/firebase'

const uuid = DeviceInfo.getUniqueID()
let subscribedUid = null
const monPath = ()=>`/users/${subscribedUid}/mons`

export const init = (dispatch) => {
  const initUuid = uuid=> {
    if (uuid) {
      subscribedUid = uuid
      subscribeToMons(dispatch)
      dispatch({
        type:'USER_SIGNIN',
        uid: subscribedUid,
      })
      console.log('uuid', subscribedUid)
    }
  }
  firebase.initializeApp(firebaseConf)
  AsyncStorage.getItem('uuid').then(initUuid)
  firebase.auth().onAuthStateChanged(user=>{
    if (!user) {
      firebase.auth().signInAnonymously()
    } else {
      if (subscribedUid != user.uid) {
        initUuid(user.uid)
        AsyncStorage.setItem('uuid', user.uid)
          .catch(err=>console.log('set uuid err', err))
      }
    }
  })
}

const subscribeToMons = (dispatch)=> {
  const ref = firebase.database().ref(monPath())
  ref.once('value', snapshot=>{
    const mons = {}
    snapshot.forEach(childSnap=>{
      const mon = new Pokemon(childSnap.val())
      mons[mon.url] = mon
    })
    dispatch({
      type:'INITIAL_MONS',
      mons,
    })
    ref.on('child_added', (mon)=> {
      dispatch({
        type:'MON_ADDED',
        mon:mon.val(),
      })
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
