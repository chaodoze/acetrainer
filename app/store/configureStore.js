import { createStore, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import createLogger from 'redux-logger'

export default function configureStore(initialState) {
  const logger = createLogger()
  // const createStoreWithMiddleware = applyMiddleware(logger)(createStore) //logger must be last middleware
  const store = createStore(rootReducer)

  return store
}
