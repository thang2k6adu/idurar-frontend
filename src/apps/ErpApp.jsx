import { Layout } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { settingsAction } from '~/redux/settings/actions'
import { useLayoutEffect } from 'react'
import { selectSettings } from '~/redux/settings/selectors'

import useResponsive from '~/hooks/useResponsive'
import PageLoader from '~/components/PageLoader'
import Navigation from './Navigation/NavigationContainer'
import HeaderContent from './Header/HeaderContainer'
import AppRouter from '~/router/AppRouter'

export default function ErpApp() {
  const { Content } = Layout
  const { isMobile } = useResponsive()

  const dispatch = useDispatch()

  useLayoutEffect(() => {
    dispatch(settingsAction.list({ entity: 'setting' }))
  }, [])

  const { isSuccess: settingIsLoaded } = useSelector(selectSettings)

  if (settingIsLoaded) {
    return (
      <Layout hasSider>
        <Navigation />
        {isMobile ? (
          <Layout>
            <HeaderContent />
            <Content style={{ backgroundColor: '#FFF' }}>
              <AppRouter />
            </Content>
          </Layout>
        ) : (
          <Layout>
            <HeaderContent />
            <Content style={{ backgroundColor: '#FFF' }}>
              <AppRouter />
            </Content>
          </Layout>
        )}
      </Layout>
    )
  } else {
    return <PageLoader />
  }
}
