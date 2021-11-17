import React from 'react'
import { render } from '@testing-library/react'
import { useMembershipCardDetailsByCardId } from 'hooks/useMembershipCardDetailsByCardId'
import { useModals } from 'hooks/useModals'

import NoPaymentCardsState from './NoPaymentCardsState'

jest.mock('hooks/useMembershipCardDetailsByCardId', () => ({
  useMembershipCardDetailsByCardId: jest.fn(),
}))

jest.mock('hooks/useModals', () => ({
  useModals: jest.fn(),
}))

const useModalsDefaultValues = {
  dispatchModal: jest.fn(),
  modalToRender: 'NO_MODAL',
}

describe('Test no payment cards state', () => {
  const mockPlanName = 'mock_plan_name'

  const mockMembershipCard = {
    id: 'mock_membership_card_id',
    status: { reason_codes: [] },
  }

  React.useState = jest.fn().mockReturnValue([false, jest.fn()])

  it('should render the no-payment-cards container and relevant text', () => {
    useModals.mockImplementation(() => ({ ...useModalsDefaultValues }))
    useMembershipCardDetailsByCardId.mockImplementation(() => ({
      planName: mockPlanName,
    }))
    const { queryByTestId, getByText } = render(<NoPaymentCardsState membershipCard={mockMembershipCard} state='no-payment-cards' />)
    expect(queryByTestId('no-payment-cards')).toBeInTheDocument()
    expect(getByText('Add a credit/debit card')).toBeInTheDocument()
    expect(getByText(`To collect rewards you need to add a credit/debit card to ${mockPlanName}.`)).toBeInTheDocument()
    expect(getByText('Click here to get started.')).toBeInTheDocument()
  })
})
