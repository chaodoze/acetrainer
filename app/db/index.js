import firebase from 'firebase'
import DeviceInfo from 'react-native-device-info'

const uuid = DeviceInfo.getUniqueID()
const monPath = `/${uuid}/mons`

export const init = (dispatch) => {
  console.log('db init')
  const config = {
    apiKey: "AIzaSyBWvVTIVhdCARWTPEAipe5TjkWCguDZjvg",
    authDomain: "acetrainer-ce9c9.firebaseapp.com",
    databaseURL: "https://acetrainer-ce9c9.firebaseio.com",
    storageBucket: "acetrainer-ce9c9.appspot.com",
  }
  firebase.initializeApp(config)
  subscribeToMons(dispatch)
}

export const subscribeToMons = (dispatch)=> {
  const ref = firebase.database().ref(monPath)
  ref.on('child_added', (mon)=> {
    dispatch({
      type: 'MON_ADDED',
      val:mon.val(),
      mon,
    })
  })
  ref.on('child_changed', (mon)=>{
    dispatch({
      type:'MON_CHANGED',
      val:mon.val(),
      mon
    })
  })
  ref.on('child_removed', (mon)=>{
    dispatch({
      type:'MON_REMOVED',
      val:mon.val(),
      mon
    })
  })
}

export const addMon = (mon)=> {
  const ref = firebase.database().ref(monPath)
  ref.update({[mon.key()]:mon})
}

export const updateMon = addMon
