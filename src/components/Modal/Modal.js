import React from 'react'
import cx from 'classnames'
import useModalSetup from './hooks/useModalSetup'
import styles from './Modal.module.scss'

const Modal = ({ children, onClose, className }) => {
  useModalSetup()

  return (
    <>
      <div className={styles.root__overlay}></div>
      <div className={cx(styles.root__box, className)}>
        {onClose && <Modal.CloseButton onClick={onClose} />}
        <div className={styles.root__body}>
          {children}
        </div>
      </div>
    </>
  )
}

Modal.Header = ({ children }) => <h2 className={styles.root__header}>{children}</h2>
Modal.CloseButton = ({ onClick }) => <div onClick={onClick} className={styles['root__close-button']}>×</div>

export default Modal
