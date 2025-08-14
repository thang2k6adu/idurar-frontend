import React from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const PageLoader = () => {
    // we need to have spin props for any icon if we want them to spin
    // if dont, Spin just display static icon
    // Spin Component default have LoadingOutLined
  const antIcon = <LoadingOutlined style={{ fontSize: 64}} spin/>

  return (
    <div className="centerAbsolute">
      <Spin indicator={antIcon}/>
    </div>
  )
}

export default PageLoader