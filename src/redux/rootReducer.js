import { combineReducer } from 'redux'
import { reducer as authReducer } from './auth'

const rootReducer = combineReducer({
  auth: authReducer,
})

export default rootReducer
