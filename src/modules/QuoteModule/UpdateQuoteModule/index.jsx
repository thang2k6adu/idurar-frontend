import { useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import ErpLayout from '~/layout/ErpLayout'
import { selectCurrentItem, selectReadItem, selectUpdatedItem } from '~/redux/erp/selector'
import PageLoader from '~/components/PageLoader'
import NotFound from '~/components/NotFound'
import { erp } from '~/redux/erp/actions'
import UpdateItem from '~/modules/ErpPanelModule/UpdateItem'
import QuoteForm from '../Forms/QuoteForm'

export default function UpdateQuoteModule({ config }) {
  const dispatch = useDispatch()

  const { id } = useParams()
  const navigate = useNavigate()

  useLayoutEffect(() => {
    dispatch(erp.read({ entity: config.entity, id }))
  }, [id])

  const {
    result: currentResult,
    isSuccess,
    isLoading = true,
  } = useSelector(selectReadItem)

  useLayoutEffect(() => {
    if (currentResult) {
      dispatch(erp.currentAction({ actionType: 'update', data: currentResult }))
    }
  }, [currentResult])

  if (isLoading) {
    return (
      <ErpLayout>
        <PageLoader />
      </ErpLayout>
    )
  } else {
    return (
      <ErpLayout>
        {isSuccess ? (
          <UpdateItem config={config} UpdateForm={QuoteForm}/>
        ) : (
          <NotFound entity={config.entity} />
        )}
      </ErpLayout>
    )
  }
}
