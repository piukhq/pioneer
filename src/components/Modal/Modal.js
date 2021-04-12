import React from 'react'
import cx from 'classnames'
import useModalSetup from './hooks/useModalSetup'
import useScrollFader from './hooks/useScrollFader'
import { ReactComponent as ModalCloseSvg } from 'images/modal-close.svg'
import styles from './Modal.module.scss'

const Modal = ({ children, onClose, className }) => {
  useModalSetup()
  const [opacity, scrollRef, scrollableRef] = useScrollFader()

  return (
    <>
      <div className={styles.root__overlay}></div>
      <div className={cx(styles.root__box, className)}>
        {onClose && <Modal.CloseButton onClick={onClose} />}
        <div className={styles.root__body} ref={scrollRef}>
          <div ref={scrollableRef}>
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
Modal.CloseButton = ({ onClick }) => <div onClick={onClick} className={styles['root__close-button']}>
  <ModalCloseSvg className={styles['root__close-button-svg']} />
</div>

export default Modal
