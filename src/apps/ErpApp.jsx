import { useResponsive } from '@/hooks/useResponsive'
import { useDispatch, useSelector } from 'react-redux'
import { useLayoutEffect } from 'react'
import { settingsAction } from '@/redux/settings/actions'

import { Layout } from 'antd'
import { PageLoader } from '@/components/PageLoader/PageLoader'

export const ErpApp = () => {
  // Trong layout còn có Header, Footer, Sider và Content
  const { Content } = Layout

  // Hook này chạy khi component được mount vào, hoặc kích thước của sổ trình duyệt thay đổi
  const { isMobile } = useResponsive()

  // const dispatch = useDispatch()

  // useLayoutEffect giống như useEffect nhưng chạy khi render xong
  // Điều này đảm bảo rằng các cài đặt cầnthiết của ứng dụng được tải trước khi hiển thị giao diện chính
  // Giúp ứng dụng có đầy đủ thông tin cấu hình cần thiết để hoạt động
  // Khi component được mount, gọi API lấy toàn bộ setting
  // useLayoutEffect(() => {
  //   dispatch(settingsAction.list({ entity: 'settings' }))
  // }, [])
  // const { isSuccess: settingIsLoaded } = useSelector(selectSettings)
  const settingIsLoaded = false
  if (settingIsLoaded) {
    return (
      <Layout hasSider>
        <Navigation />

        {isMobile ? (
          <Layout style={{ marginLeft: 0 }}>
            <HeaderContent />
            <Content
              style={{
                margin: '40px auto 30px',
                overflow: 'initial',
                width: '100%',
                padding: '0 25px',
                maxWidth: 'none',
              }}
            >
              <AppRoute />
            </Content>
          </Layout>
        ) : (
          <Layout>
            <HeaderContent />
            <Content
              style={{
                margin: '40px auto 30px',
                overflow: 'initial',
                width: '100%',
                padding: '0 50px',
                maxWidth: 1400,
              }}
            >
              <AppRouter />
            </Content>
          </Layout>
        )}
      </Layout>
    )
  } else return <PageLoader />
}
