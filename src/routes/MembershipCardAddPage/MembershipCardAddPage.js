import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useLoadMembershipPlans from './hooks/useLoadMembershipPlans'
import useAddMembershipCard from './hooks/useAddMembershipCard'
import useEnrolMembershipCard from './hooks/useEnrolMembershipCard'
import { useMembershipPlansState } from 'hooks/membershipPlans'
import Button from 'components/Button'
import AccountMenu from 'components/AccountMenu'
import MembershipCardAddModal from 'components/MembershipCardAddModal'
import MembershipCardEnrolModal from 'components/MembershipCardEnrolModal'
import HangTight from 'components/HangTight'
import MerchantMembershipCardEnrol from 'components/MerchantMembershipCardEnrol'
import MerchantMembershipCardAdd from 'components/MerchantMembershipCardAdd'
import { selectors as membershipCardsSelectors } from 'ducks/membershipCards'

import styles from './MembershipCardAddPage.module.scss'

const MEMBERSHIP_CARD_IMAGE_TYPES = {
  HERO: 0,
  BANNER: 1,
  OFFER: 2,
  ICON: 3,
  ASSET: 4,
  REFERENCE: 5,
  PERSONAL_OFFERS: 6,
  PROMOTIONS: 7,
  TIER: 8,
  ALTERNATIVE: 9,
}

const MembershipCardAddPage = () => {
  useLoadMembershipPlans()

  const {
    isAddMembershipCardModalOpen,
    setAddMembershipCardModalOpen,
  } = useAddMembershipCard()

  const {
    isEnrolMembershipCardModalOpen,
    setEnrolMembershipCardModalOpen,
  } = useEnrolMembershipCard()
  const { planId } = useParams()

  const { loading, membershipPlanById: plan } = useMembershipPlansState(planId)
  const imgUrl = plan?.images?.filter(image => image.type === MEMBERSHIP_CARD_IMAGE_TYPES.HERO)?.[0]?.url

  const canAdd = plan?.feature_set?.linking_support?.includes('ADD')
  const canEnrol = plan?.feature_set?.linking_support?.includes('ENROL')
  const isReaddRequired = useSelector(state => membershipCardsSelectors.isReaddRequired(state))

  // Scroll screen into display if major page re-render event occurs
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [loading, isReaddRequired])

  if (Config.isMerchantChannel && isReaddRequired) {
    return <MerchantMembershipCardAdd planId={planId} />
  }

  return (
    <>
      { loading ? <HangTight /> : null }
      { plan && (
        <>
          <div className={styles.root}>
            { Config.isMerchantChannel ? (
              <MerchantMembershipCardEnrol planId={planId} />
            ) : (
              <>
                <AccountMenu />
                { imgUrl ? <img className={styles.root__image} src={ `${imgUrl}?width=300&height=183` } alt='' /> : null }
                <h1 className={styles.root__header}>Are you a member of the {plan.account.plan_name}?</h1>
                <div className={styles.root__text}>
                  {/* todo: this copy should depend on the canAdd and canEnrol feature flags */}
                  Already have a card? Great we can get it associated to you in a few clicks. If not, we can get you a new one!
                </div>
                <div className={styles.root__buttons}>
                  { canAdd && <Button onClick={() => setAddMembershipCardModalOpen(true)}>I already have a card</Button> }
                  { canEnrol && <Button onClick={() => setEnrolMembershipCardModalOpen(true)}>Get a new card</Button> }
                </div>
              </>
            )}
          </div>
          { isAddMembershipCardModalOpen && (
            <MembershipCardAddModal planId={planId} onClose={() => setAddMembershipCardModalOpen(false)} />
          )}
          { isEnrolMembershipCardModalOpen && (
            <MembershipCardEnrolModal planId={planId} onClose={() => setEnrolMembershipCardModalOpen(false)} />
          ) }
        </>
      )}
    </>
  )
}

export default MembershipCardAddPage
