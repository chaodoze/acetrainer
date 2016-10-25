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

const rootReducer = combineReducers({mons, selectedMon, routes})
export default rootReducer
