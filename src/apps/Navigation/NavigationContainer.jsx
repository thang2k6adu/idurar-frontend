import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Layout, Menu, Button, Drawer } from 'antd'
import { useAppContext } from '~/context/appContext'
import { useEffect, useState } from 'react'
import {
  SettingOutlined,
  CustomerServiceOutlined,
  ContainerOutlined,
  FileSyncOutlined,
  DashboardOutlined,
  CreditCardOutlined,
  MenuOutlined,
  ShopOutlined,
  WalletOutlined,
  ReconciliationOutlined,
} from '@ant-design/icons'

import useResponsive from '~/hooks/useResponsive'
import useLanguage from '~/locale/useLanguage'
import logoIcon from '~/style/images/logo-icon.svg'
import logoText from '~/style/images/logo-text.svg'

export default function Navigation() {
  const { isMobile } = useResponsive()

  return isMobile ? <MobileSideBar /> : <Sidebar collapsible={false} />
}

function Sidebar({ collapsible, isMobile = false }) {
  let location = useLocation()

  const { Sider } = Layout
  const { state: stateApp, appContextActions } = useAppContext()
  const { isNavMenuClose } = stateApp
  const { navMenu } = appContextActions
  const [showLogoApp, setShowLogoApp] = useState(isNavMenuClose)
  // eg: /pathname return /dashboard -> slice(1) return dashboard without /
  const [currentPath, setCurrentPath] = useState(location.pathname.slice(1))

  const translate = useLanguage()
  const navigate = useNavigate()

  const items = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: <Link to={'/'}>{translate('dashboard')}</Link>,
    },
    {
      key: 'customer',
      icon: <CustomerServiceOutlined />,
      label: <Link to={'/customer'}>{translate('customers')}</Link>,
    },
    {
      key: 'invoice',
      icon: <ContainerOutlined />,
      label: <Link to={'/invoice'}>{translate('invoices')}</Link>,
    },
    {
      key: 'quote',
      icon: <FileSyncOutlined />,
      label: <Link to={'/quote'}>{translate('quotes')}</Link>,
    },
    {
      key: 'payments',
      icon: <CreditCardOutlined />,
      label: <Link to={'/payments'}>{translate('payments')}</Link>,
    },
    {
      key: 'paymentMode',
      icon: <CreditCardOutlined />,
      label: <Link to={'/paymentMode'}>{translate('paymentModes')}</Link>,
    },
    {
      key: 'taxes',
      icon: <ShopOutlined />,
      label: <Link to={'/taxes'}>{translate('taxes')}</Link>,
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: (
        <Link to={'/settings'}>{translate('Settings')}</Link>
      ),
    },
    {
      key: 'about',
      icon: <ReconciliationOutlined />,
      label: <Link to={'/about'}>{translate('about')}</Link>,
    },
  ]

  useEffect(() => {
    const path =
      location.pathname === '/' ? 'dashboard' : location.pathname.slice(1)
    if (currentPath !== path) {
      setCurrentPath(path)
    }
  }, [location, currentPath])

  useEffect(() => {
    if (isNavMenuClose) {
      setShowLogoApp(isNavMenuClose)
    }
    const timer = setTimeout(() => {
      if (!isNavMenuClose) {
        setShowLogoApp(isNavMenuClose)
      }
    }, 200)

    return () => clearTimeout(timer)
  }, [isNavMenuClose])

  const onCollapse = () => {
    navMenu.collapse()
  }

  return (
    <Sider
      collapsible={collapsible}
      collapsed={collapsible ? isNavMenuClose : collapsible}
      onCollapse={onCollapse}
      className="navigation"
      width={256}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: isMobile ? 'absolute' : 'relative',
        bottom: '20px',
        ...(!isMobile && {
          left: '20px',
          top: '20px',
        }),
      }}
      theme="light"
    >
      <div
        className="logo"
        onClick={() => {
          navigate('/')
        }}
        style={{
          cursor: 'pointer',
        }}
      >
        <img
          src={logoIcon}
          alt="Logo"
          style={{
            height: '40px',
            marginLeft: '-5px',
          }}
        />

        {!showLogoApp && (
          <img
            src={logoText}
            alt="Logo"
            style={{
              marginTop: '3px',
              marginLeft: '10px',
              height: '38px',
            }}
          />
        )}
      </div>
      <Menu
        items={items}
        mode="inline"
        theme="light"
        selectedKeys={[currentPath]}
        style={{
          width: 256,
        }}
      ></Menu>
    </Sider>
  )
}

function MobileSideBar() {
  const [visible, setVisible] = useState(false)
  const showDrawer = () => {
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
  }

  return (
    <>
      <Button
        type="text"
        size="large"
        onClick={showDrawer}
        className="mobile-sidebar-btn"
        style={{
          marginLeft: 25,
        }}
      >
        <MenuOutlined
          style={{
            fontSize: 18,
          }}
        />
      </Button>
      <Drawer
        width={250}
        placement="left"
        closable={false}
        onClose={onClose}
        open={visible}
      >
        <Sidebar isMobile={true} />
      </Drawer>
    </>
  )
}
