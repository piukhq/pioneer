import React from 'react'
import Modal from 'components/Modal'

import { useMembershipCardStateById } from 'hooks/membershipCards'
import Voucher from 'components/Voucher'

const NonActiveVouchersModal = ({ membershipCardId, onClose }) => {
  const { nonActiveVouchers } = useMembershipCardStateById(membershipCardId)

  return (
    <Modal onClose={onClose}>
      <Modal.Header>Rewards history</Modal.Header>

      { nonActiveVouchers?.length > 0 ? (
        <>
          { nonActiveVouchers?.map((voucher, index) => (
            <Voucher voucher={voucher} key={index} />
          )) }
        </>
      ) : (
        <div>
          There are no vouchers in your history
        </div>
      ) }
    </Modal>
  )
}

export default NonActiveVouchersModal
