import { CreditCardOutlined } from '@ant-design/icons'
import ErpLayout from '~/layout/ErpLayout'
import useLanguage from '~/locale/useLanguage'
import ErpPanel from '~/modules/ErpPanelModule'

export default function InvoiceDataTableModule({ config }) {
  const translate = useLanguage()
  return (
    <ErpLayout>
      <ErpPanel
        config={config}
        extra={[
          {
            label: translate('record_payment'),
            key: 'recordPayment',
            icon: <CreditCardOutlined />,
          },
        ]}
      ></ErpPanel>
    </ErpLayout>
  )
}
