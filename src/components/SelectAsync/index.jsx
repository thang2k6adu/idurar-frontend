import { Select, Tag } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useFetch from '~/hooks/useFetch'
import color from '~/utils/color'
import { generate as uniqueId } from 'shortid'
import useLanguage from '~/locale/useLanguage'
import { request } from '~/request/request'

export default function SelectAsync({
  entity,
  displayLabels = ['name'],
  outputValue = '_id',
  redirectLabel = '',
  withRedirect = false,
  urlToRedirect = '/',
  placeholder = 'select',
  value,
  onChange,
}) {
  const [selectOptions, setOptions] = useState([])
  const [currentValue, setCurrentValue] = useState(undefined)
  const navigate = useNavigate()
  const translate = useLanguage()

  const labels = (optionField) => {
    return displayLabels.map((x) => optionField[x]).join(' ')
  }

  useEffect(() => {
    if (value !== undefined) {
      const val = value?.[outputValue] ?? value
      setCurrentValue(val)
      onChange(val)
      console.log('oke')
    }
  }, [value])

  const asyncList = () => {
    return request.list({ entity })
  }

  const { result, isLoading: fetchIsLoading, isSuccess } = useFetch(asyncList)
  useEffect(() => {
    isSuccess && setOptions(result)
  }, [isSuccess])

  const handleSelectChange = (newValue) => {
    if (newValue === 'redirectURL') {
      navigate(urlToRedirect)
    } else {
      const val = newValue?.[outputValue] ?? newValue
      setCurrentValue(newValue)
      onChange(val)
    }
  }

  const optionsList = () => {
    const list = []

    selectOptions.forEach((optionField) => {
      const value = optionField[outputValue] ?? optionField
      const label = labels(optionField)
      const currentColor = optionField[outputValue]?.color ?? optionField?.color
      const labelColor = color.find((x) => x.color === currentColor)
      list.push({ value, label, color: labelColor?.color })
    })

    return list
  }

  return (
    <Select
      loading={fetchIsLoading}
      disabled={fetchIsLoading}
      value={currentValue}
      onChange={handleSelectChange}
      placeholder={placeholder}
    >
      {optionsList()?.map((option) => {
        return (
          <Select.Option key={option.value} value={option.value}>
            <Tag bordered={false} color={option.color}>
              {option.label}
            </Tag>
          </Select.Option>
        )
      })}
      {withRedirect && (
        <Select.Option value="redirectURL">
          {'+ ' + translate(redirectLabel)}
        </Select.Option>
      )}
    </Select>
  )
}
