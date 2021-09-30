import { useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import cx from 'classnames'
import AccountMenu from 'components/AccountMenu'
import LoadingIndicator from 'components/LoadingIndicator'
import MembershipCardDeleteModal from 'components/Modals/MembershipCardDeleteModal'
import { selectors as membershipPlansSelectors } from 'ducks/membershipPlans'
import { useMembershipCardsState } from 'hooks/membershipCards'
import { useModals } from 'hooks/useModals'
import { ReactComponent as FuelGaugeSvg } from 'images/fuel.svg'
import { formatValueToDecimalPlace } from 'utils/format'

import styles from './MultichannelMembershipCards.module.scss'

const MultichannelMembershipCards = () => {
  const { membershipCards, loading } = useMembershipCardsState()
  const { dispatchModal, modalToRender } = useModals()
  const plans = useSelector(state => membershipPlansSelectors.plansList(state))

  // Stores membership card that delete modal is associated with
  const [deleteModalMembershipCard, setDeleteModalMembershipCard] = useState(null)

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

  const handleDeleteButtonClick = useCallback((card) => {
    setDeleteModalMembershipCard(card)
    dispatchModal('MEMBERSHIP_CARD_DELETE')
  }, [dispatchModal])

  // Separate to getPlanInfo as that function returns additional info we are not interested in
  const getPlanString = () => {
    const plan = plans.find(plan => plan.id === deleteModalMembershipCard.membership_plan)
    if (plan) {
      const { plan_name: planName, plan_name_card: planNameCard } = plan?.account
      return `${planName} ${planNameCard}`
    }
    return 'card'
  }

  const renderMembershipCardsContent = () => {
    if (membershipCards.length > 0) {
      return (
        membershipCards.map(card => {
          const { companyName = 'Company Name', planName = 'Plan Name', colour, secondaryColour, iconImage } = getPlanInfo(card.membership_plan)
          const { state, reason_codes } = card.status
          return (
            <div key={card.id} className={styles.root__card}>
              <button className={styles['root__delete-button']} onClick={handleDeleteButtonClick}>DELETE</button>

              <div className={styles['root__content-container']}>
                <div className={styles['root__plan-info']}>
                  <img src={iconImage?.url} className={styles.root__image} alt='' />

                  <div className={styles['root__info-container']}>
                    <div className={styles.root__info}>{companyName}</div>
                    <div className={styles.root__info}>{planName}</div>
                    <div className={styles.root__info}>{state} - {reason_codes[0]}</div>
                    <div className={styles.root__info}>{getBalanceString(card)}</div>
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
      {modalToRender === 'MEMBERSHIP_CARD_DELETE' && <MembershipCardDeleteModal onClose={() => setDeleteModalMembershipCard(null)} cardId={deleteModalMembershipCard.id} planString={getPlanString()}/>}

      <AccountMenu />
      <h1 className={cx(styles.root__heading)}>Membership Cards</h1>

      <div className={styles['root__cards-container']}>
        {renderMembershipCardsContent()}
      </div>
    </div>
  )
}

export default MultichannelMembershipCards
