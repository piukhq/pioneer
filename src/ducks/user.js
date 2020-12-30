import { login } from 'api/user'

const types = {
  LOGIN_REQUEST: 'user/LOGIN_REQUEST',
  LOGIN_SUCCESS: 'user/LOGIN_SUCCESS',
  LOGIN_FAILURE: 'user/LOGIN_FAILURE',
}

const initialState = {
  authentication: {
    loading: false,
    error: false,
    api_key: localStorage.getItem('token'),
  },
  profile: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return {
        ...state,
        authentication: {
          ...state.authentication,
          loading: true,
          error: false,
          api_key: null,
        },
      }
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        authentication: {
          ...state.authentication,
          loading: false,
          error: false,
          api_key: action.payload.api_key,
        },
      }
    case types.LOGIN_FAILURE:
      return {
        ...state,
        authentication: {
          ...state.authentication,
          loading: false,
          error: true,
          api_key: null,
        },
      }
    default:
      return state
  }
}
export default reducer

export const actions = {
  login: (username, password) => async dispatch => {
    dispatch({ type: types.LOGIN_REQUEST })
    try {
      const { data: { api_key: apiKey } } = await login(username, password)
      localStorage.setItem('token', apiKey)
      dispatch({ type: types.LOGIN_SUCCESS, payload: { api_key: apiKey } })
    } catch (e) {
      dispatch({ type: types.LOGIN_FAILURE })
    }
  },
  logout: () => dispatch => {
    localStorage.removeItem('token')
    // todo: logging out should reset the entire redux store
    dispatch({ type: types.LOGIN_SUCCESS, payload: { api_key: null } })
  },
}
