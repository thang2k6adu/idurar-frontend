import { LogoutOutlined, ToolOutlined, UserOutlined } from '@ant-design/icons'
import { Layout, Dropdown, Avatar } from 'antd'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { FILE_BASE_URL } from '~/config/serverApiConfig'
import { selectCurrentAdmin } from '~/redux/auth/selectors'

import useLanguage from '~/locale/useLanguage'
import UpgradeButton from './UpgradeButton'

export default function HeaderContent() {
  const currentAdmin = useSelector(selectCurrentAdmin)
  const translate = useLanguage()

  const { Header } = Layout

  const ProfileDropdown = () => {
    const navigate = useNavigate()
    return (
      <div className="profileDropdown" onClick={() => navigate('/profile')}>
        <Avatar
          size="large"
          className="last"
          src={
            currentAdmin?.photo
              ? FILE_BASE_URL + currentAdmin?.photo
              : undefined
          }
          style={{
            color: '#f56a00',
            backgroundColor: currentAdmin?.photo
              ? FILE_BASE_URL + currentAdmin?.photo
              : '#fde3cf',
            boxShadow: '0 0 6px 1px rgba(150, 190, 238, 0.35)',
          }}
        >
          {currentAdmin?.name?.charAt(0)?.toUpperCase()}
        </Avatar>
        <div className="profileDropdownInfo">
          <p>
            {currentAdmin?.name} {currentAdmin?.surname}
          </p>
          <p>{currentAdmin?.email}</p>
        </div>
      </div>
    )
  }
  const DropdownMenu = ({ text }) => {
    return <span>{text}</span>
  }
  const items = [
    {
      label: <ProfileDropdown className="headerDropdownMenu" />,
      key: 'ProfileDropdown',
    },
    {
      type: 'divider',
    },
    {
      icon: <UserOutlined />,
      key: 'settingProfile',
      label: (
        <Link to={'/profile'}>
          <DropdownMenu text={translate('profile_settings')} />
        </Link>
      ),
    },
    {
      icon: <ToolOutlined />,
      key: 'settingApp',
      label: (
        <Link to={'/settings'}>
          <DropdownMenu text={translate('app_settings')} />
        </Link>
      ),
    },
    {
      type: 'divider',
    },
    {
      icon: <LogoutOutlined />,
      key: 'logout',
      label: (
        <Link to={'/logout'}>
          <DropdownMenu text={translate('logout')} />
        </Link>
      ),
    },
  ]

  return (
    <Header
      style={{
        padding: '20px',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
        gap: '15px',
      }}
    >
      <Dropdown
        menu={{
          items,
        }}
        trigger={['click']}
        placement="bottomRight"
        style={{
          width: '280px',
          float: 'right',
        }}
      >
        <Avatar
          className="last"
          src={
            currentAdmin?.photo
              ? FILE_BASE_URL + currentAdmin?.photo
              : undefined
          }
          style={{
            color: '#f56a00',
            backgroundColor: currentAdmin?.photo
              ? FILE_BASE_URL + currentAdmin?.photo
              : '#fde3cf',
            boxShadow: '0 0 6px 1px rgba(150, 190, 238, 0.35)',
            cursor: 'pointer',
            float: 'right',
          }}
          size="large"
        >
          {currentAdmin?.name?.charAt(0)?.toUpperCase()}
        </Avatar>
      </Dropdown>
      <UpgradeButton />
    </Header>
  )
}
