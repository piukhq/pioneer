import { useDispatch, useSelector } from 'react-redux'
import {
  selectors as membershipCardsSelectors,
  actions as membershipCardsActions,
} from 'ducks/membershipCards'

export const useMembershipCardsState = () => {
  const membershipCards = useSelector(state => membershipCardsSelectors.cardsList(state))
  const loading = useSelector(state => state.membershipCards.loading)
  const error = useSelector(state => state.membershipCards.error)

  return {
    error,
    loading,
    membershipCards,
    // todo: should replace with: `add: useSelector(state => state.membershipCards.add)`
    add: {
      card: useSelector(state => state.membershipCards.add.card),
      loading: useSelector(state => state.membershipCards.add.loading),
      error: useSelector(state => state.membershipCards.add.error),
      success: useSelector(state => state.membershipCards.add.success),
    },
    linkPaymentCard: useSelector(state => state.membershipCards.linkPaymentCard),
  }
}

export const useMembershipCardsDispatch = () => {
  const dispatch = useDispatch()
  return {
    deleteMembershipCard: (id) => dispatch(membershipCardsActions.deleteMembershipCard(id)),
    addMembershipCard: (accountData, planId) => dispatch(membershipCardsActions.addMembershipCard(accountData, planId)),
    addMembershipCardResetSuccessStatus: () => dispatch(membershipCardsActions.addMembershipCardResetSuccessStatus()),
    linkPaymentCard: (paymentCardId, membershipCardId) => dispatch(membershipCardsActions.linkPaymentCard(paymentCardId, membershipCardId)),
    // todo: temporarily introduced
    unLinkPaymentCard: (paymentCardId, membershipCardId) => dispatch(membershipCardsActions.unLinkPaymentCard(paymentCardId, membershipCardId)),
  }
}
