import { createSelector } from 'reselect'
import { MODAL_ACTION_TYPES } from 'utils/enums'

const initialState = { modalRequested: 'NO_MODAL' }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_ACTION_TYPES.MODAL_REQUEST:
      return {
        ...state,
        modalRequested: action.payload,
      }
    default:
      return state
  }
}

export default reducer

const modalSelector = state => state.modals

export const selectors = {
  modalToRender: createSelector(
    modalSelector,
    (modals) => modals?.modalRequested,
  ),
}

export const actions = {
  requestModal: (payload) => dispatch => {
    dispatch({ type: MODAL_ACTION_TYPES.MODAL_REQUEST, payload })
  },
}
