import React from 'react'
import ErpLayout from '~/layout/ErpLayout'
import ErpPanel from '~/modules/ErpPanelModule'

export default function PaymentDataTableModule({ config }) {
  return (
    <ErpLayout>
      <ErpPanel config={config} />
    </ErpLayout>
  )
}
