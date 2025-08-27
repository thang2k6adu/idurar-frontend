import React, { useEffect, useState } from 'react'
import Loading from '~/components/Loading'
import { selectRecordPaymentItem } from '~/redux/erp/selector'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'antd'
import { erp } from '~/redux/erp/actions'
import calculate from '~/utils/calculate'
import { useNavigate } from 'react-router-dom'
import PaymentForm from '~/forms/PaymentForm'
import useLanguage from '~/locale/useLanguage'
import { settingsAction } from '~/redux/settings/actions'
import { current } from '@reduxjs/toolkit'

export default function RecordPayment({ config }) {
  const {
    isLoading,
    isSuccess,
    current: currentInvoice,
  } = useSelector(selectRecordPaymentItem)

  const { entity } = config

  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [maxAmount, setMaxAmount] = useState(0)
  const navigate = useNavigate()
  const translate = useLanguage()

  useEffect(() => {
    if (currentInvoice) {
      const { credit, total, discount } = currentInvoice
      setMaxAmount(calculate.sub(calculate.sub(total, discount), credit))
    }
  }, [currentInvoice])

  useEffect(() => {
    if (isSuccess) {
      form.resetFields()
      dispatch(erp.resetAction({ actionType: 'recordPayment' }))
      dispatch(erp.list({ entity }))
      navigate(`/${entity}`)
    }
  }, [isSuccess, entity])

  const onSubmit = (fieldsValue) => {
    if (currentInvoice) {
      const { _id: invoice } = currentInvoice
      const client = currentInvoice.client && currentInvoice.client._id
      fieldsValue = {
        ...fieldsValue,
        invoice,
        client,
      }
    }

    dispatch(
      erp.recordPayment({
        entity: 'payment',
        jsonData: fieldsValue,
      })
    )

    dispatch(  
      settingsAction.update({  
        entity: 'setting',  
        settingKey: 'last_payment_number',  
        jsonData: {  
          settingValue: fieldsValue.number,  
        },  
      })  
    )
  }

  return (
    <Loading isLoading={isLoading}>
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <PaymentForm maxAmount={maxAmount}></PaymentForm>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {translate('record payment')}
          </Button>
        </Form.Item>
      </Form>
    </Loading>
  )
}
