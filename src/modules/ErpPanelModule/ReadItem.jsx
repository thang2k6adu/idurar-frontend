import { PageHeader } from '@ant-design/pro-layout'
import { Button, Row, Col, Descriptions, Statistic, Divider } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useLanguage from '~/locale/useLanguage'
import { selectCurrentItem } from '~/redux/erp/selector'
import { generate as uniqueId } from 'shortid'
import {
  CloseCircleOutlined,
  EditOutlined,
  FilePdfOutlined,
  MailOutlined,
  RetweetOutlined,
} from '@ant-design/icons'
import { DOWNLOAD_BASE_URL } from '~/config/serverApiConfig'
import useMail from '~/hooks/useMail'
import { erp } from '~/redux/erp/actions'
import { useMoney } from '~/settings'

function Item({ item, currentErp }) {
  const { moneyFormatter } = useMoney()


  return (
    <Row gutter={[12, 0]} key={item._id}>
      <Col className="gutter-row" span={11}>
        <p style={{marginBottom: 5}}>
          <strong>{item.itemName}</strong>
        </p>
        <p>
          {item.description}
        </p>
      </Col>
      <Col className="gutter-row" span={4}>
        <p style={{textAlign: 'right'}}>
          {moneyFormatter({ amount: item.price, currency_code: currentErp.currency})}
        </p>
      </Col>
      <Col className="gutter-row" span={4}>
        <p style={{textAlign: 'right'}}>
          {item.quantity}
        </p>
      </Col>
      <Col className="gutter-row" span={5}>
        <p style={{textAlign: 'right'}}>
          {moneyFormatter({ amount: item.total, currency_code: currentErp.currency})}
        </p>
      </Col>
      <Divider />
    </Row>
  )
}

export default function ReadItem({ config, selectedItem }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const translate = useLanguage()
  const { moneyFormatter } = useMoney()

  const { entity, ENTITY_NAME } = config
  const resetErp = {
    status: '',
    client: {
      name: '',
      email: '',
      phone: '',
      address: '',
    },
    subTotal: 0,
    taxTotal: 0,
    taxRate: 0,
    total: 0,
    credit: 0,
    number: 0,
    year: 0,
  }
  const { send, isLoading: mailInProgress } = useMail({ entity })
  const { result: currentResult } = useSelector(selectCurrentItem)
  const [currentErp, setCurrentErp] = useState(selectedItem ?? resetErp)
  const [itemsList, setItemsList] = useState([])
  const [client, setClient] = useState({})

  useEffect(() => {
    if (currentErp?.client) {
      setClient(currentErp.client)
    }
  }, [currentErp])

  useEffect(() => {
    if (currentResult) {
      const { items, invoice, ...others } = currentResult

      if (items) {
        setItemsList(items)
        setCurrentErp(currentResult)
      } else if (invoice.items) {
        setItemsList(invoice.items)
        setCurrentErp({ ...invoice.items, ...others, ...invoice })
      }
    }

    return () => {
      setItemsList([])
      setCurrentErp(resetErp)
    }
  }, [currentResult])

  return (
    <>
      <PageHeader
        onBack={() => {
          navigate(`/${entity.toLowerCase()}`)
        }}
        title={`${ENTITY_NAME} # ${currentErp.number}/${currentErp.year || ''}`}
        ghost={false}
        tags={[
          <span key="status">
            {currentErp.status && translate(currentErp.status)}
          </span>,
          currentErp.paymentStatus && (
            <span key="paymentStatus">
              {currentErp.paymentStatus && translate(currentErp.paymentStatus)}
            </span>
          ),
        ]}
        extra={[
          <Button
            key={uniqueId()}
            onClick={() => {
              navigate(`/${entity.toLowerCase()}`)
            }}
            icon={<CloseCircleOutlined />}
          >
            {translate('Close')}
          </Button>,
          <Button
            key={uniqueId()}
            onClick={() => {
              window.open(
                `${DOWNLOAD_BASE_URL}${entity}/${entity}-${currentErp._id}.pdf`,
                '_blank'
              )
            }}
            icon={<FilePdfOutlined />}
          >
            {translate('Download PDF')}
          </Button>,
          <Button
            key={uniqueId()}
            onClick={() => {
              send(currentErp._id)
            }}
            icon={<MailOutlined />}
          >
            {translate('Send by Email')}
          </Button>,
          <Button
            key={uniqueId()}
            onClick={() => {
              dispatch(erp.convert({ entity, id: currentErp._id }))
            }}
            icon={<RetweetOutlined />}
          >
            {translate('Convert to invoice')}
          </Button>,
          <Button
            key={uniqueId()}
            onClick={() => {
              dispatch(
                erp.currentAction({
                  actionType: 'update',
                  data: currentErp,
                })
              )
              navigate(`/${entity.toLowerCase()}/update/${currentErp._id}`)
            }}
            type="primary"
            icon={<EditOutlined />}
          >
            {translate('Edit')}
          </Button>,
        ]}
        style={{
          padding: '20px 0',
        }}
      >
        <Row>
          <Statistic title="status" value={currentErp.status} />
          <Statistic
            title={translate('SubTotal')}
            value={moneyFormatter({
              amount: currentErp.subTotal,
              currency_code: currentErp.currency,
            })}
            style={{ margin: '0 32px' }}
          />
          <Statistic
            title={translate('Total')}
            value={moneyFormatter({
              amount: currentErp.total,
              currency_code: currentErp.currency,
            })}
          />
          {config.entity !== 'quote' && (
            <Statistic
              title={translate('paid')}
              value={moneyFormatter({
                amount: currentErp.credit,
                currency_code: currentErp.currency,
              })}
              style={{ margin: '0 32px' }}
            />
          )}
        </Row>
      </PageHeader>
      <Divider dashed />
      <Descriptions title={`Client: ${currentErp.client.name}`}>
        <Descriptions.Item label={translate('Address')}>
          {client.address}
        </Descriptions.Item>
        <Descriptions.Item label={translate('phone')}>
          {client.phone}
        </Descriptions.Item>
        <Descriptions.Item label={translate('email')}>
          {client.email}
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={11}>
          <p>
            <strong>{translate('Product')}</strong>
          </p>
        </Col>
        <Col className="gutter-row" span={4}>
          <p style={{ textAlign: 'right' }}>
            <strong>{translate('Price')}</strong>
          </p>
        </Col>
        <Col className="gutter-row" span={4}>
          <p style={{ textAlign: 'right' }}>
            <strong>{translate('Quantity')}</strong>
          </p>
        </Col>
        <Col className="gutter-row" span={5}>
          <p style={{ textAlign: 'right' }}>
            <strong>{translate('Total')}</strong>
          </p>
        </Col>
      </Row>
      <Divider />
      {itemsList.map((item) => (
        <Item key={item._id} item={item} currentErp={currentErp} />
      ))}
      <div
        style={{
          width: '300px',
          float: 'right',
          textAlign: 'right',
          fontWeight: '700'
        }}
      >
        <Row gutter={[12, -5]}>
          <Col className="gutter-row" span={12}>
            <p>{translate('Sub Total:')}</p>
          </Col>
          <Col className="gutter-row" span={12}>
            <p>{moneyFormatter({amount: currentErp.subTotal, currency_code: currentErp.currency})}</p>
          </Col>
          <Col className="gutter-row" span={12}>
            <p>{translate('Tax Total:')}</p>
          </Col>
          <Col className="gutter-row" span={12}>
            <p>{moneyFormatter({amount: currentErp.taxTotal, currency_code: currentErp.currency})}</p>
          </Col>
          <Col className="gutter-row" span={12}>
            <p>{translate('Total:')}</p>
          </Col>
          <Col className="gutter-row" span={12}>
            <p>{moneyFormatter({amount: currentErp.total, currency_code: currentErp.currency})}</p>
          </Col>
        </Row>
      </div>
    </>
  )
}
