import { PlusOutlined } from '@ant-design/icons'
import {
  Row,
  Col,
  Divider,
  Form,
  InputNumber,
  Select,
  DatePicker,
  Input,
  Button,
} from 'antd'
import dayjs from 'dayjs'
import { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import AutoCompleteAsync from '~/components/AutoCompleteAsync'
import useLanguage from '~/locale/useLanguage'
import ItemRow from '~/modules/ErpPanelModule/ItemRow'
import { selectFinanceSettings } from '~/redux/settings/selectors'
import { useDate } from '~/settings'
import MoneyInputFormItem from '~/components/MoneyInputFormItem'
import SelectAsync from '~/components/SelectAsync'
import calculate from '~/utils/calculate'

export default function QuoteForm({ subTotal = 0, current = null}) {
  const { last_quote_number } = useSelector(selectFinanceSettings)

  if (last_quote_number === undefined) {
    return <></>
  }

  return <LoadQuoteForm subTotal={subTotal} current={current}/>
}

export function LoadQuoteForm({ subTotal = 0, current = null }) {
  const translate = useLanguage()
  const { dateFormat } = useDate()
  const { last_quote_number } = useSelector(selectFinanceSettings)
  const [lastNumber, setLastNumber] = useState(() => last_quote_number + 1)
  const [currentYear, setCurrentYear] = useState(() => new Date().getFullYear())
  const [taxRate, setTaxRate] = useState(0)
  const [taxTotal, setTaxTotal] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    if (current) {
      const { taxRate = 0, year, number } = current
      setTaxRate(taxRate / 100)
      setCurrentYear(year)
      setLastNumber(number)
    }
  }, [current])
  useEffect(() => {
    const currentTotal = calculate.add(
      calculate.multiply(subTotal, taxRate),
      subTotal
    )
    setTaxTotal(Number.parseFloat(calculate.multiply(subTotal, taxRate)))
    setTotal(Number.parseFloat(currentTotal))
  }, [subTotal, taxRate])

  const addField = useRef(false)

  const handleTaxChange = (value) => {
    setTaxRate(value / 100)
  }

  return (
    <>
      {/* trái phải 12, row trên row dưới = 0 */}
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={8}>
          <Form.Item
            name="client"
            label={translate('Client')}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <AutoCompleteAsync
              entity="client"
              displayLabels={['name']}
              searchFields={'name'}
              redirectLabel={'Add New Client'}
              withRedirect
              urlToRedirect={'/customer'}
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={5}>
          <Form.Item
            name="number"
            label={translate('number')}
            initialValue={lastNumber}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={5}>
          <Form.Item
            label={translate('Year')}
            name="year"
            initialValue={currentYear}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={6}>
          <Form.Item
            label={translate('status')}
            name="status"
            rules={[
              {
                required: false,
              },
            ]}
            initialValue="draft"
          >
            <Select
              options={[
                { value: 'draft', label: translate('draft') },
                { value: 'pending', label: translate('pending') },
                { value: 'sent', label: translate('sent') },
                { value: 'accepted', label: translate('accepted') },
                { value: 'declined', label: translate('declined') },
              ]}
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item
            label={translate('date')}
            name="date"
            rules={[
              {
                required: true,
                type: 'object',
              },
            ]}
            initialValue={dayjs()}
          >
            <DatePicker style={{ width: '100%' }} format={dateFormat} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={6}>
          <Form.Item
            label={translate('expired_date')}
            name="expiredDate"
            rules={[
              {
                required: true,
                type: 'object',
              },
            ]}
            initialValue={dayjs().add(30, 'days')}
          >
            <DatePicker style={{ width: '100%' }} format={dateFormat} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={10}>
          <Form.Item label={translate('note')} name="notes">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Divider dashed />
      <Row gutter={[12, 12]} style={{ position: 'relative' }}>
        <Col className="gutter-row" span={5}>
          <p>{translate('Item')}</p>
        </Col>
        <Col className="gutter-row" span={7}>
          <p>{translate('Description')}</p>
        </Col>
        <Col className="gutter-row" span={3}>
          <p>{translate('Quantity')}</p>
        </Col>
        <Col className="gutter-row" span={4}>
          <p>{translate('Price')}</p>
        </Col>
        <Col className="gutter-row" span={5}>
          <p>{translate('Total')}</p>
        </Col>
      </Row>
      <Form.List name="items">
        {(fields, { add, remove }) => {
          if (fields.length === 0) {
            add() // 👈 đảm bảo luôn có 1 dòng trống
          }
          return (
            <>
              {fields.map((field) => (
                <ItemRow
                  key={field.key}
                  remove={remove}
                  field={field}
                  current={current}
                />
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                  ref={addField}
                >
                  {translate('add_field')}
                </Button>
              </Form.Item>
            </>
          )
        }}
      </Form.List>
      <Divider dashed />
      <div style={{ position: 'relative', width: '100%', float: 'right' }}>
        <Row gutter={[12, -5]}>
          <Col className="gutter-row" span={5}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                icon={<PlusOutlined />}
                block
              >
                {translate('Save')}
              </Button>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={4} offset={10}>
            <p
              style={{
                paddingLeft: '12px',
                paddingTop: '5px',
                margin: 0,
                textAlign: 'right',
              }}
            >
              {translate('sub total:')}
            </p>
          </Col>
          <Col className="gutter-row" span={5}>
            <MoneyInputFormItem readOnly value={subTotal} />
          </Col>
        </Row>
        <Row gutter={[12, -5]}>
          <Col className="gutter-row" span={4} offset={15}>
            <Form.Item name="taxRate" rules={[{ required: true }]}>
              <SelectAsync
                value={taxRate}
                onChange={handleTaxChange}
                entity="taxes"
                outputValue={'taxValue'}
                displayLabels={['taxName']}
                withRedirect={true}
                urlToRedirect="/taxes"
                redirectLabel={translate('Add new tax')}
                placeholder={translate('select tax value')}
              />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={5}>
            <MoneyInputFormItem readOnly value={taxTotal} />
          </Col>
        </Row>
        <Row gutter={[12, -5]}>
          <Col className="gutter-row" span={4} offset={15}>
            <p
              style={{
                paddingLeft: '12px',
                paddingTop: '5px',
                margin: 0,
                textAlign: 'right',
              }}
            >
              {translate('Total:')}
            </p>
          </Col>
          <Col className="gutter-row" span={5}>
          <MoneyInputFormItem readOnly value={total}/></Col>
        </Row>
      </div>
    </>
  )
}
