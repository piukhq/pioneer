import React from 'react'
import { render } from '@testing-library/react'
import { useModals } from 'hooks/useModals'
import Voucher from './Voucher'

jest.mock('components/Modals/VoucherModal', () => () => null)
jest.mock('hooks/useModals', () => ({
  useModals: jest.fn(),
}))
const useModalsDefaultValues = {
  dispatchModal: jest.fn(),
  modalToRender: 'NO_MODAL',
}

const voucherComponent = (<Voucher voucher={{}}/>)

describe('Test Voucher', () => {
  it('should render voucher container', () => {
    useModals.mockImplementation(() => ({ ...useModalsDefaultValues }))
    const { queryByTestId } = render(voucherComponent)
    expect(queryByTestId('voucher-container')).toBeInTheDocument()
  })

  describe('Test Voucher Modal render', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('should render voucher modal', () => {
      useModals.mockImplementation(() => ({ modalToRender: 'VOUCHER' }))
      const { queryByTestId } = render(voucherComponent)
      expect(queryByTestId('voucher-modal')).toBeInTheDocument()
    })

    it('should not render voucher modal', () => {
      useModals.mockImplementation(() => ({ ...useModalsDefaultValues }))
      const { queryByTestId } = render(voucherComponent)
      expect(queryByTestId('voucher-modal')).not.toBeInTheDocument()
    })
  })
})
