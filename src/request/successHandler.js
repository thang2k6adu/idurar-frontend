// Logic
// handlers successful response, but still checks if data.success === false
import { notification } from 'antd'

import codeMessage from './codeMessage'

export const successHandler = (
  response,
  options = { notifyOnSuccess: false, notifyOnFailed: true }
) => {
  const { data } = response

  if (data && data.success === true) {
    const message = response.data && data.message
    const successText = message || codeMessage[response.status]

    if (options.notifyOnSuccess) {
      notification.config({
        duration: 2,
        maxCount: 1,
      })

      notification.success({
        message: 'Request success',
        description: successText,
      })
    }
  } else if (options.notifyOnFailed) {
    const message = response.data && data.message
    const errorText = message || codeMessage[response.status]
    const { status } = response

    notification.config({
      duration: 4,
      maxCount: 2,
    })
    notification.error({
      message: `Request error ${status}`,
      description: errorText,
    })
  }
}
