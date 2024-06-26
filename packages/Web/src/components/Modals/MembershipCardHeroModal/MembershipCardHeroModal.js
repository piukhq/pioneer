import React, { useEffect, useState } from 'react'
import bwipjs from 'bwip-js'
import Modal from 'components/Modal'
import HighVisibilityLabel from 'components/HighVisibilityLabel'
import { useMembershipPlansState } from 'hooks/membershipPlans'

import { MEMBERSHIP_CARD_IMAGE_TYPES, BARCODE_TYPES } from 'utils/enums'

import styles from './MembershipCardHeroModal.module.scss'

const MembershipCardHeroModal = ({ membershipCard }) => {
  const imageUrl = membershipCard?.images?.filter(image => image.type === MEMBERSHIP_CARD_IMAGE_TYPES.ICON)?.[0]?.url
  const { membership_id: cardId, barcode_type: barcodeType, barcode: barcodeNumber } = membershipCard?.card

  const {
    membershipPlanById: plan,
  } = useMembershipPlansState(membershipCard.membership_plan)

  const { company_name: companyName } = plan?.account

  const shouldRenderBarcode = barcodeType !== undefined && barcodeNumber !== undefined
  const shouldRenderBarcodeNumber = barcodeNumber && barcodeNumber !== cardId

  const [barcodeError, setBarcodeError] = useState(false)

  const barcodeArray = Object.keys(BARCODE_TYPES)

  useEffect(() => {
    const type = BARCODE_TYPES[barcodeArray[barcodeType]]
    try {
      bwipjs.toCanvas('barcode', {
        bcid: type,
        text: barcodeNumber,
        scale: 8,
      })

      setBarcodeError(false)
    } catch (e) {
      setBarcodeError(true)
    }
  }, [cardId, barcodeType, barcodeArray, barcodeNumber])

  const prefixText = shouldRenderBarcode ? 'Show this barcode' : 'Share this number'

  const shouldRenderHighVisibilityLabels = () => {
    if (cardId || shouldRenderBarcodeNumber) {
      return (
        <div className={styles['root__high-visibility-label-container']}>
          { cardId && (
            <div className={styles['root__high-visibility-label']}>
              <HighVisibilityLabel value={cardId} title='Membership number:' />
            </div>
          ) }

          { shouldRenderBarcodeNumber && (
            <div className={styles['root__high-visibility-label']}>
              <HighVisibilityLabel value={barcodeNumber} title='Barcode:' />
            </div>
          ) }
        </div>
      )
    }
    return null
  }

  return (
    <Modal className={styles.root}>
      <div className={styles.root__container}>
        <div className={styles['root__company-name']}>{companyName}</div>

        { !shouldRenderBarcode && (
          <div className={styles['root__image-container']}>
            <img src={imageUrl} className={styles.root__image} alt='' />
          </div>
        ) }

        { shouldRenderBarcode && (
          <>
            <canvas id="barcode" hidden={barcodeError} className={styles.root__barcode}></canvas>
            { barcodeError && (
              <div>Cannot display barcode</div>
            ) }
          </>
        ) }

        <div className={styles.root__text}>{`${prefixText} in-store just like you would a physical loyalty card.`}</div>

        {shouldRenderHighVisibilityLabels()}
      </div>
    </Modal>
  )
}

export default MembershipCardHeroModal
