import { createContext, useMemo, useReducer, useContext } from 'react'
import { contextReducer, initialState } from './reducer'
import contextActions from './actions'
import contextSelectors from './selectors'

const ErpContext = createContext()

export function ErpContextProvider({ children }) {
  const [state, dispatch] = useReducer(contextReducer, initialState)
  const value = useMemo(() => [state, dispatch], [state])

  return <ErpContext.Provider value={value}>{children}</ErpContext.Provider>
}

export function useErpContext() {
  const context = useContext(ErpContext)
  if (context === undefined) {
    throw new Error('useContext must be within a ErpContextProvider')
  }

  const [state, dispatch] = context
  const erpContextActions = contextActions(dispatch)
  const erpContextSelectors = contextSelectors(state)

  return { state, erpContextActions, erpContextSelectors }
}
