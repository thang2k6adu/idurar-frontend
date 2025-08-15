import { Layout } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import useResponsive from '~/hooks/useResponsive'

export default function ErpApp() {
  const { Content } = Layout
  const { isMobile} = useResponsive()

  const dispatch = useDispatch()

  return (
    <Layout hasSider>
      
    </Layout>
  )
}
