import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useLoadMembershipPlans from './hooks/useLoadMembershipPlans'
import { useMembershipCardsState } from 'hooks/membershipCards'
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
import { MEMBERSHIP_CARD_IMAGE_TYPES } from 'utils/enums'
import { getAuthToken } from 'utils/storage'

import styles from './MembershipCardAddPage.module.scss'

// todo: refactor in similar manner to MembershipCardPage

const MembershipCardAddPage = () => {
  // TODO: Temporary redirect for Web-464
  const history = useHistory()
  useEffect(() => {
    if (!getAuthToken()) {
      history.replace('/')
    }
  }, [history])

  useLoadMembershipPlans()
  const { loading: newMembershipCardLoading } = useMembershipCardsState().add

  const {
    isAddMembershipCardModalOpen,
    setAddMembershipCardModalOpen,
  } = useAddMembershipCard()

  const {
    isEnrolMembershipCardModalOpen,
    setEnrolMembershipCardModalOpen,
  } = useEnrolMembershipCard()
  const { planId } = useParams()

  const { plansLoading, membershipPlanById: plan } = useMembershipPlansState(planId)
  const imgUrl = plan?.images?.filter(image => image.type === MEMBERSHIP_CARD_IMAGE_TYPES.HERO)?.[0]?.url

  const canAdd = plan?.feature_set?.linking_support?.includes('ADD')
  const canEnrol = plan?.feature_set?.linking_support?.includes('ENROL')
  const isReaddRequired = useSelector(state => membershipCardsSelectors.isReaddRequired(state))

  // Scroll screen into display if major page re-render event occurs
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [plansLoading, newMembershipCardLoading, isReaddRequired])

  if (Config.isMerchantChannel && isReaddRequired) {
    return <MerchantMembershipCardAdd planId={planId} />
  }
  return (
    <>
      { plansLoading || newMembershipCardLoading ? <HangTight /> : null }
      { plan && !plansLoading && !newMembershipCardLoading && (
        <>
          <div className={styles.root}>
            { Config.isMerchantChannel ? (
              <MerchantMembershipCardEnrol planId={planId} />
            ) : (
                <>
                {/* This is Multimerchant specific and may change in future */}
                <AccountMenu />
                { imgUrl ? <img className={styles.root__image} src={ `${imgUrl}?width=300&height=183` } alt='' /> : null }
                <h1 className={styles.root__header}>Are you a member of the {plan.account.plan_name}?</h1>
                <div className={styles.root__text}>
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
