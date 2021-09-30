import useContactSupport from 'hooks/useContactSupport'
import usePaymentCardDelete from './hooks/usePaymentCardDelete'
import { useMembershipCardDetailsByCardId } from 'hooks/useMembershipCardDetailsByCardId'
import Modal from 'components/Modal'
import Button from 'components/Button'

import styles from './LinkedCardsErrorModal.module.scss'

const LinkCardsErrorModal = ({ paymentCardId }) => {
  const { contactSupport } = useContactSupport()
  const { planName, planNameSuffix } = useMembershipCardDetailsByCardId()

  const {
    error,
    loading,
    handleDelete,
  } = usePaymentCardDelete(paymentCardId)

  const errorMessage = error ? 'There was an error, please try again.' : null

  return (
  <Modal>
    <Modal.Header>Card cannot be linked</Modal.Header>
    <div className={styles.root__paragraph}>
      Your credit/debit card cannot be linked to your {planName} {planNameSuffix}. This usually happens when you have already linked it to a different {planName} {planNameSuffix}.
    </div>
    <Button
      onClick={handleDelete}
      disabled={loading}
      className={styles.root__button}
      error={errorMessage}
    >Delete credit/debit card</Button>
    <Button onClick={contactSupport} secondary className={styles.root__button}>Contact support</Button>
  </Modal>
  )
}

export default LinkCardsErrorModal
