// logic:
// handlers failures when the axios request it self fails
// axios.get('/api')
// .then(successHandler)
// .catch(errorHandler)
// axios.catch(error) called when network error, 4xx, 5xx HTTP error, ....
// 
// 1. check internet connection
// 2. check if response exists at all
// 3. JWT expired: special case: clean up local storage and force logout
// 4. Genernal error with status and message
// 5. second JWT check
// 6. Fallback for unknown cases (server problem or no internet again)
import { notification } from 'antd'
import codeMessage from './codeMessage'

// In HTTP library like Axios, when a request fails, the error object follow a structure like
// {
//   message: 'Request failed with status code 401',
//   name: 'Error',
//   config: { /* the request config */ },
//   code: 'ERR_BAD_REQUEST',
//   response: {   // <-- this is what you destructured
//     status: 401,
//     data: {
//       message: 'Unauthorized',
//       jwtExpired: true,
//       ...
//     },
//     headers: { ... },
//     ...
//   }
// }
export const errorHandler = (error) => {
  // const forceLogout = () => {
  //   window.localStorage.removeItem('auth')
  //   window.localStorage.removeItem('isLogout')
  //   window.location.href = '/logout'
  // }

  // navigator is a web API, provide information about browser and user system
  // navigator.language: language of browser
  // navigator.onLine: internet status (true or false)
  if (!navigator.onLine) {
    notification.config({
      duration: 15,
      maxCount: 1,
    })

    // execute when internet is not connected
    notification.error({
      message: 'No internet connection',
      description: 'Cannot connect to the Internet. Check your internet network',
    })

    return {
      success: false,
      result: null,
      message: 'Cannot connect to the server, check your internet network',
    }
  }

  const { response } = error

  if (!response) {
    notification.config({
      duration: 20,
      maxCount: 1,
    })

    return {
      success: false,
      result: null,
      message: 'Cannot connect to the server. Contact your Administrator',
    }
  }

  if (response && response.data && response.data.jwtExpired) {
    const result = window.localStorage.getItem('auth')
    const jsonFile = window.localStorage.getItem('isLogout')
    const { isLogout } = (jsonFile && JSON.parse(jsonFile)) || false

    window.localStorage.removeItem('auth')
    window.localStorage.removeItem('isLogout')
    if (result || isLogout) {
      window.location.href = '/logout'
    }
  }

  if (response && response.status) {
    const message = response.data && response.data.message

    const errorText = message || codeMessage[response.status]
    const { status } = response
    notification.config({
      duration: 20,
      maxCount: 2,
    })
    notification.error({
      message: `Request error ${status}`,
      description: errorText,
    })

    // someone send invalid token to backend and return
    if (response?.data?.error?.name === 'JsonWebTokenError') {
      window.localStorage.removeItem('auth')
      window.localStorage.removeItem('isLogout')
      window.location.href = '/logout'
    } else return response.data
  } else {
    notification.config({
      duration: 15,
      maxCount: 1,
    })

    if (navigator.onLine) {
      // error when there is internet connection
      notification.error({
        message: 'Problem connecting to server',
        description: 'Cannot connect to the server. Try again later',
      })

      return {
        success: false,
        result: null,
        message: 'Cannot connect to the server. Contact your administrator',
      }
    } else {
      notification.error({
        message: 'No internet connection',
        description: 'Cannot connect to the Internet. Check your internet network',
      })

      return {
        success: false,
        result: null,
        message: 'Cannot connect to the server. Check your internet network',
      }
    }
  }
}
