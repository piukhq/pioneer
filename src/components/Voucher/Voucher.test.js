import React from 'react'
import { render } from '@testing-library/react'

import Voucher from './Voucher'

jest.mock('components/VoucherModal', () => () => null)

describe('Test Voucher', () => {
  it('should render voucher container', () => {
    const { queryByTestId } = render(
      <Voucher
        voucher={{}}
      />,
    )
    expect(queryByTestId('voucher-container')).toBeInTheDocument()
  })

  describe('Test Voucher Modal render', () => {
    const mockSetVoucherModalVisible = jest.fn()

    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('should render voucher modal', () => {
      React.useState = jest.fn().mockReturnValue([true, mockSetVoucherModalVisible])
      const { queryByTestId } = render(
        <Voucher
          voucher={{}}
        />,
      )
      expect(queryByTestId('voucher-modal')).toBeInTheDocument()
    })

    it('should not render voucher modal', () => {
      React.useState = jest.fn().mockReturnValue([false, mockSetVoucherModalVisible])
      const { queryByTestId } = render(
        <Voucher
          voucher={{}}
        />,
      )
      expect(queryByTestId('voucher-modal')).not.toBeInTheDocument()
    })
  })
})
