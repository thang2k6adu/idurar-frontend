import React from 'react'
import { Layout, Row, Col } from 'antd'

import { useSelector } from 'react-redux'

// xs = extra small (mobile, <576px)
// sm = small (tablet, ≥576px)
// md = medium (desktop, ≥768px)
// lg = large (≥992px)
// antd use 24 row system, span 11 = 11/24 row, order 1 appear before order 2
export default function AuthLayout({ sideContent, children }) {
  return (
    <Layout>
      <Row>
        <Col
          xs={{ span: 0, order: 2 }}
          sm={{ span: 0, order: 2 }}
          md={{ span: 11, order: 1 }}
          lg={{ span: 12, order: 1 }}
          style={{
            minHeight: '100vh',
          }}
        >
          {sideContent}
        </Col>
        <Col
          xs={{ span: 24, order: 1 }}
          sm={{ span: 24, order: 1 }}
          md={{ span: 13, order: 2 }}
          lg={{ span: 12, order: 2 }}
          style={{
            background: '#fff',
            minHeight: '100vh',
          }}
        >
          {children}
        </Col>
      </Row>
    </Layout>
  )
}
