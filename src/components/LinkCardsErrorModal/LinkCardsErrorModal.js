import useContactSupport from 'hooks/useContactSupport'
import usePaymentCardDelete from './hooks/usePaymentCardDelete'
import Modal from 'components/Modal'
import Button from 'components/Button'

import styles from './LinkedCardsErrorModal.module.scss'

const LinkCardsErrorModal = ({ onClose, paymentCardId }) => {
  const { contactSupport } = useContactSupport()

  const {
    error,
    loading,
    handleDelete,
  } = usePaymentCardDelete(paymentCardId, onClose)

  return (
  <Modal onClose={onClose}>
    <Modal.Header>Card cannot be linked</Modal.Header>
    <p className={styles.root__paragraph}>
      Your credit/debit card cannot be linked to your {Config.planTitle} card. This usually happens when you have already linked it to a different {Config.planTitle} card.
    </p>
    {/* todo: consider replacing button with link tag to match its functionality. currently matching implementations elsewhere */}
    <Button onClick={handleDelete} disabled={loading} className={styles.root__button}>
      Delete credit/debit card</Button>
    { error && (
      <div className={styles.root__error}>
        There was an error, please try again
      </div>
    )}
    <Button onClick={contactSupport} secondary className={styles.root__button}>Contact Support</Button>
  </Modal>
  )
}

export default LinkCardsErrorModal
