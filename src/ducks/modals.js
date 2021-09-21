import { createSelector } from 'reselect'

export const types = {
  PAYMENT_CARD_LIMIT_MODAL_VISIBLE: 'modal/PAYMENT_LIMIT_MODAL_VISIBLE',
  MODAL_CLOSED: 'modal/MODAL_CLOSED',
  MODAL_ERROR: 'modal/MODAL_ERROR',
}

const initialState = {
  error: false,
  paymentCardLimit: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PAYMENT_CARD_LIMIT_MODAL_VISIBLE:
      return {
        ...state,
        paymentCardLimit: true,
        error: false,
      }
    case types.MODAL_CLOSED:
      return initialState
    default:
      return state
  }
}

export default reducer

const modalSelector = state => state?.modals

export const selectors = {
  isPaymentCardLimitModalVisible: createSelector(
    modalSelector,
    (modal) => modal?.paymentCardLimit,
  ),
}

export const actions = {
  setPaymentCardLimitModalVisible: () => dispatch => {
    dispatch({ type: types.PAYMENT_CARD_LIMIT_MODAL_VISIBLE })
  },
  setModalClosed: () => dispatch => {
    dispatch({ type: types.MODAL_CLOSED })
  },
}

// Do I make actions for each of these? Plus others Have a think...
// const [paymentCardAddFormVisible, setPaymentCardAddFormVisible] = useState(false)
// const [paymentCardLimitModalVisible, setPaymentCardLimitModalVisible] = useState(false)
// const [deleteFormVisible, setDeleteFormVisible] = useState(false)
// const [linkingSuccessModalVisible, setLinkingSuccessModalVisible] = useState(false)
// const [linkingErrorModalVisible, setLinkingErrorModalVisible] = useState(false)
