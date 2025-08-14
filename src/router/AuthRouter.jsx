import { Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import LoginPage from '~/pages/Login'
import ForgetPassword from '~/pages/ForgetPassword'
import ResetPassword from '~/pages/ResetPassword'

export default function AuthRouter() {
  const dispatch = useDispatch()

  return (
    <Routes>
      <Route element={<LoginPage />} path="/"></Route>
      <Route element={<LoginPage />} path="/login"></Route>
      <Route element={<Navigate to="/login" replace/>} path="/logout"></Route>
      <Route element={<ForgetPassword />} path="/forgetPassword"></Route>
      <Route element={<ResetPassword />} path="/resetPassword/:userId/:resetToken"></Route>
    </Routes>
  )
}
