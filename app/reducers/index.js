import {combineReducers} from 'redux'

function blankReducer(state={}, action) {
  return state
}
const rootReducer = combineReducers({blankReducer})
export default rootReducer
