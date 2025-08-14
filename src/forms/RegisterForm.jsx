import React from 'react'
import { Form, Input, Select } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import useLanguage from '~/locale/useLanguage'
import { countryList } from '~/utils/countryList'

export default function RegisterForm({ userLocation }) {
  const translate = useLanguage()

  return (
    <>
      <Form.Item
        name="name"
        labal={translate('name')}
        rules={[{ required: true }]}
      >
        <Input
          prefix={<UserOutlined className="side-form-item-icon" />}
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="email"
        labal={translate('email')}
        rules={[{ required: true }, { type: 'email' }]}
      >
        <Input
          prefix={<MailOutlined className="side-form-item-icon" />}
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="password"
        labal={translate('password')}
        rules={[{ required: true }]}
      >
        <Input.Password
          prefix={<LockOutlined className="side-form-item-icon" />}
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="confirm_password"
        label={translate('confirm_password')}
        rules={[
          {
            required: true,
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              // Value is the current value of the input being validated
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(
                new Error('The two passwords that you entered do not match!')
              )
            },
          }),
        ]}
        // Show green, red when validate
        hasFeedback
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="country"
        label={translate('country')}
        rules={[
          {
            required: true,
          },
        ]}
        initialValue={userLocation}
      >
        <Select
          showSearch
          defaultOpen={false}
          // useRendered text Inside Option
          optionFilterProp="children"
          // filterOption?: (inputValue: string, option?: OptionType (value, key, label, children)) => boolean
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '')
              .toLowerCase()
              .localeCompare((optionB?.label ?? '').toLowerCase())
          }
          style={{ width: '100%' }}
          size="large"
        >
          {countryList.forEach((language) => (
            <Select.Option
              key={language.value}
              value={language.value}
              label={translate(language.label)}
            >
              {language?.icon ?? language?.icon + ' '}
              {translate(language.label)}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </>
  )
}
