import { combineReducers } from 'redux'
import { reducer as authReducer } from './auth'
import { reducer as settingsReducer } from './settings'

// {
//  auth:{
//  }
// ...
  // settings: {
  //   result: {
  //     money_format_settings: {
  //       decimal_places: 2,
  //       currency_symbol: '$',
  //     },
  //   },
  //   isLoading: false,
  //   isSuccess: true,
  // },
// }
const rootReducer = combineReducers({
  auth: authReducer,
  settings: settingsReducer,
})

export default rootReducer
