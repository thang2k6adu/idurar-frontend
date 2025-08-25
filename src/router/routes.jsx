import { Navigate } from 'react-router-dom'
import { lazy } from 'react'

const Invoice = lazy(() => import('~/pages/Invoice'))
const Quote = lazy(() => import('~/pages/Quote'))
const QuoteCreate = lazy(() => import('~/pages/Quote/QuoteCreate'))
const QuoteUpdate = lazy(() => import('~/pages/Quote/QuoteUpdate'))
const QuoteRead = lazy(() => import('~/pages/Quote/QuoteRead'))

let routes = {
  expense: [],
  default: [
    {
      path: '/login',
      element: <Navigate to="/" />,
    },
    {
      path: '/invoice',
      element: <Invoice />,
    },
    {
      path: '/quote',
      element: <Quote />,
    },
    {
      path: '/quote/create',
      element: <QuoteCreate />,
    },
    {
      path: '/quote/update/:id',
      element: <QuoteUpdate />,
    },
    {
      path: '/quote/read/:id',
      element: <QuoteRead />,
    },
  ],
}

export default routes
