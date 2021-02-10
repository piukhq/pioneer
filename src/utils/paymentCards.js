export const isPaymentCardExpired = card => {
  const expiryMonth = card?.card?.month
  const expiryYear = card?.card?.year

  const now = new Date()
  const currentMonthDate = new Date(now.getFullYear(), now.getMonth(), 1)
  const expiryDate = new Date(expiryYear, expiryMonth - 1, 1)

  return expiryDate.getTime() < currentMonthDate.getTime()
}

export const areCardsLinked = (paymentCard, membershipCard) => {
  return (
    membershipCard?.payment_cards
      ?.filter(
        nestedPaymentCard => nestedPaymentCard.id === paymentCard.id && nestedPaymentCard.active_link,
      ).length === 1
  )
}
