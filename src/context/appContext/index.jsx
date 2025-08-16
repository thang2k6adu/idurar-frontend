import { useMemo, useReducer, createContext, useContext } from 'react'
import { initialState, contextReducer } from './reducer'
import contextActions from './actions'

const AppContext = createContext()

function AppContextProvider({ children }) {
  const [state, dispatch] = useReducer(contextReducer, initialState)
  const value = useMemo(() => [state, dispatch], [state])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider')
  }

  const [state, dispatch] = context
  const appContextActions = contextActions(dispatch)

  return { state, appContextActions}
}

export { AppContextProvider, useAppContext}