import React from 'react'
import { render } from '@testing-library/react'

import AccumulatorVoucher from './AccumulatorVoucher'

describe('Test AccumulatorVoucher', () => {
  const prefix = 'mock_prefix'
  const value = 2
  const type = 'mock_type'
  const target_value = 3
  const mockVoucher = {
    burn: {
      prefix,
      value,
      type,
    },
    earn: {
      prefix,
      value,
      target_value,
    },
  }

  it('should render voucher title', () => {
    // mockTitle: "mock_prefix2 mock_type"
    const mockTitle = prefix + value + ' ' + type
    const { getByText } = render(
      <AccumulatorVoucher
        voucher={mockVoucher}
      />,
    )
    expect(getByText(mockTitle)).toBeInTheDocument()
  })

  it('should render voucher description', () => {
    // mockDescription: "for spending mock_prefix3 mock_type"
    const mockDescription = 'for spending ' + prefix + target_value
    const { getByText } = render(
      <AccumulatorVoucher
        voucher={mockVoucher}
      />,
    )
    expect(getByText(mockDescription)).toBeInTheDocument()
  })

  describe('Test voucher headline', () => {
    it('should render issued text', () => {
      const { getByText } = render(
        <AccumulatorVoucher
          voucher={{ ...mockVoucher, state: 'issued' }}
        />,
      )
      expect(getByText('Earned')).toBeInTheDocument()
    })

    it('should render inprogress text', () => {
      const mockAmountToGo = target_value - value
      const { getByText } = render(
        <AccumulatorVoucher
          voucher={{ ...mockVoucher, state: 'inprogress' }}
        />,
      )
      expect(getByText(`${prefix}${mockAmountToGo} left to go!`)).toBeInTheDocument()
    })

    it('should render deafult state text', () => {
      const mockState = 'mock_state'
      const { getByText } = render(
        <AccumulatorVoucher
          voucher={{ ...mockVoucher, state: mockState }}
        />,
      )
      expect(getByText(mockState)).toBeInTheDocument()
    })
  })

  describe('Test voucher progress bar', () => {
    it('should render the correct progress percentage', () => {
      const mockPercentageEarned = (value / target_value) * 100

      const { queryByTestId } = render(
        <AccumulatorVoucher
          voucher={mockVoucher}
        />,
      )
      const mockFilledPercentage = `accumulator-${mockPercentageEarned}-percent-filled`

      expect(queryByTestId(mockFilledPercentage)).toBeInTheDocument()
    })
  })

  describe('Test voucher footer', () => {
    describe('Test inprogress/issued footer', () => {
      const spentText = `${prefix}${value}`
      const goalText = `${prefix}${target_value}`
      it("should render correct footer if voucher state is 'inprogress'", () => {
        const { getByText } = render(
          <AccumulatorVoucher
            voucher={{ ...mockVoucher, state: 'inprogress' }}
          />,
        )
        expect(getByText('Spent:')).toBeInTheDocument()
        expect(getByText(spentText)).toBeInTheDocument()
        expect(getByText('Goal:')).toBeInTheDocument()
        expect(getByText(goalText)).toBeInTheDocument()
      })

      it("should render correct footer if voucher state is 'issued'", () => {
        const { getByText } = render(
          <AccumulatorVoucher
            voucher={{ ...mockVoucher, state: 'issued' }}
          />,
        )
        expect(getByText('Spent:')).toBeInTheDocument()
        expect(getByText(spentText)).toBeInTheDocument()
        expect(getByText('Goal:')).toBeInTheDocument()
        expect(getByText(goalText)).toBeInTheDocument()
      })

      it("should not render 'inprogress' or 'issued' footer", () => {
        const { queryByText } = render(
          <AccumulatorVoucher
            voucher={{ ...mockVoucher, state: 'mock_state' }}
          />,
        )
        expect(queryByText('Spent:')).not.toBeInTheDocument()
        expect(queryByText(spentText)).not.toBeInTheDocument()
        expect(queryByText('Goal:')).not.toBeInTheDocument()
        expect(queryByText(goalText)).not.toBeInTheDocument()
      })
    })

    describe('Test redeemed footer', () => {
      const expectedText = 'on 01 Jan 2000'
      const date = new Date(2000, 0, 1)
      const mockRedeemedDate = date.getTime() / 1000
      it("should render redeemed footer if state is 'redeemed' and date_redeemed is not undefined", () => {
        const { getByText } = render(
          <AccumulatorVoucher
            voucher={{ ...mockVoucher, state: 'redeemed', date_redeemed: mockRedeemedDate }}
          />,
        )
        expect(getByText(expectedText)).toBeInTheDocument()
      })

      it("should not render redeemed footer if state is not 'redeemed'", () => {
        const { queryByText } = render(
          <AccumulatorVoucher
            voucher={{ ...mockVoucher, state: 'mock_state', date_redeemed: mockRedeemedDate }}
          />,
        )
        expect(queryByText(expectedText)).not.toBeInTheDocument()
      })

      it('should not render redeemed footer if date_redeemed is undefined', () => {
        const { queryByText } = render(
          <AccumulatorVoucher
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
          <AccumulatorVoucher
            voucher={{ ...mockVoucher, state: 'expired', expiry_date: mockExpiredDate }}
          />,
        )
        expect(getByText(expectedText)).toBeInTheDocument()
      })

      it("should render footer if state is 'cancelled' and expiry_date is not undefined", () => {
        const { getByText } = render(
          <AccumulatorVoucher
            voucher={{ ...mockVoucher, state: 'cancelled', expiry_date: mockExpiredDate }}
          />,
        )
        expect(getByText(expectedText)).toBeInTheDocument()
      })

      it("should not render redeemed footer if state is not 'expired' or 'cancelled'", () => {
        const { queryByText } = render(
          <AccumulatorVoucher
            voucher={{ ...mockVoucher, state: 'mock_state', expiry_date: mockExpiredDate }}
          />,
        )
        expect(queryByText(expectedText)).not.toBeInTheDocument()
      })

      it('should not render redeemed footer if expiry_date is undefined', () => {
        const { queryByText } = render(
          <AccumulatorVoucher
            voucher={{ ...mockVoucher, state: 'cancelled' }}
          />,
        )
        expect(queryByText(expectedText)).not.toBeInTheDocument()
      })
    })
  })
})
