import { authenticateViaMagicLinkToken, login, requestMagicLink } from 'api/users'
import { serializeError } from 'serialize-error'

const types = {
  LOGIN_REQUEST: 'users/LOGIN_REQUEST',
  LOGIN_SUCCESS: 'users/LOGIN_SUCCESS',
  LOGIN_FAILURE: 'users/LOGIN_FAILURE',

  REQUEST_MAGIC_LINK_REQUEST: 'users/REQUEST_MAGIC_LINK_REQUEST',
  REQUEST_MAGIC_LINK_SUCCESS: 'users/REQUEST_MAGIC_LINK_SUCCESS',
  REQUEST_MAGIC_LINK_FAILURE: 'users/REQUEST_MAGIC_LINK_FAILURE',

  MAGIC_LINK_AUTHENTICATION_REQUEST: 'users/MAGIC_LINK_AUTHENTICATION_REQUEST',
  MAGIC_LINK_AUTHENTICATION_SUCCESS: 'users/MAGIC_LINK_AUTHENTICATION_SUCCESS',
  MAGIC_LINK_AUTHENTICATION_FAILURE: 'users/MAGIC_LINK_AUTHENTICATION_FAILURE',
  RESET_MAGIC_LINK_AUTHENTICATION: 'users/RESET_MAGIC_LINK_AUTHENTICATION',
}

const getInitialState = () => ({
  authentication: {
    loading: false,
    error: false,
    api_key: localStorage.getItem('token'),
  },
  magicLinkRequest: {
    loading: false,
    error: false,
    success: false,
  },
  magicLinkAuthentication: {
    loading: false,
    error: false,
    success: false,
  },
  profile: null,
})

const reducer = (state = getInitialState(), action) => {
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

    case types.REQUEST_MAGIC_LINK_REQUEST:
      return {
        ...state,
        magicLinkRequest: {
          ...state.magicLinkRequest,
          loading: true,
          error: false,
          success: false,
        },
      }
    case types.REQUEST_MAGIC_LINK_SUCCESS:
      return {
        ...state,
        magicLinkRequest: {
          ...state.magicLinkRequest,
          loading: false,
          error: false,
          success: true,
        },
      }
    case types.REQUEST_MAGIC_LINK_FAILURE:
      return {
        ...state,
        magicLinkRequest: {
          ...state.magicLinkRequest,
          loading: false,
          error: true,
          success: false,
        },
      }

    case types.MAGIC_LINK_AUTHENTICATION_REQUEST:
      return {
        ...state,
        magicLinkAuthentication: {
          ...state.magicLinkAuthentication,
          loading: true,
          error: false,
          success: false,
        },
      }
    case types.MAGIC_LINK_AUTHENTICATION_SUCCESS:
      return {
        ...state,
        magicLinkAuthentication: {
          ...state.magicLinkAuthentication,
          loading: false,
          error: false,
          success: true,
        },
      }
    case types.MAGIC_LINK_AUTHENTICATION_FAILURE:
      return {
        ...state,
        magicLinkAuthentication: {
          ...state.magicLinkAuthentication,
          loading: false,
          error: action.payload,
          success: false,
        },
      }
    case types.RESET_MAGIC_LINK_AUTHENTICATION:
      return {
        ...state,
        magicLinkAuthentication: {
          ...state.magicLinkAuthentication,
          loading: false,
          error: false,
          success: false,
        },
      }
    default:
      return state
  }
}
export default reducer

export const actions = {
  login: (username, password) => async dispatch => {
    dispatch({ type: 'RESET_ALL' })
    dispatch({ type: types.LOGIN_REQUEST })
    try {
      const { data: { api_key: apiKey } } = await login(username, password)
      dispatch({ type: types.LOGIN_SUCCESS, payload: { api_key: apiKey } })
    } catch (e) {
      dispatch({ type: types.LOGIN_FAILURE })
    }
  },
  requestMagicLink: (email) => async dispatch => {
    dispatch({ type: types.RESET_MAGIC_LINK_AUTHENTICATION })
    dispatch({ type: types.REQUEST_MAGIC_LINK_REQUEST })
    try {
      await requestMagicLink(email)
      dispatch({ type: types.REQUEST_MAGIC_LINK_SUCCESS })
    } catch (e) {
      dispatch({ type: types.REQUEST_MAGIC_LINK_FAILURE })
    }
  },
  magicLinkAuthentication: (magicLinkToken) => async dispatch => {
    dispatch(actions.logout())
    dispatch({ type: types.MAGIC_LINK_AUTHENTICATION_REQUEST })
    try {
      const { data: { access_token: apiKey } } = await authenticateViaMagicLinkToken(magicLinkToken)
      dispatch({ type: types.LOGIN_SUCCESS, payload: { api_key: apiKey } })
      dispatch({ type: types.MAGIC_LINK_AUTHENTICATION_SUCCESS })
    } catch (e) {
      dispatch({ type: types.MAGIC_LINK_AUTHENTICATION_FAILURE, payload: serializeError(e) })
    }
  },
  logout: () => dispatch => {
    dispatch({ type: 'RESET_ALL' })
  },
}
