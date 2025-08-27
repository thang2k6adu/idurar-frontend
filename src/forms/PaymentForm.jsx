import React from 'react'
import { DatePicker, Form, InputNumber, Input } from 'antd'
import useLanguage from '~/locale/useLanguage'
import { useSelector } from 'react-redux'
import { selectFinanceSettings } from '~/redux/settings/selectors'
import dayjs from 'dayjs'
import { useDate, useMoney } from '~/settings'
import SelectAsync from '~/components/SelectAsync'

export default function PaymentForm({ maxAmount }) {
  const { TextArea} = Input
  const translate = useLanguage()
  const { last_payment_number } = useSelector(selectFinanceSettings)
  const { dateFormat } = useDate()
  const money = useMoney()

  return (
    <>
      <Form.Item
        label={translate('number')}
        name="number"
        initialValue={last_payment_number + 1}
        rules={[{ required: true }]}
        style={{ width: '50%', float: 'left', paddingRight: '20px' }}
      >
        <InputNumber min={1} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        label={translate('Date')}
        name="date"
        initialValue={dayjs()}
        rules={[{ required: true, type: 'object' }]}
        style={{ width: '100%' }}
      >
        <DatePicker format={dateFormat} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        label={translate('amount')}
        name="amount"
        rules={[{ required: true }]}
      >
        <InputNumber
          min={0}
          controls={false}
          className="moneyInput"
          max={maxAmount}
          addonAfter={
            money.currency_position === 'after'
              ? money.currency_symbol
              : undefined
          }
          addonBefore={
            money.currency_position === 'before'
              ? money.currency_symbol
              : undefined
          }
        />
      </Form.Item>
      <Form.Item
        label={translate('payment mode')}
        name="paymentMode"
        rules={[{ required: true }]}
      >
        <SelectAsync
          entity={'paymentMode'}
          displayLabels={['name']}
          withRedirect={true}
          urlToRedirect="/payment/mode"
          redirectLabel="Add Payment Mode"
        ></SelectAsync>
      </Form.Item>
      <Form.Item label={translate('Reference')} name="ref">
        <Input />
      </Form.Item>
      <Form.Item label={translate('description')} name="description">
        <TextArea />
      </Form.Item>
    </>
  )
}
