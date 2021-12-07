import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import cx from 'classnames'
import { selectors as membershipPlansSelectors } from 'ducks/membershipPlans'
import { formatValueToDecimalPlace } from 'utils/format'
import { determineTextColourBackgroundContrast } from 'utils/textColourBackgroundContrast'

import styles from './MembershipCard.module.scss'

const MembershipCard = ({ card }) => {
  const history = useHistory()

  const plans = useSelector(state => membershipPlansSelectors.plansList(state))

  const handleCardClick = () => {
    history.replace(`/membership-card/${card.id}`)
  }

  const getPlanInfo = (planId) => {
    if (planId && plans.length > 0) {
      const plan = plans.find(plan => plan.id === planId)
      const { company_name: companyName, plan_name: planName } = plan?.account
      const { colour, secondary_colour: secondaryColour } = plan?.card
      const { card_type: cardType, has_vouchers: hasVouchers } = plan?.feature_set
      const iconImage = plan?.images.find(image => image.type === 3)

      return {
        cardType,
        companyName,
        planName,
        colour,
        secondaryColour,
        iconImage,
        hasVouchers,
      }
    }
    return {}
  }

  const { cardType, companyName = 'Company Name', colour, secondaryColour, iconImage, hasVouchers } = getPlanInfo(card.membership_plan)

  const { state } = card.status

  // Card type could be defined as an enum if there end up being multiple types to check against
  const isPLLCard = cardType === 2

  const shouldRenderBalanceString = () => {
    if (isPLLCard) {
      if (state === 'pending') {
        return 'Pending'
      } else if (state !== 'authorised') {
        // If state is not 'authorised' or 'pending'
        return 'Error'
      }

      if (!hasVouchers) {
        const { prefix, value, suffix } = card.balances?.[0]
        return `${prefix ?? ''}${value} ${suffix ?? ''}`
      }

      const voucher = card.vouchers?.find(voucher => voucher.state === 'inprogress')

      if (voucher && voucher.state === 'inprogress') {
        const { type, prefix, value: earnValue, target_value: earnTargetValue, suffix } = voucher?.earn

        // If voucher is an accumulator, the values must be formatted to 2 decimal places
        const [value, targetValue] = [earnValue, earnTargetValue].map(value =>
          type === 'accumulator' ? formatValueToDecimalPlace(value, 2) : value,
        )

        return `${prefix ?? ''}${value}/${prefix ?? ''}${targetValue} ${suffix ?? ''}`
      }
    }
    return null
  }

  const shouldRenderStatusString = () => {
    if (isPLLCard && state === 'authorised') {
      const paymentCards = card.payment_cards
      return paymentCards.length > 0 ? 'Linked' : 'Unlinked'
    }
    return null
  }

  const textColour = determineTextColourBackgroundContrast(colour)

  return (
    <div className={cx(styles.root__card, styles['root--hover'])} data-testid='membership-card' onClick={handleCardClick}>
      <div className={styles['root__secondary-colour-layer']} style={{ backgroundColor: secondaryColour }} />
      <div className={styles['root__primary-colour-layer']} style={{ backgroundColor: colour }} />
      <div className={styles['root__image-container']}>
        <img src={iconImage?.url} className={styles.root__image} data-testid={`membership-card-image-${iconImage?.url}`} alt='' />
      </div>
      <div className={styles['root__info-container']} style={{ color: textColour }}>
        <div className={styles['root__balance-string']}>{shouldRenderBalanceString()}</div>
        <div className={styles['root__company-name']}>{companyName}</div>
        <div className={styles.root__state}>{shouldRenderStatusString()}</div>
      </div>
    </div>
  )
}

export default MembershipCard
