import { useEffect, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout as logoutAction, resetState } from '~/redux/auth/actions'
import { crud } from '~/redux/crud/actions'
import { erp } from '~/redux/erp/actions'
import PageLoader from '~/components/PageLoader'

const Logout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  function asyncLogout() {
    dispatch(logoutAction())
  }

  useLayoutEffect(() => {
    dispatch(crud.resetState())
    dispatch(erp.resetState())
  }, [])

  useEffect(() => {
    const doLogout = async () => {
      try {
        await dispatch(logoutAction()) // Chờ logout xong
        dispatch(resetState()) // Reset sau khi logout
        navigate('/login', { replace: true }) // Điều hướng (replace để tránh quay lại logout)
      } catch (error) {
        console.error('Logout failed:', error)
        // Có thể xử lý thêm ở đây nếu muốn
      }
    }

    doLogout()
  }, [dispatch, navigate])

  return <PageLoader />
}
export default Logout
