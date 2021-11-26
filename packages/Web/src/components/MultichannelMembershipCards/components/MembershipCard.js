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
      const iconImage = plan?.images.find(image => image.type === 3)

      return {
        companyName,
        planName,
        colour,
        secondaryColour,
        iconImage,
      }
    }
    return {}
  }

  const { companyName = 'Company Name', colour, secondaryColour, iconImage } = getPlanInfo(card.membership_plan)
  const { state, reason_codes } = card.status

  const getBalanceString = (card) => {
    const voucher = card.vouchers?.find(voucher => voucher.state === 'inprogress')

    if (voucher && voucher.state === 'inprogress') {
      const { type, prefix, value: earnValue, target_value: earnTargetValue, suffix } = voucher?.earn

      // If voucher is an accumulator, the values must be formatted to 2 decimal places
      const [value, targetValue] = [earnValue, earnTargetValue].map(value =>
        type === 'accumulator' ? formatValueToDecimalPlace(value, 2) : value,
      )

      return `${prefix ?? ''}${value}/${prefix ?? ''}${targetValue} ${suffix ?? ''}`
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
        <div className={styles['root__balance-string']}>{getBalanceString(card)}</div>
        <div className={styles['root__company-name']}>{companyName}</div>
        <div className={styles.root__state}>{state} - {reason_codes[0]}</div>
      </div>
    </div>
  )
}

export default MembershipCard
