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

export const useMembershipCardStateById = (id) => {
  // const membershipCards = useSelector(state => membershipCardsSelectors.cardsList(state))
  const loading = useSelector(state => state.membershipCards.loading)
  const error = useSelector(state => state.membershipCards.error)

  return {
    loading,
    error,
    membershipCard: useSelector(state => state.membershipCards.cards[id]),
    vouchers: useSelector(state => state.membershipCards.cards[id]?.vouchers),
    activeVouchers: useSelector(state => membershipCardsSelectors.activeVouchers(state, id)),
    nonActiveVouchers: useSelector(state => membershipCardsSelectors.nonActiveVouchers(state, id)),
    redeemableVouchers: useSelector(state => membershipCardsSelectors.redeemableVouchers(state, id)),
    plan: useSelector(state => membershipCardsSelectors.plan(state, id)),
    transactions: useSelector(state => state.membershipCards.cards[id]?.membership_transactions),
  }
}

export const useMembershipCardsDispatch = () => {
  const dispatch = useDispatch()
  return {
    getMembershipCards: () => dispatch(membershipCardsActions.getMembershipCards()),
    deleteMembershipCard: (id) => dispatch(membershipCardsActions.deleteMembershipCard(id)),
    addMembershipCard: (accountData, planId) => dispatch(membershipCardsActions.addMembershipCard(accountData, planId)),
    addMembershipCardOnMerchantChannel: (accountData, planId) => dispatch(membershipCardsActions.addMembershipCardOnMerchantChannel(accountData, planId)),
    addMembershipCardResetSuccessStatus: () => dispatch(membershipCardsActions.addMembershipCardResetSuccessStatus()),
    linkPaymentCard: (paymentCardId, membershipCardId) => dispatch(membershipCardsActions.linkPaymentCard(paymentCardId, membershipCardId)),
    getMembershipPlans: () => dispatch(membershipCardsActions.getMembershipCards()),
    // todo: should be removed before deployment to production
    unLinkPaymentCard: (paymentCardId, membershipCardId) => dispatch(membershipCardsActions.unLinkPaymentCard(paymentCardId, membershipCardId)),
  }
}
