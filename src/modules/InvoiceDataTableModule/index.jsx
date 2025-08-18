import { CreditCardOutlined } from '@ant-design/icons';
import ErpLayout from '~/layout/ErpLayout'
import useLanguage from '~/locale/useLanguage'

export default function InvoiceDataTableModule({config}) {
  const translate = useLanguage()

  const extra=[{
    label: translate('Record Payment'),
    key: 'recordPayment',
    icon: <CreditCardOutlined />
  }]

  return <ErpLayout></ErpLayout>
}