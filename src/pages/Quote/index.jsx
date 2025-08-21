import dayjs from 'dayjs'
import useLanguage from '~/locale/useLanguage'
import { useDate, useMoney } from '~/settings'
import QuoteDataTableModule from '~/modules/QuoteModule/QuoteDataTableModule'

export default function Quote() {
  const translate = useLanguage()
  const { dateFormat } = useDate()
  const entity = 'quote'
  const { moneyFormatter } = useMoney()

  // Cần searchConfig
  const searchConfig = {
    entity: 'client',
    displayLabels: ['name'],
    searchFields: 'name',
  }

  const deleteModalLabels = ['number', 'client.name']
  const dataTableColumns = [
    {
      title: translate('number'),
      dataIndex: 'number',
    },
    {
      title: translate('Client'),
      dataIndex: ['client', 'name'],
    },
    {
      title: translate('Date'),
      dataIndex: 'date',
      render: (date) => {
        return dayjs(date).format(dateFormat)
      },
    },
    {
      title: translate('Expired Date'),
      dataIndex: 'expiredDate',
      render: (date) => {
        return dayjs(date).format(dateFormat)
      },
    },
    {
      title: translate('Sub Total'),
      dataIndex: 'subTotal',
      onCell: () => {
        return {
          style: {
            textAlign: 'right',
            whiteSpace: 'nowrap',
            direction: 'ltr',
          },
        }
      },
      render: (subTotal, record) =>
        moneyFormatter({ amount: subTotal, currency_code: record.currency }),
    },
    {
      title: translate('Total'),
      dataIndex: 'total',
      onCell: () => {
        return {
          style: {
            textAlign: 'right',
            whiteSpace: 'nowrap',
            direction: 'ltr',
          },
        }
      },
      render: (total, record) =>
        moneyFormatter({ amount: total, currency_code: record.currency }),
    },
    {
      title: translate('Status'),
      dataIndex: 'status',
    },
  ]

  const labels = {
    PANEL_TITLE: translate('proforma invoice'),
    DATATABLE_TITLE: translate('proforma invoice_list'),
    ADD_NEW_ENTITY: translate('add_new_proforma invoice'),
    ENTITY_NAME: translate('proforma invoice'),
  }

  const configPage = {
    entity,
    ...labels,
  }

  const config = {
    ...configPage,
    dataTableColumns,
    searchConfig,
    deleteModalLabels,
  }

  return <QuoteDataTableModule config={config}/>
}
