import { getService } from 'api/service'

export const types = {
  SERVICE_REQUEST: 'service/SERVICE_REQUEST',
  SERVICE_SUCCESS: 'service/SERVICE_SUCCESS',
  SERVICE_FAILURE: 'service/SERVICE_FAILURE',
}

const initialState = {
  loading: false,
  error: false,
  success: false,
  data: {},
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SERVICE_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
      }
    case types.SERVICE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        success: true,
        data: action.payload,
      }
    case types.SERVICE_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        success: false,
      }
    default:
      return state
  }
}

export default reducer

export const actions = {
  getService: () => async dispatch => {
    try {
      dispatch({ type: types.SERVICE_REQUEST })
      const response = await getService()
      dispatch({ type: types.SERVICE_SUCCESS, payload: response.data })
    } catch (e) {
      dispatch({ type: types.SERVICE_FAILURE })
    }
  },
}
