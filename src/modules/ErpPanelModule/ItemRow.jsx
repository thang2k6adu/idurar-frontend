import { Row, Col, Form, Input, InputNumber } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useMoney } from '~/settings'
import calculate from '~/utils/calculate'

export default function ItemRow({ field, remove, current = null }) {
  const [quantity, setQuantity] = useState(0)
  const [price, setPrice] = useState(0)
  const [totalState, setTotal] = useState(undefined)
  const money = useMoney()

  const updateQuantity = (value) => {
    setQuantity(value)
  }
  const updatePrice = (value) => {
    setPrice(value)
  }

  useEffect(() => {
    if (current) {
      const { items, invoice } = current

      // only payment have invoice field
      if (invoice) {
        const item = invoice[field.fieldKey]
        if (item) {
          setQuantity(item.quantity)
          setPrice(item.price)
        }
      } else {
        const item = items[field.fieldKey]

        if (item) {
          setQuantity(item.quantity)
          setPrice(item.price)
        }
      }
    }
  }, [current])

  useEffect(() => {
    const currentTotal = calculate.multiply(price, quantity)

    setTotal(currentTotal)
    console.log(totalState)
  }, [price, quantity])

  return (
    <Row gutter={[12, 12]} style={{ position: 'relative' }}>
      <Col className="gutter-row" span={5}>
        <Form.Item
          name={[field.name, 'itemName']}
          rules={[
            {
              required: true,
              message: 'Missing itemName name',
            },
            {
              pattern: /^(?!\s*$)[\s\S]+$/,
              message:
                'Item Name must contain alphanumeric or special characters',
            },
          ]}
        >
          <Input placeholder="Item Name" />
        </Form.Item>
      </Col>
      <Col className="gutter-row" span={7}>
        <Form.Item
          name={[field.name, 'description']}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Description Name" />
        </Form.Item>
      </Col>
      <Col className="gutter-row" span={3}>
        <Form.Item
          name={[field.name, 'quantity']}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber
            style={{ width: '100%' }}
            min={0}
            onChange={updateQuantity}
          />
        </Form.Item>
      </Col>
      <Col className="gutter-row" span={4}>
        <Form.Item
          name={[field.name, 'price']}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber
            className="moneyInput"
            style={{ width: '100%' }}
            min={0}
            onChange={updatePrice}
            controls={false}
            addonBefore={
              money.currency_position === 'before'
                ? money.currency_symbol
                : undefined
            }
            addonAfter={
              money.currency_position === 'after'
                ? money.currency_symbol
                : undefined
            }
          />
        </Form.Item>
      </Col>
      <Col className="gutter-row" span={5}>
        <Form.Item name={[field.name, 'total']}>
          <Form.Item>
            <InputNumber
              readOnly
              className="moneyInput"
              style={{ width: '100%' }}
              min={0}
              value={totalState}
              controls={false}
              addonBefore={
                money.currency_position === 'before'
                  ? money.currency_symbol
                  : undefined
              }
              addonAfter={
                money.currency_position === 'after'
                  ? money.currency_symbol
                  : undefined
              }
              formatter={(
                value // Thêm return
              ) =>
                money.amountFormatter({
                  amount: value,
                  currency_code: money.currency_code,
                })
              }
            />
          </Form.Item>
        </Form.Item>
      </Col>
      <div style={{ position: 'absolute', right: '-20px', top: '5px' }}>
        <DeleteOutlined onClick={() => remove(field.name)} />
      </div>
    </Row>
  )
}
