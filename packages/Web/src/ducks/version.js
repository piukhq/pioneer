import { createSelector } from 'reselect'
import { getServerVersion } from 'api/version'

const initialState = { clientVersion: null, isIdle: false }

export const types = {
  VERSION_REQUEST: 'version/VERSION_REQUEST',
  SET_IS_IDLE_STATUS: 'version/SET_IS_IDLE_STATUS',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.VERSION_REQUEST:
      return {
        ...state,
        clientVersion: action.payload,
      }
    case types.SET_IS_IDLE_STATUS:
      return {
        ...state,
        isIdle: action.payload,
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
  setIsIdleStatus: (isIdle) => dispatch => {
    dispatch({ type: types.SET_IS_IDLE_STATUS, payload: isIdle })
  },
}
