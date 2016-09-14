import {combineReducers} from 'redux'
import Pokemon from '../db/pokemon'

function mons(state={}, action) {
  const mon = action.val
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
const rootReducer = combineReducers({mons})
export default rootReducer
