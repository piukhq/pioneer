import React, { useEffect, useState } from 'react'
import bwipjs from 'bwip-js'
import cx from 'classnames'
import Modal from 'components/Modal'
import HighVisibilityLabel from 'components/HighVisibilityLabel'
import { MEMBERSHIP_CARD_IMAGE_TYPES, BARCODE_TYPES } from 'utils/enums'

import styles from './MembershipCardHeroModal.module.scss'

const MembershipCardHeroModal = ({ membershipCard }) => {
  const imageUrl = membershipCard?.images?.filter(image => image.type === MEMBERSHIP_CARD_IMAGE_TYPES.ALTERNATIVE)?.[0]?.url
  const backgroundColor = membershipCard?.card?.colour
  const cardId = membershipCard?.card?.membership_id

  const [barcodeError, setBarcodeError] = useState(false)
  const [barcodeIndex, setBarcodeIndex] = useState(0)

  const barcodeArray = Object.keys(BARCODE_TYPES)

  // TODO: Remove once multi card wallet LCD is complete
  const incrementIndex = () => {
    if (barcodeIndex === barcodeArray.length - 1) {
      setBarcodeIndex(0)
    } else {
      setBarcodeIndex((currentIndex) => currentIndex + 1)
    }
  }

  useEffect(() => {
    const type = BARCODE_TYPES[barcodeArray[barcodeIndex]]
    try {
      bwipjs.toCanvas('barcode', {
        bcid: type,
        text: cardId,
        scale: 8,
        includetext: true,
        textxalign: 'center',
      })

      setBarcodeError(false)
    } catch (e) {
      setBarcodeError(true)
    }
  }, [cardId, barcodeIndex, barcodeArray])

  console.log(process.env.NODE_ENV)

  return (
    <Modal className={styles.root}>
      <div data-testid='membership-card-hero-modal' className={styles.root__container}>
        <div className={styles['root__image-container']} style={{ backgroundColor }}>
          <img src={imageUrl} className={styles.root__image} alt='' />
        </div>

        <HighVisibilityLabel value={cardId} />

        {Config.membershipCardModalText && (
          <div className={styles.root__text}>{Config.membershipCardModalText}</div>
        )}

        {/* TODO: Dev environment dependancy only needed until there is a way to view merchant cards with barcodes */}
        {process.env.NODE_ENV === 'development' && (
          <div className={cx('dev-only', styles['root__barcode-container'], styles['root__dev-only'])}>
            <canvas id="barcode" hidden={barcodeError}></canvas>

            {barcodeError && (
              <div>Cannot display barcode</div>
            )}

            <button className={styles['root__cycle-button']} onClick={incrementIndex}>Cycle</button>
          </div>
        )}

      </div>
    </Modal>
  )
}

export default MembershipCardHeroModal
