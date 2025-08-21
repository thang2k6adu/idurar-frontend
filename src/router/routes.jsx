import { Navigate } from 'react-router-dom'
import { lazy } from 'react'


const Invoice = lazy(() => import('~/pages/Invoice'))
const Quote = lazy(() => import('~/pages/Quote'))

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
    },
    {
      path: '/quote',
      element: <Quote />
    }
  ],
}

export default routes