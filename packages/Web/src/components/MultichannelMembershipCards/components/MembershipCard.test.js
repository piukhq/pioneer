import React from 'react'
import * as reactRedux from 'react-redux'
import { render } from '@testing-library/react'

import MembershipCard from './MembershipCard'

describe('Test MembershipCard', () => {
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')

  const mockCompanyName = 'mock_company_name'
  const mockPlanName = 'mock_plan_name'
  const mockImgUrl = 'mock_image_url'

  const mockMembershipPlans = [{
    id: 'mock_plan_id',
    account: {
      company_name: mockCompanyName,
      plan_name: mockPlanName,
    },
    card: {
      colour: 'mock_colour',
      secondary_colour: 'mock_secondary_colour',
    },
    images: [{
      type: 3,
      url: mockImgUrl,
    }],
  }]

  const mockCardState = 'mock_state'
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
      state: mockCardState,
      reason_codes: [mockReasonCode],
    },
    membership_plan: 'mock_plan_id',
    vouchers: [mockVoucher],
  }

  const membershipCardComponent = <MembershipCard card={mockCard}/>

  beforeEach(() => {
    useSelectorMock.mockClear()
    jest.clearAllMocks()
    useSelectorMock.mockReturnValueOnce(mockMembershipPlans)
  })

  it('should render a membership card', () => {
    const { getByTestId } = render(membershipCardComponent)
    expect(getByTestId('membership-card')).toBeInTheDocument()
  })

  it('should render the correct card image', () => {
    const { getByRole } = render(membershipCardComponent)
    expect(getByRole('img')).toHaveAttribute('src', mockImgUrl)
  })

  it('should render the correct card info', () => {
    const { getByText } = render(membershipCardComponent)
    expect(getByText(mockCompanyName)).toBeInTheDocument()
    expect(getByText(`${mockCardState} - ${mockReasonCode}`)).toBeInTheDocument()
    expect(getByText(`${mockVoucherPrefix}${mockVoucherValue}/${mockVoucherPrefix}${mockVoucherTargetValue} ${mockVoucherSuffix}`)).toBeInTheDocument()
  })
})
