import dayjs from 'dayjs'
import useLanguage from '~/locale/useLanguage'
import PaymentDataTableModule from '~/modules/PaymentModule/PaymentDataTableModule'
import { useDate, useMoney } from '~/settings'

export default function Payment() {
  const translate = useLanguage()
  const { dateFormat } = useDate()
  const { moneyFormatter } = useMoney()

  // searchConfig sẽ không dùng
  const searchConfig = {
    entity: 'client',
    displayLabels: ['number'],
    searchFields: 'number',
    outputValue: '_id',
  }

  const deleteModalLabels = ['number']
  const dataTableColumns = [
    { title: translate('Number'), dataIndex: 'number' },
    { title: translate('Client'), dataIndex: ['client', 'name'] },
    {
      title: translate('amount'),
      dataIndex: 'amount',
      onCell: () => {
        return {
          style: {
            textAlign: 'right',
            whiteSpace: 'nowrap',
            direction: 'ltr',
          },
        }
      },
      render: (amount, record) =>
        moneyFormatter({ amount: amount, currency_code: record.currency }),
    },
    {
      title: translate('date'),
      dataIndex: 'date',
      render: (date, record) => dayjs(date).format(dateFormat),
    },
    {
      title: translate('Number'),
      dataIndex: ['invoice', 'number'],
    },
    {
      title: translate('year'),
      dataIndex: ['invoice', 'year'],
    },
    {
      title: translate('Payment Mode'),
      dataIndex: ['paymentMode', 'name'],
    },
  ]

  const entity = 'payment'

  const labels = {
    PANEL_TITLE: translate('payment'),
    DATATABLE_TITLE: translate('payment_list'),
    ADD_NEW_ENTITY: translate('add_new_payment'),
    ENTITY: translate('payment'),
  }

  const configPage = { entity, ...labels }

  const config = {
    ...configPage,
    disableAdd: true,
    dataTableColumns,
    searchConfig,
    deleteModalLabels,
  }

  return <PaymentDataTableModule config={config} />
}
