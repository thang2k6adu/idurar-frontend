import {
  EyeOutlined,
  EllipsisOutlined,
  EditOutlined,
  FilePdfOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
  RedoOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { PageHeader } from '@ant-design/pro-layout'
import { Button, Dropdown, Table } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { DOWNLOAD_BASE_URL } from '~/config/serverApiConfig'
import useLanguage from '~/locale/useLanguage'
import { erp } from '~/redux/erp/actions'
import { selectListItems } from '~/redux/erp/selector'
import { generate as uniqueId } from 'shortid'
import { useErpContext } from '~/context/erp'
import { selectDeletedItem } from '~/redux/erp/selector'

function AddNewItem({ config }) {
  const navigate = useNavigate()
  const { ADD_NEW_ENTITY, entity } = config

  const handleClick = () => {
    navigate(`/${entity.toLowerCase()}/create`)
  }

  return (
    <Button onClick={handleClick} type="primary" icon={<PlusOutlined />}>
      {ADD_NEW_ENTITY}
    </Button>
  )
}

export default function DataTable({ config, extra = [] }) {
  const translate = useLanguage()
  let { entity, dataTableColumns, disableAdd = false, searchConfig } = config

  const { DATATABLE_TITLE } = config
  const { result: listResult, isLoading: listIsLoading } =
    useSelector(selectListItems)
  const { pagination, items: dataSource } = listResult
  const { erpContextActions } = useErpContext()
  const { modal } = erpContextActions
  const items = [
    {
      label: translate('Show'),
      key: 'read',
      icon: <EyeOutlined />,
    },
    {
      label: translate('edit'),
      key: 'edit',
      icon: <EditOutlined />,
    },
    {
      label: translate('download'),
      key: 'download',
      icon: <FilePdfOutlined />,
    },
    ...extra,
    {
      type: 'divider',
    },
    {
      label: translate('delete'),
      key: 'delete',
      icon: <DeleteOutlined />,
    },
  ]

  const navigate = useNavigate()

  const handleRead = (record) => {
    dispatch(erp.currentItem({ data: record }))
    navigate(`/${entity}/read/${record._id}`)
  }
  const handleEdit = (record) => {
    const data = { ...record }
    dispatch(erp.currentAction({ actionType: 'update', data }))
    navigate(`/${entity}/update/${record._id}`)
  }
  const handleDownload = (record) => {
    // _ blank help to navigate to new tab
    window.open(
      `${DOWNLOAD_BASE_URL}/${entity}/${entity}-${record._id}.pdf`,
      '_blank'
    )
  }

  const handleDelete = (record) => {
    dispatch(erp.currentAction({ actionType: 'delete', data: record }))
    modal.close()
  }
  const handleRecordPayment = (record) => {
    dispatch(erp.currentItem({ data: record }))
    navigate(`/invoice/pay/${record._id}`)
  }

  dataTableColumns = [
    ...dataTableColumns,
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
                case 'download':
                  handleDownload(record)
                  break
                case 'delete':
                  handleDelete(record)
                  break
                case 'recordPayment':
                  handleRecordPayment(record)
                  break
                default:
                  break
              }
            },
          }}
          trigger={['click']}
        >
          <EllipsisOutlined
            style={{ cursor: 'pointer', fontSize: '24px' }}
            onClick={(e) => {
              e.preventDefault()
            }}
          />
        </Dropdown>
      ),
    },
  ]

  const dispatch = useDispatch()
  const handleDataTableLoad = (pagination) => {
    const options = {
      page: pagination.current || 1,
      items: pagination.pageSize || 10,
    }

    dispatch(erp.list({ entity, options }))
  }

  const dispatcher = () => {
    dispatch(erp.list({ entity }))
  }

  useEffect(() => {
    const controller = new AbortController()
    dispatcher()
    // giả sử đang trang này chuyến nhanh sang trang khác (chưa kijhp gọi xong API)
    // Thì nếu không Abort các cái API đó thì sẽ override các api của page khác
    return () => {
      controller.abort()
    }
  }, [])

  const filterTable = (value) => {
    // entity ở đây là trường cần tìm
    const options = { equal: value, filter: searchConfig?.entity }
    dispatch(erp.list({ entity, options }))
  }

  return (
    <>
      <PageHeader
        title={DATATABLE_TITLE}
        ghost={true}
        onBack={() => window.history.back()}
        backIcon={<ArrowLeftOutlined />}
        extra={[
          <Button
            onClick={handleDataTableLoad}
            key={uniqueId()}
            icon={<RedoOutlined />}
          >
            {translate('refresh')}
          </Button>,
          // disableAdd có thể được dùng trong (payment - ko được tạo vớ vẩn)
          !disableAdd && <AddNewItem config={config} key={uniqueId()} />,
        ]}
      ></PageHeader>
      <Table
        columns={dataTableColumns}
        rowKey={(item) => item._id}
        dataSource={dataSource}
        // Pagination in this case is current page
        pagination={pagination}
        loading={listIsLoading}
        onChange={handleDataTableLoad}
        scroll={{ x: true }}
      />
    </>
  )
}
