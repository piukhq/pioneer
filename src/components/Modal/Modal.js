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
      <div className={styles.root__overlay}></div>
      <div className={styles.root__box}>
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
