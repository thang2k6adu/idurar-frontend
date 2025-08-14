import useLanguage from '~/locale/useLanguage'
import { useNavigate } from 'react-router-dom'
import useOnFetch from '~/hooks/useOnFetch'
import { request } from '~/request/request'
import Loading from '~/components/Loading'
import ForgetPasswordForm from '~/forms/ForgetPasswordForm'
import AuthModule from '~/modules/AuthModule'

import { Form, Result, Button } from 'antd'

const ForgetPassword = () => {
  const translate = useLanguage()
  const navigate = useNavigate()
  const { onFetch, isSuccess, isLoading } = useOnFetch()

  async function postData(data) {
    return await request.post({ entity: 'forgetPassword', jsonData: data })
  }

  const onFinish = (values) => {
    const callback = postData(values)
    onFetch(callback)
  }

  const FormContainer = () => {
    return (
      <Loading isLoading={isLoading}>
        <Form
          name="signup"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <ForgetPasswordForm />
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              size="large"
            >
              {translate('Request new password')}
            </Button>
            {translate('Or')}{' '}
            <a href="/login">{translate('already have login account')}</a>
          </Form.Item>
        </Form>
      </Loading>
    )
  }
  if (!isSuccess) {
    return (
      <AuthModule
        authContent={<FormContainer />}
        AUTH_TITLE="Forget password"
      />
    )
  } else {
    return (
      <Result
        status="success"
        title={translate('Check your email address to reset your password')}
        subTitle={translate('Password reset in progress')}
        style={{ maxWidth: '450px', margin: 'auto' }}
        extra={
          <Button
            type="primary"
            onClick={() => {
              navigate('/login')
            }}
          >
            {translate('Login')}
          </Button>
        }
      ></Result>
    )
  }
}

export default ForgetPassword