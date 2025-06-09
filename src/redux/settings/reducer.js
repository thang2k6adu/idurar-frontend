import * as actionTypes from './types'

const INITIAL_STATE = {
  current: {
    result: null,
  },
  list: {
    result: {
      item: [],
      pagination: {
        current: 1,
        pageSize: 10,
        showSizeChanger: false,
        total: 1,
      },
    },
    isLoading: false,
    isSuccess: false,
  },
}

const settingsReducer = (state = INITIAL_STATE, action) => {
  const { payload, keyState } = action

  switch (action.type) {
    case actionTypes.RESET_STATE:
      return INITIAL_STATE
    case actionTypes.CURRENT_ITEM:
      return {
        ...state,
        current: {
          result: payload,
        },
      }
    case actionTypes.REQUEST_LOADING:
      return {
        ...state,
        [keyState]: {
          ...state[keyState],
          isLoading: true,
        },
      }
  }
}
