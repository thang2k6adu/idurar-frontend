import {
  ArrowLeftOutlined,
  CloseCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { PageHeader } from '@ant-design/pro-layout'
import { Button, Tag, Divider, Form } from 'antd'
import { useNavigate } from 'react-router-dom'
import useLanguage from '~/locale/useLanguage'
import { generate as uniqueId } from 'shortid'
import Loading from '~/components/Loading'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { settingsAction } from '~/redux/settings/actions'
import { selectCreatedItem } from '~/redux/erp/selector'
import { erp } from '~/redux/erp/actions'
import calculate from '~/utils/calculate'

function SaveForm({ form }) {
  const translate = useLanguage()
  const handleClick = () => {
    form.submit()
  }

  return (
    <Button onClick={handleClick} type="primary" icon={<PlusOutlined />}>
      {translate('Save')}
    </Button>
  )
}

export default function CreateItem({ config, CreateForm }) {
  const navigate = useNavigate()
  const translate = useLanguage()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(settingsAction.list({ entity: 'setting' }))
  }, [])

  const handleValuesChange = (changedValues, allValues) => {
    const items = allValues['items']

    let subTotal = 0
    let subOfferTotal = 0

    if (items) {
      items.forEach((item) => {
        if (item) {
          if (item.offerPrice && item.quantity) {
            let offerTotal = calculate.multiply(item.quantity, item.offerPrice)
            subOfferTotal = calculate.add(subOfferTotal, offerTotal)
          }
          if (item.quantity && item.price) {
            let total = calculate.multiply(item.quantity, item.price)
            subTotal = calculate.add(subTotal, total)
          }
        }
      })
      setSubTotal(subTotal)
      setOfferSubTotal(subOfferTotal)
    }
  }

  let { entity } = config
  const { isLoading, isSuccess, result } = useSelector(selectCreatedItem)
  // useForm trả về array với Form Instance ở đầu tiên
  // form này quản lý form state và validation
  // reset form sau khi submit thành công: resetFields()
  // set giá trị cho form fields: setFieldsValue
  // trigger submission
  // Populate form với data
  const [form] = Form.useForm()
  const [subTotal, setSubTotal] = useState(0)
  const [offerSubtotal, setOfferSubTotal] = useState(0)

  useEffect(() => {
    if (isSuccess) {
      form.resetFields()
      dispatch(erp.resetAction({ actionType: 'create' }))
      setSubTotal(0)
      setOfferSubTotal(0)
      navigate(`/${entity.toLowerCase()}/read/${result._id}`)
    }
  }, [isSuccess])

  const onSubmit = (fieldsValue) => {
    if (fieldsValue) {
      if (fieldsValue.items) {
        let newList = [...fieldsValue.items]
        newList.forEach((item) => {
          item.total = calculate.multiply(item.quantity, item.price)
        })
        fieldsValue = {
          ...fieldsValue,
          items: newList,
        }
      }
    }
    dispatch(erp.create({ entity, jsonData: fieldsValue }))
  }

  return (
    <>
      <PageHeader
        onBack={() => {
          navigate(`/${entity.toLowerCase()}`)
        }}
        backIcon={<ArrowLeftOutlined />}
        title={translate('new')}
        ghost={false}
        tags={<Tag>{translate('Draft')}</Tag>}
        extra={[
          <Button
            key={uniqueId()}
            onClick={() => navigate(`/${entity.toLowerCase()}`)}
            icon={<CloseCircleOutlined />}
          >
            {translate('Cancel')}
          </Button>,
          <SaveForm key={uniqueId()} form={form} />,
        ]}
      />
      <Divider dashed />
      <Loading isLoading={isLoading}>
        <Form form={form} layout="vertical" onValuesChange={handleValuesChange} onFinish={onSubmit}>
          <CreateForm subTotal={subTotal} offerSubtotal={offerSubtotal} />
        </Form>
      </Loading>
    </>
  )
}
