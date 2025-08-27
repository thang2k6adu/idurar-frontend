import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ErpLayout from '~/layout/ErpLayout'
import { selectItemById, selectCurrentItem } from '~/redux/erp/selector'
import { useEffect } from 'react'
import { erp } from '~/redux/erp/actions'
import Payment from './component/Payment'
import PageLoader from '~/components/PageLoader'

export default function RecordPaymentModule({ config }) {
  const dispatch = useDispatch()
  const { id } = useParams()

  // Lấy trực tiếp item theo id
  let item = useSelector(selectItemById(id))
  const fallbackItem = useSelector(selectCurrentItem)

  item = item || fallbackItem

  // Nếu item chưa có trong store, fetch từ backend
  useEffect(() => {
    if (!item) {
      dispatch(erp.read({ entity: config.entity, id }))
    }
  }, [item?._id, id, dispatch])

  return (
    <ErpLayout>
      {item ? <Payment config={config} currentItem={item} /> : <PageLoader />}
    </ErpLayout>
  )
}
