import {combineReducers} from 'redux'
import {  AsyncStorage } from 'react-native'
import Pokemon from '../db/pokemon'
import routes from './routes'

function mons(state={}, action) {
  const mon = action.mon
  let newState
  switch (action.type) {
    case 'INITIAL_MONS':
      return action.mons
    case 'MON_ADDED':
    case 'MON_CHANGED':
      newState = {...state}
      if (action.type == 'MON_CHANGED' || !newState[mon.url]) { //if existing mon, then just ignore MON_ADDED
        newState[mon.url] = new Pokemon(mon)
      }
      return newState
    case 'MON_REMOVED':
      newState = {...state}
      if (newState[mon.url]) {
        delete newState[mon.url]
      }
      return newState
    default:
      return state
  }
}

function selectedMon(state=null, action) {
  if (action.type == 'SELECT_MON') {
    return action.mon
  }
  else {
    if (action.type == 'MON_CHANGED' && state && state.url == action.mon.url) {
      return new Pokemon(action.mon)
    }
  }
  return state
}

function trainerLevel(state=null, action) {
  if (action.type == 'SET_TRAINER_LEVEL') {
    return action.level
  }
  else if (action.type == 'MON_LEVEL_RAISED' && action.level > state) {
    AsyncStorage.setItem('TrainerLevel', JSON.stringify(action.level))
      .catch((r)=>console.error('setTrainerLevel err', r))
    return action.level
  }
  return state
}

function uid(state=null, action) {
  if (action.type == 'USER_SIGNIN') {
    return action.uid
  }
  return state
}
const rootReducer = combineReducers({mons, selectedMon, trainerLevel, routes, uid})
export default rootReducer
