import { useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useErpContext } from '~/context/erp'
import { erp } from '~/redux/erp/actions'

import Delete from './DeleteItem'
import DataTable from './DataTable'

export default function ErpPanel({ config, extra }) {
  const dispatch = useDispatch()
  const { state } = useErpContext()
  const { deleteModal } = state

  const dispatcher = () => {
    dispatch(erp.resetState())
  }

  useLayoutEffect(() => {
    const controller = new AbortController()
    // old request can run when app state is reset, so if we dont abort
    // It can lead to memory leak or override new data
    dispatcher()
    return () => {
      controller.abort()
    }
  }, [])

  return <>
    <Delete config={config} isOpen={deleteModal.isOpen} />
    <DataTable config={config} extra={extra}></DataTable>
  </>
}
