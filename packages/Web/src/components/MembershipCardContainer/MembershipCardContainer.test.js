import React from 'react'
import { render } from '@testing-library/react'

import MembershipCardContainer from './MembershipCardContainer'

jest.mock('./components/MembershipCardHeroImage', () => () => null)

describe('Test MembershipCardContainer', () => {
  const mockMembershipCard = {
    payment_cards: [],
    status: { reason_codes: ['mock_status_code'] },
  }

  it('should render the membership card rewards history section', () => {
    const { queryByTestId } = render(<MembershipCardContainer membershipCard={mockMembershipCard} />)
    expect(queryByTestId('membership-card-rewards-history-section')).toBeInTheDocument()
  })
})
