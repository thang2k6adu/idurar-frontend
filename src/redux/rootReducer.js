import { combineReducers } from 'redux'
import { reducer as authReducer } from './auth'
import { reducer as settingsReducer } from './settings'
import { reducer as erpReducer } from './erp'

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
  erp: erpReducer,
})

export default rootReducer
