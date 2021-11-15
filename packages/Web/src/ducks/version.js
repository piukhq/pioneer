import { createSelector } from 'reselect'
import { getServerVersion } from 'utils/version'

const initialState = { clientVersion: null }

export const types = {
  VERSION_REQUEST: 'version/VERSION_REQUEST',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.VERSION_REQUEST:
      return {
        ...state,
        clientVersion: action.payload,
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
}

export const actions = {
  getServerVersion: () => async dispatch => {
    const response = await getServerVersion()
    dispatch({ type: types.VERSION_REQUEST, payload: response })
  },
}
