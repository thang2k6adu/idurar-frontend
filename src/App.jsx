import './style/app.css'
import { lazy, Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import PageLoader from './components/PageLoader'
import store from './redux/store'

const IdurarOs = lazy(() => import('./apps/IdurarOs'))

export default function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Suspense fallback={<PageLoader />}>
          <IdurarOs />
        </Suspense>
      </Provider>
    </BrowserRouter>
  )
}
