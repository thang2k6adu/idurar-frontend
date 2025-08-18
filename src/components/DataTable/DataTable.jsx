import { ArrowLeftOutlined, EyeOutlined, RedoOutlined, EllipsisOutlined } from '@ant-design/icons'
import { PageHeader } from '@ant-design/pro-layout'
import { Input, Table, Dropdown } from 'antd'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { crud } from '~/redux/crud/actions'
import { Button } from 'antd'
import { generate as uniqueId } from 'shortid'

import useLanguage from '~/locale/useLanguage'
import { useCrudContext } from '~/context/crud'
import { dataForTable } from '~/utils/dataStructure'
import { selectListItems } from '~/redux/crud/selectors'

function AddNewItem({ config }) {
  const { crudContextAction } = useCrudContext()
  const { collapsedBox, panel } = crudContextAction
  const { ADD_NEW_ENTITY } = config

  const handelClick = () => {
    panel.open()
    collapsedBox.close()
  }

  return (
    <Button onClick={handelClick} type="primary">
      {ADD_NEW_ENTITY}
    </Button>
  )
}

export default function DataTable({ config, extra = [] }) {
  const dispatch = useDispatch()
  const translate = useLanguage()

  let { entity, dataTableColumns, DATATABLE_TITLE, fields, searchConfig } =
    config

  const items = [
    { label: translate('Show'), key: 'read', icon: <EyeOutlined /> },
    { label: translate('Edit'), key: 'edit', icon: <EyeOutlined /> },
    ...extra,
    {
      type: 'divider',
    },
    { label: translate('Delete'), key: 'delete', icon: <EyeOutlined /> },
  ]

  let dispatchColumns = []
  if (fields) {
    dispatchColumns = [
      ...dataForTable({ fields, translate, moneyFormatter, dateFormat }),
    ]
  } else {
    dispatchColumns = [...dataTableColumns]
  }

  const handleRead = (record) => {
    dispatch(crud.currentItem({ data: record }))
    panel.open()
    collapsedBox.open()
    readBox.open()
  }
  function handleEdit(record) {
    dispatch(crud.currentItem({ data: record }))
    dispatch(crud.currentAction({ actionType: 'update', data: record }))
    editBox.open()
    panel.open()
    collapsedBox.open()
  }
  function handleDelete(record) {
    dispatch(crud.currentAction({ actionType: 'delete', data: record }))
    modal.open()
  }

  function handleUpdatePassword(record) {
    dispatch(crud.currentItem({ data: record }))
    dispatch(crud.currentAction({ actionType: 'update', data: record }))
    advancedBox.open()
    panel.open()
    collapsedBox.open()
  }

  dataTableColumns = [
    ...dispatchColumns,
    {
      title: '',
      key: 'action',
      fixed: 'right',
      render: (_, record) => (
        <Dropdown
          menu={{
            items,
            onClick: ({ key }) => {
              switch (key) {
                case 'read':
                  handleRead(record)
                  break
                case 'edit':
                  handleEdit(record)
                  break

                case 'delete':
                  handleDelete(record)
                  break
                case 'updatePassword':
                  handleUpdatePassword(record)
                  break

                default:
                  break
              }
              // else if (key === '2')handleCloseTask
            },
          }}
          trigger={['click']}
        >
          <EllipsisOutlined
            style={{ cursor: 'pointer', fontSize: '24px' }}
            onClick={(e) => e.preventDefault()}
          />
        </Dropdown>
      ),
    },
  ]

  const { result: listResult, isLoading: listIsLoading } =
    useSelector(selectListItems)

  const { pagination, items: dataSource } = listResult

  const filterTable = (e) => {
    const value = e.taget.value
    const options = { q: value, fields: searchConfig?.searchFields || '' }
    dispatch(crud.list({ entity, options }))
  }

  const handleDataTableLoad = useCallback((pagination) => {
    const options = {
      page: pagination.current || 1,
      items: pagination.pageSize || 10,
    }
    dispatch(crud.list({ entity, options }))
  }, [])

  return (
    <PageHeader
      onBack={() => window.history.back()}
      backIcon={<ArrowLeftOutlined />}
      title={DATATABLE_TITLE}
      // have background white
      ghost={false}
      extra={[
        <Input
          key="searchFilterDataTable"
          onChange={filterTable}
          placeholder={translate('search')}
          allowClear
        />,
        <Button
          onClick={handleDataTableLoad}
          key={uniqueId()}
          icon={<RedoOutlined />}
        >
          {translate('refresh')}
        </Button>,
        <AddNewItem key={uniqueId()} config={config} />,
      ]}
    >
      <Table
        columns={dataTableColumns}
        rowKey={(item) => item._id}
        dataSource={dataSource}
        pagination={pagination}
        loading={listIsLoading}
        onChange={handleDataTableLoad}
        scroll={{ x: true }}
      ></Table>
    </PageHeader>
  )
}
