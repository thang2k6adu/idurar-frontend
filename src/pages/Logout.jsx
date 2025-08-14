import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { logout } from '~/redux/auth/actions'
const Logout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function asyncLogout() {
    dispatch(logout())
  }

}
