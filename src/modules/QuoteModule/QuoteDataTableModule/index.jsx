import ErpLayout from '~/layout/ErpLayout'
import ErpPanel from '~/modules/ErpPanelModule'

export default function QuoteDataTableModule({ config }) {
  return (
    <ErpLayout>
      <ErpPanel config={config} />
    </ErpLayout>
  )
}
