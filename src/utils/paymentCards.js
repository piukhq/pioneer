import { checkIsPaymentCardExpired } from 'utils/validation'

export const isPaymentCardExpired = card => {
  const expiryMonth = card?.card?.month
  const expiryYear = card?.card?.year

  return checkIsPaymentCardExpired(expiryMonth, expiryYear)
}

export const areCardsLinked = (paymentCard, membershipCard) => {
  return (
    membershipCard?.payment_cards
      ?.filter(
        nestedPaymentCard => nestedPaymentCard.id === paymentCard.id && nestedPaymentCard.active_link && !isPaymentCardExpired(paymentCard),
      ).length === 1
  )
}
