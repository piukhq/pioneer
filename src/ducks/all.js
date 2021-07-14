import { actions as membershipCardsActions } from './membershipCards'
import { actions as paymentCardsActions } from './paymentCards'
import { actions as membershipPlansActions } from './membershipPlans'
import { createSelector } from 'reselect'

const membershipCardsLoadingSelector = state => state.membershipCards.loading
const paymentCardsLoadingSelector = state => state.paymentCards.loading
const membershipCardsErrorSelector = state => state.membershipCards.error
const paymentCardsErrorSelector = state => state.paymentCards.error
export const selectors = {
  loadingSelector: createSelector(
    membershipCardsLoadingSelector,
    paymentCardsLoadingSelector,
    (membershipCardsLoading, paymentCardsLoading) => membershipCardsLoading || paymentCardsLoading,
  ),
  errorSelector: createSelector(
    membershipCardsErrorSelector,
    paymentCardsErrorSelector,
    (membershipCardsError, paymentCardsError) => membershipCardsError || paymentCardsError,
  ),
}

export const actions = {
  fullRefresh: () => dispatch => {
    dispatch(membershipPlansActions.getMembershipPlans())
    dispatch(membershipCardsActions.getMembershipCards())
    dispatch(paymentCardsActions.getPaymentCards())
  },
}
