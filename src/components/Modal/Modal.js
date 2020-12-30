import React, { useEffect } from 'react'

import styles from './Modal.module.scss'

const Modal = ({ children, onClose }) => {
  useEffect(() => {
    document.getElementsByTagName('html')[0].classList.add('modal--no-scroll')
    return () => {
      document.getElementsByTagName('html')[0].classList.remove('modal--no-scroll')
    }
  }, [])
  return (
    <>
      <div className={styles.modal__overlay}></div>
      <div className={styles.modal__box}>
        {onClose && <Modal.CloseButton onClick={onClose} />}
        <div className={styles.modal__body}>
          {children}
        </div>
      </div>
    </>
  )
}

Modal.Header = ({ children }) => <h2 className={styles.modal__header}>{children}</h2>
Modal.CloseButton = ({ onClick }) => <div onClick={onClick} className={styles['modal__close-button']}>×</div>

export default Modal
