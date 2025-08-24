import { PageHeader } from '@ant-design/pro-layout'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import useLanguage from '~/locale/useLanguage'
import { selectUpdatedItem } from '~/redux/erp/selector'
import { useEffect, useState } from 'react'
import { Button, Form, Divider } from 'antd'
import { CloseCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { generate as uniqueId } from 'shortid'
import Loading from '~/components/Loading'
import dayjs from 'dayjs'
import calculate from '~/utils/calculate'
import { erp } from '~/redux/erp/actions'

function SaveForm({ form, translate }) {
  const handleClick = () => {
    form.submit()
  }

  return (
    <Button onClick={handleClick} type="primary" icon={<PlusOutlined />}>
      {translate('update')}
    </Button>
  )
}

export default function UpdateItem({ config, UpdateForm }) {
  const navigate = useNavigate()
  const translate = useLanguage()
  const [form] = Form.useForm()
  const [subTotal, setSubTotal] = useState(0)
  const dispatch = useDispatch()
  const { id } = useParams()

  const { current, isLoading, isSuccess } = useSelector(selectUpdatedItem)
  const { entity } = config
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

  const [currentErp, setCurrentErp] = useState(current ?? resetErp)

  const onSubmit = (fieldsValue) => {
    let dataToUpdate = { ...fieldsValue }
    if (fieldsValue) {
      if (fieldsValue.date) {
        dataToUpdate.date = dayjs(fieldsValue.date).format('YYYY-MM-DDTHH:mm:ss.SSSZ')
      }
      if (fieldsValue.expiredDate) {
        dataToUpdate.expiredDate = dayjs(fieldsValue.expiredDate).format(
          'YYYY-MM-DDTHH:mm:ss.SSSZ'
        )
      }

      if (fieldsValue.items) {
        let newList = []
        fieldsValue.items.forEach((item) => {
          const { quantity, price, itemName, description } = item
          const total = item.quantity * item.price
          newList.push({ total, quantity, price, itemName, description })
        })
        dataToUpdate.items = newList
      }
    }
    dispatch(erp.update({ entity, id, jsonData: dataToUpdate }))
  }

  useEffect(() => {
    if (current) {
      setCurrentErp(current)
      let formData = { ...current }
      // iso cần được chuyển thành dayjs object để có thể select được
      if (formData.date) {
        formData.date = dayjs(formData.date)
      }
      if (formData.expiredDate) {
        formData.expiredDate = dayjs(formData.expiredDate)
      }
      if (!formData.taxRate) {
        formData.taxRate = 0
      }handleValuesChange
      const { subTotal } = formData

      form.resetFields()
      form.setFieldsValue(formData)
      setSubTotal(subTotal)
    }
  }, [current])

  useEffect(() => {
    if (isSuccess) {
      form.resetFields()
      setSubTotal(0)
      dispatch(erp.resetAction({ actionType: 'update' }))
      navigate(`/${entity.toLowerCase()}/read/${id}`)
    }
  }, [isSuccess])

  const handleValuesChange = (changedValues, allValues) => {
    const items = allValues.items
    let subTotal = 0

    if (items) {
      items.forEach((item) => {
        if (item) {
          if (item.quantity && item.price) {
            let total = calculate.multiply(item.quantity, item.price)
            subTotal = calculate.add(subTotal, total)
          }
        }
      })
      setSubTotal(subTotal)
    }
  }

  return (
    <PageHeader
      onBack={() => {
        navigate(`/${entity.toLowerCase()}`)
      }}
      title={translate('update')}
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
          key={`${uniqueId()}`}
          onClick={() => {
            navigate(`/${entity.toLowerCase()}`)
          }}
          icon={<CloseCircleOutlined />}
        >
          {translate('Cancel')}
        </Button>,
        <SaveForm translate={translate} form={form} key={uniqueId()} />,
      ]}
      style={{
        padding: '20px 0',
      }}
    >
      <Divider dashed />
      <Loading isLoading={isLoading}>
        <Form form={form} layout="vertical" onFinish={onSubmit} onValuesChange={handleValuesChange}>
          <UpdateForm subTotal={subTotal} current={current}/>
        </Form>
      </Loading>
    </PageHeader>
  )
}
