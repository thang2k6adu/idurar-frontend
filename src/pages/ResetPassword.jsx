import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import useOnFetch from '~/hooks/useOnFetch'
import useLanguage from '~/locale/useLanguage'
import { useEffect} from 'react';
import { Form, Button } from 'antd'

import { resetPassword } from '~/redux/auth/actions'
import { selectAuth } from '~/redux/auth/selectors'

import Loading from '~/components/Loading'
import AuthModule from '~/modules/AuthModule'
import ResetPasswordForm from '~/forms/ResetPasswordForm'

const ResetPassword = () => {
  const translate = useLanguage()
  const navigate = useNavigate()
  const { isLoading, isSuccess } = useSelector(selectAuth)
  const { userId, resetToken } = useParams()
  const dispatch = useDispatch()

  async function postData(data) {
    return await request.post({ entity: 'forgetPassword' })
  }

  const onFinish = (values) => {
    dispatch(
      resetPassword({
        resetPasswordData: {
          passsword: values.password,
          userId,
          resetToken,
        },
      })
    )
  }

  useEffect(() => {
    if (isSuccess) navigate('/')
  }, [isSuccess])

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
          <ResetPasswordForm />
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              size="large"
            >
              {translate('update password')}
            </Button>
            {translate('Or')}{' '}
            <a href="/login">{translate('already have account login')}</a>
          </Form.Item>
        </Form>
      </Loading>
    )
  }
  return (
    <AuthModule authContent={<FormContainer />} AUTH_TITLE="Reset Password" />
  )
}

export default ResetPassword
