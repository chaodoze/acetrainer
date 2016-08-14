import {combineReducers} from 'redux'

function reminders(state=[], action) {
  const {reminder} = action
  let newState
  switch (action.type) {
    case 'REMINDER_ADDED':
    case 'REMINDER_CHANGED':
      newState = {...state}
      newState[reminder.key] = reminder
      return newState
    case 'REMINDER_REMOVED':
      newState = {...state}
      if (newState[reminder.key]) {
        delete newState[reminder.key]
      }
      return newState
    default:
      return state
  }
}
const rootReducer = combineReducers({reminders})
export default rootReducer
