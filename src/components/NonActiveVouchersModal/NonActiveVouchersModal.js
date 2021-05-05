import React from 'react'
import Modal from 'components/Modal'
import Voucher from 'components/Voucher'
import { useMembershipCardStateById } from 'hooks/membershipCards'

import styles from './NonActiveVouchersModal.module.scss'

const NonActiveVouchersModal = ({ membershipCardId, onClose }) => {
  const { nonActiveVouchers } = useMembershipCardStateById(membershipCardId)

  return (
    <Modal onClose={onClose} className={styles.root}>
      <Modal.Header>Rewards history</Modal.Header>

      { nonActiveVouchers?.length > 0 ? (
        <div className={styles.root__vouchers}>
          { nonActiveVouchers?.map((voucher, index) => (
            <Voucher voucher={voucher} key={index} />
          )) }
        </div>
      ) : (
        <div>
          There are no vouchers in your history
        </div>
      ) }
    </Modal>
  )
}

export default NonActiveVouchersModal
