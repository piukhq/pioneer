import React from 'react'
import Modal from 'components/Modal'
import dayjs from 'dayjs'

import { useMembershipCardStateById } from 'hooks/membershipCards'

const NonActiveVouchersModal = ({ membershipCardId, onClose }) => {
  const { nonActiveVouchers } = useMembershipCardStateById(membershipCardId)

  return (
    <Modal onClose={onClose}>
      <Modal.Header>Voucher history</Modal.Header>

      { nonActiveVouchers?.length > 0 ? (
        <ul>
          { nonActiveVouchers?.map((voucher, index) => (
            <li key={index}>
              {voucher.headline},{' '}
              {dayjs(voucher.expiry_date * 1000).format('YYYY-MM-DD')},{' '}
              {voucher?.earn?.value}/{voucher?.earn?.target_value}
            </li>
          )) }
        </ul>
      ) : (
        <div>
          There are no vouchers in your history
        </div>
      ) }
    </Modal>
  )
}

export default NonActiveVouchersModal
