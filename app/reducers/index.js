import {combineReducers} from 'redux'
import Pokemon from '../db/pokemon'
import routes from './routes'

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

const selectedMon = (state=null, action) => {
  switch (action.type) {
    case 'SELECT_MON':
      return action.mon
    default:
      return state
  }
}
const rootReducer = combineReducers({mons, routes, selectedMon})
export default rootReducer
