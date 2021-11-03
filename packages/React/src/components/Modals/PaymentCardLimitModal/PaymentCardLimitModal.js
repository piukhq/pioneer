import React, { useCallback } from 'react'
import Modal from 'components/Modal'
import Button from 'components/Button'
import { useModals } from 'hooks/useModals'
import { MODAL_ACTION_TYPES as modalEnum } from 'utils/enums'

import styles from './PaymentCardLimitModal.module.scss'

const PaymentCardLimitModal = () => {
  const { dispatchModal } = useModals()
  const handleDismissButtonClick = useCallback(() => { dispatchModal(modalEnum.NO_MODAL) }, [dispatchModal])

  return (
    <Modal>
      <Modal.Header>Limit reached</Modal.Header>
      <div className={styles.root__paragraph}>
        You have reached your limit of 5 credit/debit cards. Please delete one before attempting to add another.
      </div>
      <Button className={styles.root__button} onClick={handleDismissButtonClick}>Dismiss</Button>
    </Modal>
  )
}

export default PaymentCardLimitModal
