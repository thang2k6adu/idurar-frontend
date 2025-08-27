import { Row, Col, Button, Descriptions, Divider } from 'antd'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '@ant-design/pro-layout'
import { useEffect, useState } from 'react'
import useLanguage from '~/locale/useLanguage'
import { generate as uniqueId } from 'shortid'
import { CloseCircleOutlined, FileTextOutlined } from '@ant-design/icons'
import { useMoney } from '~/settings'
import RecordPayment from './RecordPayment'

export default function Payment({ config, currentItem }) {
  const { entity, ENTITY_NAME } = config
  const navigate = useNavigate()
  const [currentErp, setCurrentErp] = useState(currentItem)
  const translate = useLanguage()
  const [client, setClient] = useState({})
  const money = useMoney()
  const [itemsList, setItemsList] = useState([])

  useEffect(() => {
    if (currentErp?.client) {
      setClient(currentErp.client)
    }
  }, [currentErp])

  useEffect(() => {
    const controller = new AbortController()
    if (currentItem) {
      const { items } = currentItem

      setItemsList(items)
      setCurrentErp(currentItem)
    }

    return () => controller.abort()
  }, [currentItem])

  return (
    <>
      <Row gutter={[12, 12]}>
        <Col
          className="gutter-row"
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 20, push: 2 }}
        >
          <PageHeader
            onBack={() => navigate(`/${entity.toLowerCase()}`)}
            title={`Record Payment for ${ENTITY_NAME} # ${currentErp.number}/${
              currentErp.year || ''
            }`}
            ghost={false}
            tags={
              <span>
                {currentErp.paymentStatus &&
                  translate(currentErp.paymentStatus)}
              </span>
            }
            extra={[
              <Button
                key={uniqueId()}
                onClick={() => navigate(`/${entity.toLowerCase()}`)}
                icon={<CloseCircleOutlined />}
              >
                {translate('Cancel')}
              </Button>,
              <Button
                key={uniqueId()}
                onClick={() => navigate(`/invoice/read/${currentErp._id}`)}
                icon={<FileTextOutlined />}
              >
                {translate('Show Invoice')}
              </Button>,
            ]}
            style={{ padding: '20px 0px' }}
          ></PageHeader>
        </Col>
      </Row>
      <Divider dashed />
      <Row gutter={[12, 12]}>
        <Col
          className="gutter-row"
          xs={{ span: 24, order: 2 }}
          sm={{ span: 24, order: 2 }}
          md={{ span: 10, order: 2, push: 2 }}
          lg={{ span: 10, order: 2, push: 4 }}
        >
          <div className="space50" />
          <Descriptions
            title={`${translate('Client')}: ${currentErp.client.name}`}
            column={1}
          >
            <Descriptions.Item label={translate('email')}>
              {client.email}
            </Descriptions.Item>
            <Descriptions.Item label={translate('phone')}>
              {client.phone}
            </Descriptions.Item>
            <Divider dashed />
            <Descriptions.Item label={translate('payment status')}>
              {currentErp.paymentStatus}
            </Descriptions.Item>
            <Descriptions.Item label={translate('sub total')}>
              {money.moneyFormatter({
                amount: currentErp.subTotal,
                currency_code: currentErp.currency,
              })}
            </Descriptions.Item>
            <Descriptions.Item label={translate('total')}>
              {money.moneyFormatter({
                amount: currentErp.total,
                currency_code: currentErp.currency,
              })}
            </Descriptions.Item>
            <Descriptions.Item label={translate('discount')}>
              {money.moneyFormatter({
                amount: currentErp.discount,
                currency_code: currentErp.currency,
              })}
            </Descriptions.Item>
            <Descriptions.Item label={translate('paid')}>
              {money.moneyFormatter({
                amount: currentErp.credit,
                currency_code: currentErp.currency,
              })}
            </Descriptions.Item>
          </Descriptions>
        </Col>
        <Col
          className="gutter-row"
          xs={{ span: 24, order: 1 }}
          sm={{ span: 24, order: 1 }}
          md={{ span: 12, order: 1 }}
          lg={{ span: 10, order: 1, push: 2 }}
        >
          <RecordPayment config={config} />
        </Col>
      </Row>
    </>
  )
}
