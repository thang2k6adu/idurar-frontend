import { API_BASE_URL } from '~/config/serverApiConfig'

import axios from 'axios'
import { errorHandler } from '~/request/errorHandler'
import { successHandler } from '~/request/successHandler'

export const login = async ({ loginData }) => {
  try {
    const response = await axios.post(
      // Avoid caching with GET methods
      API_BASE_URL + `login?timestamp=${new Date().getTime()}`,
      loginData
    )

    successHandler(response, {
      notifyOnSuccess: false,
      notifyOnFailed: true,
    })

    return response.data
  } catch (error) {
    return errorHandler(error)
  }
}

export const register = async ({ registerData }) => {
  try {
    const response = await axios.post(API_BASE_URL + 'register', registerData)

    successHandler(response, {
      notifyOnSuccess: true,
      notifyOnFailed: true,
    })
    return response.data
  } catch (error) {
    return errorHandler(error)
  }
}

export const verify = async ({ userId, emailToken }) => {
  try {
    const response = await axios.get(API_BASE_URL + `verify/${userId}/${emailToken}`)

    successHandler(response, {
      notifyOnSuccess: true,
      notifyOnFailed: true,
    })

    return response.data
  } catch (error) {
    return errorHandler(error)
  }
}

export const resetPassword = async ({ resetPasswordData }) => {
  try {
    const response = await axios.post(API_BASE_URL, 'resetPassword', resetPasswordData)

    successHandler(response, {
      notifyOnSuccess: true,
      notifyOnFailed: true,
    })

    return response.data
  } catch (error) {
    return errorHandler(error)
  }
}

export const logout = async () => {
  axios.defaults.withCredentials = true
  try {
    const response = await axios.post(API_BASE_URL + `logout?timestamp=${new Date().getTime()}`)

    successHandler(
      response,
      {
        notifyOnSuccess: false,
        notifyOnFailed: true,
      }
    )

     console.log(response.data)

    return response.data
  } catch (error) {
    return errorHandler(error)
  }
}
