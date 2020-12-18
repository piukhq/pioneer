import { actions as membershipCardsActions } from './membershipCards'
import { actions as paymentCardsActions } from './paymentCards'

export const actions = {
  fullRefresh: () => dispatch => {
    dispatch(membershipCardsActions.getMembershipCards())
    dispatch(paymentCardsActions.getPaymentCards())
  },
}
