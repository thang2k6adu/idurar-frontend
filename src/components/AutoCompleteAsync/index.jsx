import { Select, Empty } from 'antd'
import { useEffect, useRef, useState } from 'react'
import useOnFetch from '~/hooks/useOnFetch'
import useLanguage from '~/locale/useLanguage'
import useDebounce from '~/hooks/useDebounce'
import { request } from '~/request/request'
import { useNavigate } from 'react-router-dom'

export default function AutoCompleteAsync({
  entity,
  displayLabels,
  searchFields,
  outputValue = '_id',
  redirectLabel = 'Add new',
  withRedirect = false,
  urlToRedirect = '/',
  value, // This is for update
  onChange, // This is for update
}) {
  let { onFetch, result, isSuccess, isLoading } = useOnFetch()
  const translate = useLanguage()
  const navigate = useNavigate()

  const [searching, setSearching] = useState(false)
  const [valToSearch, setValToSearch] = useState('')
  const [selectOptions, setSelectOptions] = useState([])
  const [debouncedValue, setDebouncedValue] = useState('')
  const [currentValue, setCurrentValue] = useState(undefined)

  const [, cancel] = useDebounce(
    () => {
      setDebouncedValue(valToSearch)
    },
    500,
    [valToSearch]
  )

  const asyncSearch = (options) => {
    return request.search({ entity, options })
  }

  useEffect(() => {
    const options = {
      q: debouncedValue,
      fields: searchFields,
    }

    const callback = asyncSearch(options)
    onFetch(callback)

    return () => {
      cancel()
    }
  }, [debouncedValue])

  useEffect(() => {
    if (isSuccess) {
      setSelectOptions(result)
    } else {
      setSearching(false)
    }
  }, [isSuccess, result])

  useEffect(() => {
    if (value && isUpdating.current) {
      console.log('value', value)
      setSelectOptions([value])
      setCurrentValue(value[outputValue] || value)
      onChange(value[outputValue] || value)
      isUpdating.current = false
    }
  }, [value])

  const isSearching = useRef(false)
  const isUpdating = useRef(true)

  const onSearch = (searchText) => {
    isSearching.current = true
    setSearching(true)

    setValToSearch(searchText)
  }

  const handleSelectChange = (newValue) => {
    isUpdating.current = false
    // setCurrentValue(newValue[outputValue] || newValue)
    if (onChange) {
      // outputValue in this case is _id
      if (newValue) onChange(newValue[outputValue] || newValue)
    }
    // Do update ban đầu có giá trị nên phải cập nhật currentValue
    // Tránh conflict với uncontrolled select của antd\

    if (newValue === 'redirectURL' && withRedirect) {
      navigate(urlToRedirect)
    }
  }
  const handleOnSelect = (value) => {
    setCurrentValue(value[outputValue] || value)
  }

  const labels = (optionField) => {
    return displayLabels.map((name) => optionField[name]).join(' ')
  }
  const addNewValue = {
    value: 'redirectURL',
    label: `+ ${translate(redirectLabel)}`,
  }

  return (
    <Select
      loading={isLoading}
      showSearch
      allowClear
      placeholder={translate('search')}
      defaultActiveFirstOption={false}
      filterOption={false}
      notFoundContent={searching ? '... Searching' : <Empty />}
      // Cần cái này vì update cần giá trị ban đầu, create được vì ban đầu ko có giá trị
      value={currentValue}
      onSearch={onSearch}
      onClear={() => {
        setSearching(false)
      }}
      style={{ minWidth: '220px' }}
      onChange={handleSelectChange}
      onSelect={handleOnSelect}
    >
      {selectOptions.map((optionField) => (
        <Select.Option
          key={optionField[outputValue] || outputValue}
          value={optionField[outputValue] || outputValue}
        >
          {labels(optionField)}
        </Select.Option>
      ))}
      {withRedirect && (
        <Select.Option value={addNewValue.value}>
          {addNewValue.label}
        </Select.Option>
      )}
    </Select>
  )
}
