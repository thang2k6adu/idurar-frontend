import Localization from '~/locale/Localization'
import { lazy, Suspense } from 'react'
import { selectAuth } from '~/redux/auth/selectors'
import { useSelector } from 'react-redux'
import { AppContextProvider } from '~/context/appContext'

import PageLoader from '~/components/PageLoader'
import AuthRouter from '~/router/AuthRouter'

const ErpApp = lazy(() => import('./ErpApp'))

const DefaultApp = () => (
  <Localization>
    <AppContextProvider>
      <Suspense fallback={<PageLoader />}>
        <ErpApp />
      </Suspense>
    </AppContextProvider>
  </Localization>
)

export default function IdurarOs() {
  const { isLoggedIn } = useSelector(selectAuth)
  console.log(
    '🚀 Welcome to IDURAR ERP CRM! Did you know that we also offer commercial customization services? Contact us at hello@idurarapp.com for more information.'
  )

  if (!isLoggedIn) {
    return (
      <Localization>
        <AuthRouter />
      </Localization>
    )
  } else {
    return <DefaultApp />
  }
}
