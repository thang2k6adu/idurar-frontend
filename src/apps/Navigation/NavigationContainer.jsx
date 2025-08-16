import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Layout } from 'antd'

import useResponsive from '~/hooks/useResponsive'

export default function Navigation() {
  const { isMobile } = useResponsive()

  return isMobile ? <MobileSideBar /> : <Sidebar collapsible={false}/>
}

function Sidebar({ collapsible, isMobile = false }) {
  let location = useLocation()
  const { Sider } = Layout

  return (
    <Sider style={{ backgroundColor: 'white', height: '100vh' }}>Sider</Sider>
  )
}

function MobileSideBar() {
  return (
    <div>mobileBar</div>
  )
}
