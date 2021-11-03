import React from 'react'
import { render } from '@testing-library/react'

import StampVoucher from './StampVoucher'

describe('Test StampVoucher', () => {
  const prefix = 'mock_prefix'
  const value = 2
  const suffix = 'mock_suffix'
  const target_value = 3
  const mockVoucher = {
    burn: {
      prefix,
      value,
      suffix,
    },
    earn: {
      prefix,
      value,
      suffix,
      target_value,
    },
  }

  it('should render voucher title', () => {
    // mockTitle: "mock_prefix2 mock_suffix"
    const mockTitle = prefix + value + ' ' + suffix
    const { getByText } = render(
      <StampVoucher
        voucher={mockVoucher}
      />,
    )
    expect(getByText(mockTitle)).toBeInTheDocument()
  })

  it('should render voucher description', () => {
    // mockDescription: "for collecting mock_prefix3 mock_suffix"
    const mockDescription = 'for collecting ' + prefix + target_value + ' ' + suffix
    const { getByText } = render(
      <StampVoucher
        voucher={mockVoucher}
      />,
    )
    expect(getByText(mockDescription)).toBeInTheDocument()
  })

  describe('Test voucher headline', () => {
    it('should render issued text', () => {
      const { getByText } = render(
        <StampVoucher
          voucher={{ ...mockVoucher, state: 'issued' }}
        />,
      )
      expect(getByText('Earned')).toBeInTheDocument()
    })

    it('should render inprogress text', () => {
      const mockStamps = target_value - value
      const { getByText } = render(
        <StampVoucher
          voucher={{ ...mockVoucher, state: 'inprogress' }}
        />,
      )
      expect(getByText(`${mockStamps} stamp to go`)).toBeInTheDocument()
    })

    it('should render default state text', () => {
      const mockState = 'mock_state'
      const { getByText } = render(
        <StampVoucher
          voucher={{ ...mockVoucher, state: mockState }}
        />,
      )
      expect(getByText(mockState)).toBeInTheDocument()
    })
  })

  describe('Test voucher progress steps', () => {
    it('should render the correct number of filled progress steps', () => {
      const { queryByTestId } = render(
        <StampVoucher
          voucher={mockVoucher}
        />,
      )
      const mockFilledProgressStep1 = 'filled progress-step 0'
      const mockFilledProgressStep2 = 'filled progress-step 1'
      const mockFilledProgressStep3 = 'filled progress-step 2'

      expect(queryByTestId(mockFilledProgressStep1)).toBeInTheDocument()
      expect(queryByTestId(mockFilledProgressStep2)).toBeInTheDocument()
      expect(queryByTestId(mockFilledProgressStep3)).not.toBeInTheDocument()
    })

    it('should render the correct number of empty progress steps', () => {
      const { queryByTestId } = render(
        <StampVoucher
          voucher={mockVoucher}
        />,
      )
      const mockEmptyProgressStep1 = 'empty progress-step 0'
      const mockEmptyProgressStep2 = 'empty progress-step 1'
      const mockEmptyProgressStep3 = 'empty progress-step 2'

      expect(queryByTestId(mockEmptyProgressStep1)).not.toBeInTheDocument()
      expect(queryByTestId(mockEmptyProgressStep2)).not.toBeInTheDocument()
      expect(queryByTestId(mockEmptyProgressStep3)).toBeInTheDocument()
    })
  })

  describe('Test voucher footer', () => {
    describe('Test inprogress/issued footer', () => {
    // inProgressEarnedText: "mock_prefix2/mock_prefix3 mock_suffix"
      const inProgressEarnedText = `${prefix}${value}/${prefix}${target_value} ${suffix}`
      it("should render correct footer if voucher state is 'inprogress'", () => {
        const { getByText } = render(
          <StampVoucher
            voucher={{ ...mockVoucher, state: 'inprogress' }}
          />,
        )
        expect(getByText('Collected:')).toBeInTheDocument()
        expect(getByText(inProgressEarnedText)).toBeInTheDocument()
      })

      it("should render correct footer if voucher state is 'issued'", () => {
        const { getByText } = render(
          <StampVoucher
            voucher={{ ...mockVoucher, state: 'issued' }}
          />,
        )
        expect(getByText('Collected:')).toBeInTheDocument()
        expect(getByText(inProgressEarnedText)).toBeInTheDocument()
      })

      it("should not render 'inprogress' or 'issued' footer", () => {
        const { queryByText } = render(
          <StampVoucher
            voucher={{ ...mockVoucher, state: 'mock_state' }}
          />,
        )
        expect(queryByText('Collected:')).not.toBeInTheDocument()
        expect(queryByText(inProgressEarnedText)).not.toBeInTheDocument()
      })
    })

    describe('Test redeemed footer', () => {
      const expectedText = 'on 01 Jan 2000'
      const date = new Date(2000, 0, 1)
      const mockRedeemedDate = date.getTime() / 1000
      it("should render redeemed footer if state is 'redeemed' and date_redeemed is not undefined", () => {
        const { getByText } = render(
          <StampVoucher
            voucher={{ ...mockVoucher, state: 'redeemed', date_redeemed: mockRedeemedDate }}
          />,
        )
        expect(getByText(expectedText)).toBeInTheDocument()
      })

      it("should not render redeemed footer if state is not 'redeemed'", () => {
        const { queryByText } = render(
          <StampVoucher
            voucher={{ ...mockVoucher, state: 'mock_state', date_redeemed: mockRedeemedDate }}
          />,
        )
        expect(queryByText(expectedText)).not.toBeInTheDocument()
      })

      it('should not render redeemed footer if date_redeemed is undefined', () => {
        const { queryByText } = render(
          <StampVoucher
            voucher={{ ...mockVoucher, state: 'redeemed' }}
          />,
        )
        expect(queryByText(expectedText)).not.toBeInTheDocument()
      })
    })

    describe('Test expired/cancelled footer', () => {
      const expectedText = 'on 01 Jan 2000'
      const date = new Date(2000, 0, 1)
      const mockExpiredDate = date.getTime() / 1000
      it("should render footer if state is 'expired' and expiry_date is not undefined", () => {
        const { getByText } = render(
          <StampVoucher
            voucher={{ ...mockVoucher, state: 'expired', expiry_date: mockExpiredDate }}
          />,
        )
        expect(getByText(expectedText)).toBeInTheDocument()
      })

      it("should render footer if state is 'cancelled' and expiry_date is not undefined", () => {
        const { getByText } = render(
          <StampVoucher
            voucher={{ ...mockVoucher, state: 'cancelled', expiry_date: mockExpiredDate }}
          />,
        )
        expect(getByText(expectedText)).toBeInTheDocument()
      })

      it("should not render redeemed footer if state is not 'expired' or 'cancelled'", () => {
        const { queryByText } = render(
          <StampVoucher
            voucher={{ ...mockVoucher, state: 'mock_state', expiry_date: mockExpiredDate }}
          />,
        )
        expect(queryByText(expectedText)).not.toBeInTheDocument()
      })

      it('should not render redeemed footer if expiry_date is undefined', () => {
        const { queryByText } = render(
          <StampVoucher
            voucher={{ ...mockVoucher, state: 'cancelled' }}
          />,
        )
        expect(queryByText(expectedText)).not.toBeInTheDocument()
      })
    })
  })
})
