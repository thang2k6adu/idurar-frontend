import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Form, Button } from 'antd'

import { login } from '~/redux/auth/actions'
import { selectAuth } from '~/redux/auth/selectors'
import LoginForm from '~/forms/loginForm'
import Loading from '~/components/Loading'
import AuthModule from '~/modules/AuthModule'
import useLanguage from '~/locale/useLanguage'

const LoginPage = () => {
  const translate = useLanguage()
  const { isLoading, isSuccess } = useSelector(selectAuth)
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const onFinish = (values) => {
    dispatch(login({ loginData: values }))
  }

  useEffect(() => {
    if (isSuccess) navigate('/')
  }, [isSuccess])

  const FormContainer = () => {
    return (
      <Loading isLoading={isLoading}>
        <Form
          layout="vertical"
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <LoginForm />
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={isLoading}
              size="large"
            >
              {translate('Log in')}
            </Button>
          </Form.Item>
        </Form>
      </Loading>
    )
  }

  return <AuthModule authContent={<FormContainer />} AUTH_TITLE="Sign in" />
}

export default LoginPage