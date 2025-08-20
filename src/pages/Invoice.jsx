import ErpLayout from '~/layout/ErpLayout'
import ErpPanel from '~/modules/ErpPanelModule'
import useLanguage from '~/locale/useLanguage'
import { useDate, useMoney } from '~/settings'
import dayjs from 'dayjs'
import { CreditCardOutlined } from '@ant-design/icons'
import { CrudContextProvider } from '~/context/crud'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ErpContextProvider } from '~/context/erp'

export default function Invoice() {
  const translate = useLanguage()
  const { dateFormat } = useDate()
  const entity = 'invoice'
  const { moneyFormatter } = useMoney()

  const searchConfig = {
    entity: 'client',
    dispayLabels: ['name'],
    searchFields: 'name',
  }

  const deleteModalLabels = ['number', 'client.name']

  const dataTableColumns = [
    {
      title: translate('Number'),
      dataIndex: 'number',
    },
    {
      title: translate('client'),
      // access thuoc tinh long nhau record.client.name
      dataIndex: ['client', 'name'],
    },
    {
      title: translate('date'),
      dataIndex: 'date',
      render: (date) => {
        return dayjs(date).format(dateFormat)
      },
    },
    {
      title: translate('expired date'),
      dataIndex: 'expiredDate',
      render: (date) => {
        return dayjs(date).format(dateFormat)
      },
    },
    {
      title: translate('Total'),
      dataIndex: 'total',
      // Modify html attribute of a cell (of row)
      onCell: () => {
        return {
          textAlign: 'right',
          // Gộp nhiều khoảng trắng thành 1 và ko cho xuống dòng
          whiteSpace: 'nowrap',
          direction: 'ltr',
        }
      },
      render: (total, record) => {
        // Currency_code is chữ cái tiền tệ
        return moneyFormatter({ amount: total, currency_code: record.currency })
      },
    },
    {
      title: translate('Status'),
      dataIndex: 'status',
    },
    {
      title: translate('Payment'),
      dataIndex: 'paymentStatus',
    },
  ]

  const Labels = {
    PANEL_TITLE: translate('invoice'),
    DATATABLE_TITLE: translate('invoice_list'),
    ADD_NEW_ENTITY: translate('add_new_invoice'),
    ENTITY_NAME: translate('invoice'),
    RECORD_ENTITY: translate('record_payment'),
  }

  const configPage = {
    entity,
    ...Labels,
  }

  const config = {
    ...configPage,
    dataTableColumns,
    searchConfig,
    deleteModalLabels,
  }

  return (
    <ErpContextProvider>
      <ErpLayout>
        <ErpPanel
          config={config}
          extra={[
            {
              label: translate('Record Payment'),
              key: 'recordPayment',
              icon: <CreditCardOutlined />,
            },
          ]}
        />
      </ErpLayout>
    </ErpContextProvider>
  )
}
