import React from 'react'
import * as reactRedux from 'react-redux'
import { render } from '@testing-library/react'

import MembershipCard from './MembershipCard'

describe('Test MembershipCard', () => {
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')

  const mockCompanyName = 'mock_company_name'
  const mockImgUrl = 'mock_image_url'

  const mockMembershipPlan = {
    id: 'mock_plan_id',
    account: {
      company_name: mockCompanyName,
    },
    card: {
      colour: 'mock_colour',
      secondary_colour: 'mock_secondary_colour',
    },
    feature_set: {
      card_type: 2,
      has_vouchers: true,
    },
    images: [{
      type: 3,
      url: mockImgUrl,
    }],
  }

  const mockMembershipPlans = [mockMembershipPlan]

  const mockReasonCode = 'mock_reason_code'
  const mockVoucherPrefix = 'mock_voucher_prefix'
  const mockVoucherValue = '1.00'
  const mockVoucherTargetValue = '2.00'
  const mockVoucherSuffix = 'mock_voucher_suffix'

  const mockVoucher = {
    state: 'inprogress',
    earn: {
      type: 'accumulator',
      prefix: mockVoucherPrefix,
      value: mockVoucherValue,
      target_value: mockVoucherTargetValue,
      suffix: mockVoucherSuffix,
    },
  }

  const mockCard = {
    id: 'mock_id',
    status: {
      state: 'authorised',
      reason_codes: [mockReasonCode],
    },
    membership_plan: 'mock_plan_id',
    payment_cards: [],
    vouchers: [mockVoucher],
  }

  const membershipCardComponent = <MembershipCard card={mockCard}/>

  beforeEach(() => {
    jest.clearAllMocks()
    useSelectorMock.mockClear()
    useSelectorMock.mockReturnValue(mockMembershipPlans)
  })

  it('should render a membership card', () => {
    const { getByTestId } = render(membershipCardComponent)
    expect(getByTestId('membership-card')).toBeInTheDocument()
  })

  it('should render the correct card image', () => {
    const { getByRole } = render(membershipCardComponent)
    expect(getByRole('img')).toHaveAttribute('src', mockImgUrl)
  })

  it('should render the company name', () => {
    const { getByText } = render(membershipCardComponent)
    expect(getByText(mockCompanyName)).toBeInTheDocument()
  })

  describe('Test the balance string', () => {
    const mockBalanceString = `${mockVoucherPrefix}${mockVoucherValue}/${mockVoucherPrefix}${mockVoucherTargetValue} ${mockVoucherSuffix}`

    it('should render a "Pending" string', () => {
      const mockPendingCard = {
        ...mockCard,
        status: {
          state: 'pending',
        },
      }

      const { getByText } = render(<MembershipCard card={mockPendingCard}/>)
      expect(getByText('Pending')).toBeInTheDocument()
    })

    it('should render an "Error" string', () => {
      const mockPendingCard = {
        ...mockCard,
        status: {
          state: 'non_authorised_or_pending_state',
        },
      }

      const { getByText } = render(<MembershipCard card={mockPendingCard}/>)
      expect(getByText('Error')).toBeInTheDocument()
    })

    it('should render the balance string', () => {
      const { getByText } = render(membershipCardComponent)
      expect(getByText(mockBalanceString)).toBeInTheDocument()
    })

    it('should not render the balance string', () => {
      const mockNonPLLPlan = [{
        ...mockMembershipPlan,
        feature_set: {
          card_type: 3,
        },
      }]

      useSelectorMock.mockClear()
      useSelectorMock.mockReturnValueOnce(mockNonPLLPlan)

      const { queryByText } = render(membershipCardComponent)
      expect(queryByText(mockBalanceString)).not.toBeInTheDocument()
    })
  })

  describe('Test the status string', () => {
    it('should render "Unlinked"', () => {
      const { getByText } = render(membershipCardComponent)
      expect(getByText('Unlinked')).toBeInTheDocument()
    })

    it('should render "Linked"', () => {
      const mockLinkedPaymentCardsCard = {
        ...mockCard,
        payment_cards: [{}],
      }

      const { getByText } = render(<MembershipCard card={mockLinkedPaymentCardsCard}/>)
      expect(getByText('Linked')).toBeInTheDocument()
    })

    it('should not render status string', () => {
      const mockNonPLLPlan = [{
        ...mockMembershipPlan,
        feature_set: {
          card_type: 3,
        },
      }]

      useSelectorMock.mockClear()
      useSelectorMock.mockReturnValueOnce(mockNonPLLPlan)

      const { queryByText } = render(membershipCardComponent)

      expect(queryByText('Linked')).not.toBeInTheDocument()
      expect(queryByText('Unlinked')).not.toBeInTheDocument()
    })
  })
})
