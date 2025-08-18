import { Navigate } from 'react-router-dom'
import { lazy } from 'react'

const Invoice = lazy(() => import('~/pages/Invoice'))

let routes = {
  expense: [],
  default: [
    {
      path: '/login',
      element: <Navigate to="/"/>,
    },
    {
      path: '/invoice',
      element: <Invoice />
    }
  ],
}

export default routes