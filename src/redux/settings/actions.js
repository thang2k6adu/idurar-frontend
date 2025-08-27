import * as actionTypes from './types'
import { request } from '~/request/request'

const dispatchSettingsData = (datas) => {
  const settingCategory = {}

  datas.forEach((data) => {
    settingCategory[data.settingCategory] = {
      // transforming an arraay of objects (datas) into an object settingCategory grouped by settingCategory
      // const datas = [
      //   { settingCategory: "general", settingKey: "theme", settingValue: "dark" },
      //   { settingCategory: "general", settingKey: "language", settingValue: "en" },
      //   { settingCategory: "notifications", settingKey: "email", settingValue: true },
      //   { settingCategory: "notifications", settingKey: "sms", settingValue: false },
      // ];
      // {
      //   general: {
      //     theme: "dark",
      //     language: "en"
      //   },
      //   notifications: {
      //     email: true,
      //     sms: false
      //   }
      // }
      ...settingCategory[data.settingCategory],
      [data.settingKey]: data.settingValue,
    }
  })
  return settingCategory
}

export const settingsAction = {
  resetState: () => (dispatch) => {
    dispatch({
      type: actionTypes.RESET_STATE,
    })
  },
  updateCurrency:
    ({ data }) =>
    async (dispatch) => {
      dispatch({
        type: actionTypes.UPDATE_CURRENCY,
        payload: data,
      })
    },
  update:
    ({ entity, settingKey, jsonData }) =>
    async (dispatch) => {
      dispatch({ type: actionTypes.REQUEST_LOADING })

      let data = await request.patch({
        entity: entity + '/updateBySettingKey/' + settingKey,
        jsonData,
      })

      if (data.success === true) {
        let data = await request.listAll({ entity })

        if ((data.success = true)) {
          const payload = dispatchSettingsData(data.result)
          window.localStorage.setItem('settings', JSON.string)
          dispatch({
            type: actionTypes.REQUEST_SUCCESS,
            payload,
          })
        } else {
          dispatch({
            type: actionTypes.REQUEST_FAILED,
          })
        }
      } else {
        dispatch({
          type: actionTypes.REQUEST_FAILED,
        })
      }
    },
  updateMany:
    ({ entity, jsonData }) =>
    async (dispatch) => {
      dispatch({
        type: actionTypes.REQUEST_LOADING,
      })

      let data = await request.patch({
        entity: entity + '/updateManySetting',
        jsonData,
      })

      if (data.success === true) {
        const data = await request.listAll({ entity })
        if (data.success === true) {
          const payload = dispatchSettingsData(data.result)

          console.log('ok')
          window.localStorage.setItem('settings', JSON.stringify(payload))

          dispatch({
            type: actionTypes.REQUEST_SUCCESS,
            payload,
          })
        } else {
          dispatch({
            type: actionTypes.REQUEST_FAILED,
          })
        }
      } else {
        dispatch({
          type: actionTypes.REQUEST_FAILED,
        })
      }
    },
  list:
    ({ entity }) =>
    async (dispatch) => {
      dispatch({
        type: actionTypes.REQUEST_LOADING,
      })

      let data = await request.listAll({ entity })

      if (data.success === true) {
        const payload = dispatchSettingsData(data.result)

        console.log(payload)
        window.localStorage.setItem('settings', JSON.stringify(payload))

        dispatch({
          type: actionTypes.REQUEST_SUCCESS,
          payload,
        })
      } else {
        dispatch({
          type: actionTypes.REQUEST_FAILED,
        })
      }
    },
  upload:
    ({ entity, settingKey, jsonData }) =>
    async (dispatch) => {
      dispatch({
        type: actionTypes.REQUEST_LOADING,
      })

      const data = await request.upload({
        entity: entity,
        id: settingKey,
        jsonData,
      })

      if (data.success === true) {
        const data = await request.listAll({ entity })

        if (data.success === true) {
          const payload = dispatchSettingsData(data.result)

          window.localStorage.setItem('settings', payload)

          dispatch({
            type: actionTypes.REQUEST_SUCCESS,
            payload,
          })
        } else {
          dispatch({
            type: actionTypes.REQUEST_FAILED,
          })
        }
      } else {
        dispatch({
          type: actionTypes.REQUEST_FAILED,
        })
      }
    },
}
