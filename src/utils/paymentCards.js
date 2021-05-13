import { checkIsPaymentCardExpired } from 'utils/validation'

export const isPaymentCardExpired = card => {
  const expiryMonth = card?.card?.month
  const expiryYear = card?.card?.year

  return checkIsPaymentCardExpired(expiryMonth, expiryYear)
}

// Expired payment cards are not currently being unlinked on the api side, but we still consider them as unlinked on the client side.
// If this function were to be used in the future to decide to display an `unlink` button,
// then an expired card would not display that button, even though it is technically linked
// TODO: Probably should be refactored into it's own selector that will make use of the existing `linkedPaymentCards` selector
export const areCardsLinked = (paymentCard, membershipCard) => {
  return (
    membershipCard?.payment_cards
      ?.filter(
        nestedPaymentCard => nestedPaymentCard.id === paymentCard.id && nestedPaymentCard.active_link && !isPaymentCardExpired(paymentCard),
      ).length === 1
  )
}
