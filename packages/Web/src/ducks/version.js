import { createSelector } from 'reselect'
import { getServerVersion } from 'utils/version'

const initialState = { clientVersion: null, isIdle: false }

export const types = {
  VERSION_REQUEST: 'version/VERSION_REQUEST',
  SET_ACTIVE: 'version/SET_ACTIVE',
  SET_IDLE: 'version/SET_IDLE',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.VERSION_REQUEST:
      return {
        ...state,
        clientVersion: action.payload,
      }
    case types.SET_IDLE:
      return {
        ...state,
        isIdle: true,
        clientVersion: action.payload,
      }
    case types.SET_ACTIVE:
      return {
        ...state,
        isIdle: false,
      }
    default:
      return state
  }
}

export default reducer

const versionSelector = state => state.version

export const selectors = {
  clientVersion: createSelector(
    versionSelector,
    (version) => version?.clientVersion,
  ),
  isIdle: createSelector(
    versionSelector,
    (version) => version?.isIdle,
  ),
}

export const actions = {
  getServerVersion: () => async dispatch => {
    const response = await getServerVersion()
    dispatch({ type: types.VERSION_REQUEST, payload: response })
  },
  setIdle: () => async dispatch => {
    console.log('ducks idle')
    const response = await getServerVersion()
    dispatch({ type: types.SET_IDLE, payload: response })
  },
  setActive: () => dispatch => {
    console.log('ducks active')
    dispatch({ type: types.SET_ACTIVE })
  },
}
