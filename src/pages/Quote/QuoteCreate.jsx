import useLanguage from '~/locale/useLanguage'
import CreateQuoteModule from '~/modules/QuoteModule/CreateQuoteModule'

export default function QuoteCreate() {
  const translate = useLanguage()
  const entity = 'quote'
  const labels = {
    PANEL_TITLE: translate('Quote'),
    DATATABLE_TITLE: translate('Quote_list'),
    ADD_NEW_ENTITY: translate('add_new_quote'),
    ENTITY_NAME: translate('quote'),
  }

  const configPage = {
    entity,
    ...labels
  }

  return <CreateQuoteModule config={configPage}/>
}