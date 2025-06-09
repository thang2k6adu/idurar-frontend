import * as actionTypes from './types'
import { request } from '@/request'

const dispatchSettingsData = (datas) => {
  const settingsCategory = {}

  datas.map((data) => {
    settingsCategory[data.settingCategory] = {
      ...settingsCategory[data.settingCategory],
      [data.settingKey]: data.settingValue,
    }
  })

  return settingsCategory
}

export const settingsAction = {
  // Reset state của module về trạng thái ban đầu
  resetState: () => (dispatch) => {
    dispatch({
      type: actionTypes.RESET_STATE,
    })
  },
  // Khi cần xóa form sau khi submit
  // dispatch(resetAction({ actionType: 'create' }));
  // Khi cần xóa form sau khi tìm kiếm
  // dispatch(resetAction({ actionType: 'search' }));
  resetAction:
    ({ actionType }) =>
    (dispatch) => {
      dispatch({
        type: actionTypes.RESET_ACTION,
        keyState: actionType,
        payload: null,
      })
    },
  currentItem:
    ({ data }) =>
    (dispatch) => {
      dispatch({
        type: actionTypes.CURRENT_ITEM,
        payload: { ...data },
      })
    },
  currentAction:
    ({ actionType, data }) =>
    (dispatch) => {
      dispatch({
        type: actionTypes.REQUEST_LOADING,
        keyState: actionType,
        payload: { ...data },
      })
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
        window.localStorage.setItem('settings', JSON.stringify(dispatchSettingsData(data.result)))

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
}
