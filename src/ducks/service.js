import { getService, postService } from 'api/service'
import { selectors as usersSelectors } from 'ducks/users'

export const types = {
  SERVICE_REQUEST: 'service/SERVICE_REQUEST',
  SERVICE_SUCCESS: 'service/SERVICE_SUCCESS',
  SERVICE_FAILURE: 'service/SERVICE_FAILURE',

  POST_SERVICE_REQUEST: 'service/POST_SERVICE_REQUEST',
  POST_SERVICE_SUCCESS: 'service/POST_SERVICE_SUCCESS',
  POST_SERVICE_FAILURE: 'service/POST_SERVICE_FAILURE',
}

const initialState = {
  loading: false,
  error: false,
  success: false,
  data: {},
  post: {
    loading: false,
    error: false,
    success: false,
  },
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
    case types.POST_SERVICE_REQUEST:
      return {
        ...state,
        post: {
          ...state.post,
          loading: true,
          error: false,
          success: false,
        },
      }
    case types.POST_SERVICE_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          loading: false,
          error: false,
          success: true,
        },
      }
    case types.POST_SERVICE_FAILURE:
      return {
        ...state,
        post: {
          ...state.post,
          loading: false,
          error: true,
          success: false,
        },
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
  postService: () => async (dispatch, getState) => {
    try {
      dispatch({ type: types.POST_SERVICE_REQUEST })
      const email = usersSelectors.accountUserId(getState())
      await postService(email)
      dispatch({ type: types.POST_SERVICE_SUCCESS })
    } catch (e) {
      dispatch({ type: types.POST_SERVICE_FAILURE })
    }
  },
}
