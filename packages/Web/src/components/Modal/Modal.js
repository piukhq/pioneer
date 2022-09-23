import React from 'react'
import cx from 'classnames'
import useModalSetup from './hooks/useModalSetup'
import useScrollFader from './hooks/useScrollFader'
import { useModals } from 'hooks/useModals'
import { MODAL_ACTION_TYPES as modalEnum } from 'utils/enums'
import ModalCloseSvg from 'images/modal-close.svg'
import styles from './Modal.module.scss'

const Modal = ({ children, className, isLoading, onClose, noCloseModal }) => {
  useModalSetup()
  const { dispatchModal } = useModals()
  const [opacity, scrollRef, scrollableRef] = useScrollFader()

  const handleClose = () => {
    onClose && onClose()
    dispatchModal(modalEnum.NO_MODAL)
  }

  return (
    <>
      <div className={styles.root__overlay} onClick={handleClose}></div>
      <div className={cx(styles.root__box, className)}>
        {!noCloseModal && <Modal.CloseButton onClick={handleClose} disabled={isLoading} />}
        <div className={styles.root__body} ref={scrollRef}>
          <div className={styles.root__scrollable} ref={scrollableRef}>
            {children}
          </div>
        </div>
        <div className={styles['root__bottom-fade']} style={{ opacity }}/>
        <div className={styles['root__top-fade']}/>
      </div>
    </>
  )
}

Modal.Header = ({ children }) => <h2 className={styles.root__header}>{children}</h2>
Modal.CloseButton = ({ onClick, disabled }) => (
  <button
    className={cx(
      styles['root__close-button'],
      disabled && styles['root__close-button--disabled'],
    )}
    onClick={onClick}
    disabled={disabled}
  >
    <ModalCloseSvg className={styles['root__close-button-svg']} />
  </button>
)

export default Modal
