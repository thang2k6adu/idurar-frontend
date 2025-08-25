import { useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ErpLayout from '~/layout/ErpLayout'
import { erp } from '~/redux/erp/actions'
import { selectReadItem } from '~/redux/erp/selector'
import PageLoader from '~/components/PageLoader'
import NotFound from '~/components/NotFound'
import ReadItem from '~/modules/ErpPanelModule/ReadItem'

export default function ReadQuoteModule({ config }) {
  const dispatch = useDispatch()
  const { id } = useParams()

  useLayoutEffect(() => {
    dispatch(erp.read({ entity: config.entity, id }))
  }, [id])

  const {
    result: currentResult,
    isSuccess,
    isLoading = true,
  } = useSelector(selectReadItem)

  if (isLoading) {
    return (
      <ErpLayout>
        <PageLoader />
      </ErpLayout>
    )
  } else {
    return (
      <ErpLayout>
        {isSuccess ? <ReadItem config={config} selectecItem={currentResult}/> : <NotFound entity={config.entity} />}
      </ErpLayout>
    )
  }
}
