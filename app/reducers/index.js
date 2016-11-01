import {combineReducers} from 'redux'
import Pokemon from '../db/pokemon'
import routes from './routes'

function mons(state={}, action) {
  const mon = action.mon
  let newState
  switch (action.type) {
    case 'MON_ADDED':
    case 'MON_CHANGED':
      newState = {...state}
      newState[mon.url] = new Pokemon(mon)
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
  return state
}

function user(state=null, action) {
  if (action.type == 'USER_SIGNIN') {
    if (!state || state.uid != action.user.uid) {
      return action.user
    }
  }
  return state
}
const rootReducer = combineReducers({mons, selectedMon, trainerLevel, routes, user})
export default rootReducer
