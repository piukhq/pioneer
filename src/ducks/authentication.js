import { login } from 'api/authentication';

const types = {
  LOGIN_REQUEST: 'authentication/LOGIN_REQUEST',
  LOGIN_SUCCESS: 'authentication/LOGIN_SUCCESS',
  LOGIN_FAILURE: 'authentication/LOGIN_FAILURE',
}

const initialState = {
  loading: false,
  error: false,
  api_key: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        api_key: null,
      }
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        api_key: action.payload.api_key,
      }
    case types.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        api_key: null,
      }
    default:
      return state
  }
}
export default reducer;

export const actions = {
  login: (username, password) => async dispatch => {
    dispatch({ type: types.LOGIN_REQUEST })
    try {
      const {data: {api_key}} = await login(username, password)
      dispatch({ type: types.LOGIN_SUCCESS, payload: { api_key } })
    } catch(e) {
      dispatch({ type: types.LOGIN_FAILURE })
    }
  }
}
