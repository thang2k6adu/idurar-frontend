import * as actionTypes from './types'
import * as authService from '~/auth'
import { request } from '~/request'

export const login =
  ({ loginData }) =>
  async (dispatch) => {
    dispatch({
      type: actionTypes.REQUEST_LOADING,
    })

    const data = await authService.login({ loginData })

    if (data.success === true) {
      const auth_state = {
        // data.result:
        // _id: user._id,
        // name: user.name,
        // surname: user.surname,
        // role: user.role,
        // email: user.email,
        // photo: user.photo,
        // token: token,
        // maxAge: req.body.remember ? 365 : null,
        current: data.result,
        isLoggedIn: true,
        isLoading: false,
        isSuccess: true,
      }
      window.localStorage.setItem('auth', JSON.stringify(auth_state))
      window.localStorage.removeItem('isLogout')

      dispatch({
        type: actionTypes.REQUEST_SUCCESS,
        payload: data.result,
      })
    } else {
      dispatch({
        type: actionTypes.REQUEST_FAILED,
      })
    }
  }

export const register =
  ({ registerData }) =>
  async (dispatch) => {
    dispatch({ type: actionTypes.REQUEST_LOADING })
    const data = await authService.register({ registerData })

    if (data.success === true) {
      dispatch({
        type: actionTypes.REGISTER_SUCCESS,
      })
    } else {
      dispatch({
        type: actionTypes.REQUEST_FAILED,
      })
    }
  }

export const verify =
  ({ userId, emailToken }) =>
  async (dispatch) => {
    dispatch({
      type: actionTypes.REQUEST_LOADING,
    })

    const data = await authService.verify({ userId, emailToken })
    if (data.success === true) {
      const auth_state = {
        current: data.result,
        isLoggedIn: true,
        isLoading: false,
      }
      window.localStorage.setItem('auth', JSON.stringify(auth_state))
      window.localStorage.removeItem('isLogout')
      dispatch({
        type: actionTypes.REQUEST_SUCCESS,
        payload: data.result,
      })
    } else {
      dispatch({
        type: actionTypes.REQUEST_FAILED,
      })
    }
  }

export const resetPassword =
  ({ resetPasswordData }) =>
  async (dispatch) => {
    dispatch({
      type: actionTypes.REQUEST_LOADING,
    })

    const data = await authService.resetPassword({ resetPasswordData })

    if (data.success === true) {
      const authState = {
        current: data.result,
        isLoggedIn: true,
        isLogout: false,
        isSuccess: true,
      }
      window.localStorage.setItem('auth', authState)
      window.localStorage.removeItem('isLogout')
      dispatch({
        type: actionTypes.REQUEST_SUCCESS,
        payload: data.result,
      })
    } else {
      dispatch({
        type: actionTypes.REQUEST_FAILED,
      })
    }
  }

export const logout = () => async (dispatch) => {
  dispatch({
    type: actionTypes.LOGOUT_SUCCESS,
  })
  const result = window.localStorage.getItem('auth')
  const tmpAuth = JSON.parse(result)
  const settings = window.localStorage.getItem('settings')
  const tmpSettings = JSON.parse(settings)

  window.localStorage.removeItem('auth')
  window.localStorage.removeItem('settings')
  window.localStorage.setItem('isLogout', JSON.stringify({ isLogout: true }))

  const data = await authService.logout()
  if (data.success === false) {
    const auth_state = {
      current: tmpAuth,
      isLoggedIn: true,
      isLoading: false,
      isSuccess: true,
    }

    window.localStorage.setItem('auth', JSON.stringify(auth_state))
    window.localStorage.setItem('settings', JSON.stringify(tmpSettings))
    window.localStorage.removeItem('isLogout')
    dispatch({
      type: actionTypes.LOGOUT_FAILED,
      payload: data.result,
    })
  } else {
  }
}

export const updateProfile =
  ({ entity, jsonData }) =>
  async (dispatch) => {
    dispatch({
      type: actionTypes.REQUEST_SUCCESS,
    })
    let data = await request.updateAndUpload({ entity, id: '', jsonData })

    if (data.success = true) {
      dispatch({
        type: actionTypes.REQUEST_SUCCESS,
        payload: data.result,
      })

      const auth_state = {
        current: data.result,
        isLoggedIn: true,
        isLoading: false,
        isSuccess: true,
      }
      window.localStorage.setItem('auth', JSON.stringify(auth_state))
    }
  }
