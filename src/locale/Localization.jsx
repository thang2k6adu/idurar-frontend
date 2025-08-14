import { ConfigProvider } from 'antd'

export default function Localization({ children }) {
  return (
    <ConfigProvider
      theme={{
        toke: {
          colorPrimary: '#339393',
          colorLink: '#1640D6',
          borderRadius: 0,
        },
      }}
    >
      {children}
    </ConfigProvider>
  )
}
