import { createRoot } from 'react-dom/client'
import { ConfigProvider, App as AntdApp } from 'antd'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <ConfigProvider>
    <AntdApp>
      <App />
    </AntdApp>
  </ConfigProvider>
)
