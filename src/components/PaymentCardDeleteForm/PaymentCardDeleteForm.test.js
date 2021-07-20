import React from 'react'
import { render } from '@testing-library/react'
// import Modal from 'components/Modal'
// import Button from 'components/Button'
// import TextInputGroup from 'components/Form/TextInputGroup'
import { usePaymentCardDeleteForm } from './hooks/usePaymentCardDeleteForm'
import PaymentCardDeleteForm from 'components/PaymentCardDeleteForm'

// mock hooks

jest.mock('./hooks/usePaymentCardDeleteForm', () => ({
  usePaymentCardDeleteForm: jest.fn(),
}))

// mock components
// jest.mock('components/Button', () => () => null)
// jest.mock('components/Form/TextInputGroup', () => () => null)

describe('Test PaymentCardDeleteForm', () => {
  const mockPaymentCardId = 'mock_payment_card_id'
  const mockMembershipCardId = 'mock_membership_card_id'
  const mockOnClose = jest.fn()
  jest.mock('components/Modal', () => (mockOnClose) => null)

  const mockMembershipCardCurrency = 'mock_currency'
  const mockMembershipPlanName = 'mock_plan'

  const paymentCardDeleteFormComponent = (
    <PaymentCardDeleteForm
      paymentCardId={mockPaymentCardId}
      membershipCardId={mockMembershipCardId}
      onClose={mockOnClose}
    />
  )

  beforeEach(() => {
    jest.clearAllMocks()
    usePaymentCardDeleteForm.mockImplementation(() => ({
      membershipCardCurrency: mockMembershipCardCurrency,
      membershipPlanName: mockMembershipPlanName,
    }))
  })

  describe('Test Card Expired Scenario', () => {
    it('should render correct copy for an expired payment card regardless of any other status', () => {
      usePaymentCardDeleteForm.mockImplementation(() => ({
        isCardExpired: true,
        isCardPending: true,
        isLastPaymentCard: true,
      }))
      const { getByText } = render(paymentCardDeleteFormComponent)
      expect(getByText('Card Expired')).toBeInTheDocument()
      expect(getByText('This payment card has expired and can no longer be used to auto-collect points and rewards.')).toBeInTheDocument()
    })
  })
  describe('Test Card Pending Scenario', () => {
    it('should render correct copy for an pending payment card even if its the last payment card', () => {
      usePaymentCardDeleteForm.mockImplementation(() => ({
        membershipCardCurrency: mockMembershipCardCurrency,
        isCardPending: true,
        isLastPaymentCard: true,
      }))
      const { getByText, queryByText } = render(paymentCardDeleteFormComponent)
      expect(getByText('Delete this card')).toBeInTheDocument()
      expect(getByText(`We are currently processing your payment card to automatically collect ${mockMembershipCardCurrency}.`)).toBeInTheDocument()
      expect(queryByText(`Any ${mockMembershipCardCurrency} that have not yet been awarded will be lost. If you have recently transacted, make sure any ${mockMembershipCardCurrency} have been received before deleting this card.`)).not.toBeInTheDocument()
    })
  })
  describe('Test Multiple Active Cards Scenario', () => {
    it('should render correct copy for multiple active payment cards', () => {
      usePaymentCardDeleteForm.mockImplementation(() => ({
        membershipCardCurrency: mockMembershipCardCurrency,
        membershipPlanName: mockMembershipPlanName,
        isLastPaymentCard: false,
      }))
      const { getByText, queryByText } = render(paymentCardDeleteFormComponent)
      expect(getByText('Delete this card')).toBeInTheDocument()
      expect(getByText(`Any ${mockMembershipCardCurrency} that have not yet been awarded will be lost. If you have recently transacted, make sure any ${mockMembershipCardCurrency} have been received before deleting this card.`)).toBeInTheDocument()
      expect(queryByText(`You are about to delete your only active payment card. This will mean you will not collect ${mockMembershipPlanName} ${mockMembershipCardCurrency}.`)).not.toBeInTheDocument()
    })
  })
  describe('Test Last Active Card Scenario', () => {
    it('should render correct copy for last active payment card', () => {
      usePaymentCardDeleteForm.mockImplementation(() => ({
        membershipCardCurrency: mockMembershipCardCurrency,
        membershipPlanName: mockMembershipPlanName,
        isLastPaymentCard: true,
      }))
      const { getByText } = render(paymentCardDeleteFormComponent)
      expect(getByText('Delete this card')).toBeInTheDocument()
      expect(getByText(`You are about to delete your only active payment card. This will mean you will not collect ${mockMembershipPlanName} ${mockMembershipCardCurrency}.`)).toBeInTheDocument()
    })
  })
})
