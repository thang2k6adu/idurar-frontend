import ErpLayout from '~/layout/ErpLayout'
import CreateItem from '~/modules/ErpPanelModule/CreateItem'
import QuoteForm from '../Forms/QuoteForm'

export default function CreateQuoteModule({ config }) {
  return (
    <ErpLayout>
      <CreateItem config={config} CreateForm={QuoteForm}/>
    </ErpLayout>
  )
}
