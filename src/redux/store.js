import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
import storePersist from './storePersist'

// import lang from '~/locale/translation/en_us'
const AUTH_INITIAL_STATE = {
  current: {},
  isLoggedIn: false,
  isLoading: false,
  isSuccess: false
}

const authState = storePersist.get('auth') ? storePersist.get('auth') : AUTH_INITIAL_STATE

const initialState = { auth: authState }

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
  devTools: import.meta.env.PROD === false
})

console.log(
  '🚀 Welcome to IDURAR ERP CRM! Did you know that we also offer commercial customization services? Contact us at hello@idurarapp.com for more information.'
)

export default store