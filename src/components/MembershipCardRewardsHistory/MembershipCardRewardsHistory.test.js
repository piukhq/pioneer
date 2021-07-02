import React from 'react'
import { render } from '@testing-library/react'

import MembershipCardRewardsHistory from './MembershipCardRewardsHistory'

jest.mock('./components/MembershipCardHeroImage', () => () => null)
jest.mock('./components/RewardsHistory', () => () => null)

describe('Test MembershipCardRewardsHistory', () => {
  const mockMembershipCard = {
    payment_cards: [],
    status: { state: 'mock_state' },
  }

  it('should render the membership card rewards history section', () => {
    const { queryByTestId } = render(<MembershipCardRewardsHistory membershipCard={mockMembershipCard} />)
    expect(queryByTestId('membership-card-rewards-history-section')).toBeInTheDocument()
  })
})
