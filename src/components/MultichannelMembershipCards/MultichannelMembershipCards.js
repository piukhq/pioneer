import React from 'react'
import { useSelector } from 'react-redux'
import cx from 'classnames'
import AccountMenu from 'components/AccountMenu'
import LoadingIndicator from 'components/LoadingIndicator'
import { selectors as membershipPlansSelectors } from 'ducks/membershipPlans'
import { useMembershipCardsState } from 'hooks/membershipCards'
import { ReactComponent as FuelGaugeSvg } from 'images/fuel.svg'

import styles from './MultichannelMembershipCards.module.scss'

const MultichannelMembershipCards = () => {
  const { membershipCards, loading } = useMembershipCardsState()
  const plans = useSelector(state => membershipPlansSelectors.plansList(state))

  const getPlanInfo = (cardId) => {
    if (cardId && plans.length > 0) {
      const plan = plans.find(plan => plan.id === cardId)
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

  const renderMembershipCardsContent = () => {
    if (membershipCards.length > 0) {
      return (
        membershipCards.map(card => {
          const { companyName = 'Company Name', planName = 'Plan Name', colour, secondaryColour, iconImage } = getPlanInfo(card?.membership_plan)
          const { state, reason_codes } = card?.status
          return (
            <div key={card.id} className={styles.root__card}>
              <div className={styles['root__delete-button']}>DELETE</div>

              <div className={styles['root__content-container']}>
                <div className={styles['root__plan-info']}>
                  <img src={iconImage?.url} className={styles.root__image} alt='' />

                  <div className={styles['root__info-container']}>
                    <div className={styles.root__info}>{companyName}</div>
                    <div className={styles.root__info}>{planName}</div>
                    <div className={styles.root__info}>{state} - {reason_codes[0]}</div>
                    <div className={styles.root__info}>Balance string</div>
                  </div>
                </div>

                <div className={styles['root__colour-container']}>
                  <div className={styles['root__colour-block']} style={{ backgroundColor: colour }} />
                  <div className={styles['root__colour-block']} style={{ backgroundColor: secondaryColour }} />
                </div>
              </div>
            </div>
          )
        })
      )
    }
    return (
      <div className={styles['root__empty-state-container']}>
        <FuelGaugeSvg className={styles['root__empty-state-icon']} />
        <div className={styles['root__empty-state-text']}>You have no cards</div>
      </div>
    )
  }

  if (loading) {
    return <LoadingIndicator />
  }

  return (
    <div className={styles.root}>
      <AccountMenu />
      <h1 className={cx(styles.root__heading)}>Membership Cards</h1>

      <div className={styles['root__cards-container']}>
        {renderMembershipCardsContent()}
      </div>
    </div>
  )
}

export default MultichannelMembershipCards
