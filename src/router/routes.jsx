import { Navigate } from 'react-router-dom'
import { lazy } from 'react'

const Invoice = lazy(() => import('~/pages/Invoice'))
const InvoiceCreate = lazy(() => import('~/pages/Invoice/InvoiceCreate'))
const InvoiceUpdate = lazy(() => import('~/pages/Invoice/InvoiceUpdate'))
const InvoiceRead = lazy(() => import('~/pages/Invoice/InvoiceRead'))
const InvoiceRecordPayment = lazy(() => import('~/pages/Invoice/InvoiceRecordPayment'))
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
      path: '/invoice/create',
      element: <InvoiceCreate />,
    },
    {
      path: '/invoice/update/:id',
      element: <InvoiceUpdate />,
    },
    {
      path: '/invoice/read/:id',
      element: <InvoiceRead />,
    },
    {
      path: '/invoice/pay/:id',
      element: <InvoiceRecordPayment />,
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
