import { Layout } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { settingsAction } from '~/redux/settings/actions'
import { useLayoutEffect } from 'react'
import { selectSetting } from '~/redux/settings/selectors'

import useResponsive from '~/hooks/useResponsive'
import PageLoader from '~/components/PageLoader'
import Navigation from './Navigation/NavigationContainer'

export default function ErpApp() {
  const { Content, Sider } = Layout
  const { isMobile } = useResponsive()

  const dispatch = useDispatch()

  useLayoutEffect(() => {
    dispatch(settingsAction.list({ entity: 'setting' }))
  }, [])

  const { isSuccess: settingIsLoaded } = useSelector(selectSetting)

  if (settingIsLoaded) {
    return (
      <Layout hasSider>
        <Navigation />
        {isMobile ? (
          <Content style={{ backgroundColor: 'green' }}>Mobile</Content>
        ) : (
          <Content style={{ backgroundColor: 'green' }}>PC</Content>
        )}
      </Layout>
    )
  } else {
    return <PageLoader />
  }
}
