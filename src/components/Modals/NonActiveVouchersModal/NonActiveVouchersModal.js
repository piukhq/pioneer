import React from 'react'
import Modal from 'components/Modal'
import Voucher from 'components/Voucher'
import { useMembershipCardStateById } from 'hooks/membershipCards'

import styles from './NonActiveVouchersModal.module.scss'

const NonActiveVouchersModal = ({ membershipCardId }) => {
  const { nonActiveVouchers } = useMembershipCardStateById(membershipCardId)

  return (
    <Modal className={styles.root}>
      <Modal.Header>Rewards history</Modal.Header>
      <div className={styles.root__description}>Your past rewards</div>
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
