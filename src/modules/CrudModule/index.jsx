import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { current } from '@reduxjs/toolkit'
import { Row, Col, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useCrudContext } from '~/context/crud'
import CrudLayout from '~/layout/CrudLayout'
import useLanguage from '~/locale/useLanguage'
import { crud } from '~/redux/crud/actions'
import { selectCurrentItem } from '~/redux/crud/selectors'
import SearchItem from '~/components/SearchItem'
import ReadItem from '~/components/ReadItem'
import UpdateForm from '~/components/UpdateForm'
import CreateForm from '~/components/CreateForm'
import DeleteModal from '~/components/DeleteModal'
import DataTable from '~/components/DataTable/DataTable'

function FixHeaderPanel({ config }) {
  const { crudContextAction } = useCrudContext()
  const { collapsedBox } = crudContextAction
  const addNewItem = () => {
    collapsedBox.open()
  }

  return (
    <Row gutter={8}>
      <Col className="gutter-row" span={21}>
        <SearchItem config={config} />
      </Col>
      <Col className="gutter-row" span={3}>
        <Button onClick={addNewItem} block={true} icon={<PlusOutlined />} />
      </Col>
    </Row>
  )
}

function SidePanelTopContent({ config, formElements, withUpload }) {
  const translate = useLanguage()
  const { crudContextAction, state } = useCrudContext()
  const { deleteModalLabels } = config
  const { modal, editBox } = crudContextAction
  const { result: currentItem } = useSelector(selectCurrentItem)
  const [labels, setLabels] = useState('')
  const dispatch = useDispatch()
  
  useEffect(() => {
    if (currentItem) {
      const currentLabels = deleteModalLabels
        .map((x) => currentItem[x])
        .join(' ')

      setLabels(currentLabels)
    }
  }, [currentItem, deleteModalLabels])

  const { isReadBoxOpen, isEditBoxOpen } = state

  const removeItem = () => {
    dispatch(crud.currentAction({ actionType: 'delete', data: currentItem }))
    modal.open()
  }
  const editItem = () => {
    dispatch(crud.currentAction({ actionType: 'update', data: currentItem }))
    editBox.open()
  }

  const show = isReadBoxOpen || isEditBoxOpen ? { opacity: 1 } : { opacity: 0 }
  return (
    <>
      <Row style={show} gutter={(24, 24)}>
        <Col className="gutter-row" span={10}>
          <p style={{ marginBottom: '10px' }}>{labels}</p>
        </Col>
        <Col className="gutter-row" span={14}>
          <Button
            onClick={removeItem}
            type="text"
            icon={<DeleteOutlined />}
            size="small"
            style={{ float: 'right', marginLeft: '5px', marginTop: '10px' }}
          >
            {translate('remove')}
          </Button>
          <Button
            onClick={editItem}
            type="text"
            icon={<EditOutlined />}
            size="small"
            style={{ float: 'right', marginLeft: '5px', marginTop: '10px' }}
          >
            {translate('edit')}
          </Button>
        </Col>
        <Col span={24}>
          <div className="line" />
        </Col>
        <div className="space10" />
      </Row>
      <ReadItem config={config} />
      <UpdateForm
        config={config}
        formElements={formElements}
        withUpload={withUpload}
      />
    </>
  )
}

export default function CrudModule({
  config,
  createForm,
  updateForm,
  withUpload = false,
}) {
  const dispatch = useDispatch()
  useLayoutEffect(() => {
    dispatch(crud.resetState())
  })

  return (
    <CrudLayout
      config={config}
      fixHeaderPanel={<FixHeaderPanel config={config} />}
      sidePanelTopContent={
        <SidePanelTopContent
          config={config}
          formElements={updateForm}
          withUpload={withUpload}
        />
      }
      sidePanelBottomContent={
        <CreateForm
          config={config}
          formElements={createForm}
          withUpload={withUpload}
        />
      }
    >
      <DataTable config={config} />
      <DeleteModal config={config} />
    </CrudLayout>
  )
}
