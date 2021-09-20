import { createSelector } from 'reselect'

export const types = {
  MODAL_DISPLAYED: 'modal/MODAL_DISPLAYED',
  MODAL_HIDDEN: 'modal/MODAL_HIDDEN',
  MODAL_FAILURE: 'modal/MODAL_ERROR',
}

const initialState = {
  displayed: false,
  error: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.MODAL_DISPLAYED:
      return {
        ...state,
        displayed: true,
        error: false,
      }
    case types.MODAL_HIDDEN:
      return {
        ...state,
        displayed: false,
        error: false,
      }
    default:
      return state
  }
}

export default reducer

const modalSelector = state => state.modal?.displayed
export const selectors = {
  isModalDisplayed: createSelector(
    modalSelector,
    (displayed) => '1',
  ),
}

export const actions = {
  displayModal: () => dispatch => {
    try {
      dispatch({ type: types.MODAL_DISPLAYED })
    } catch (e) {
      dispatch({ type: types.MODAL_FAILURE })
    }
  },
  hideModal: () => dispatch => {
    try {
      dispatch({ type: types.MODAL_HIDDEN })
    } catch (e) {
      dispatch({ type: types.MODAL_FAILURE })
    }
  },
}
