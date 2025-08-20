import { Modal } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useErpContext } from '~/context/erp'
import { erp } from '~/redux/erp/actions'
import { selectDeletedItem } from '~/redux/erp/selector'

export default function Delete({ config }) {
  let {
    entity,
    deleteModalLabel,
    deleteMessage = 'Do you want to delete: ',
    modalTitle = 'Remove Item',
  } = config

  const dispatch = useDispatch()
  const { current, isLoading, isSuccess } = useSelector(selectDeletedItem)
  const { state, erpContextActions } = useErpContext()
  const { deleteModal } = state
  const { modal } = erpContextActions
  const [displayItem, setDisplayItem] = useState('')

  useEffect(() => {
    if (isSuccess) {
      modal.close()
      const options = { page: 1, items: 10 }
      dispatch(erp.list({ entity, options }))
    }
    if (current) {
      let labels = deleteModalLabel
        .map((x) => valueByString(current, x))
        .join(' ')

      setDisplayItem(labels)
    }
  }, [isSuccess, current])

  const handleOk = () => {
    const id = current._id
    dispatch(erp.delete({ entity, id }))
    modal.close()
  }

  const handleCancel = () => {
    if (!isLoading) modal.close()
  }
  return (
    <Modal
      title={modalTitle}
      open={deleteModal.isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={isLoading}
    >
      <p>
        {deleteMessage}
        {displayItem}
      </p>
    </Modal>
  )
}
