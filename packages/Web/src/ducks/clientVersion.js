import { createSelector } from 'reselect'
import { getServerVersion } from 'api/version'

const initialState = { clientVersion: null }

export const types = {
  VERSION_UPDATE: 'clientVersion/VERSION_UPDATE',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.VERSION_UPDATE:
      return {
        ...state,
        clientVersion: action.payload,
      }
    default:
      return state
  }
}

export default reducer

const versionSelector = state => state.clientVersion

export const selectors = {
  clientVersion: createSelector(
    versionSelector,
    (version) => version?.clientVersion,
  ),
}

export const actions = {
  setClientVersion: () => async dispatch => {
    const response = await getServerVersion()
    dispatch({ type: types.VERSION_UPDATE, payload: response })
  },
}
