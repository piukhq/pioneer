import React from 'react'
import { render } from '@testing-library/react'
import { usePaymentCardDeleteForm } from './hooks/usePaymentCardDeleteForm'
import PaymentCardDeleteForm from 'components/PaymentCardDeleteForm'

jest.mock('./hooks/usePaymentCardDeleteForm', () => ({
  usePaymentCardDeleteForm: jest.fn(),
}))

const mockPaymentCardId = 'mock_payment_card_id'
const mockMembershipCardId = 'mock_membership_card_id'
const mockOnClose = jest.fn()
const mockMembershipCardCurrency = 'mock_currency'
const mockMembershipPlanName = 'mock_plan'
const mockLast4Digits = 'mock_last_4_digits'

const defaultValues = {
  isCardExpired: false,
  isCardPending: false,
  isLastPaymentCard: false,
  loading: false,
  last4Digits: mockLast4Digits,
  membershipCardCurrency: mockMembershipCardCurrency,
  membershipPlanName: mockMembershipPlanName,
}

const paymentCardDeleteFormComponent = (
  <PaymentCardDeleteForm
    paymentCardId={mockPaymentCardId}
    membershipCardId={mockMembershipCardId}
    onClose={mockOnClose}
  />
)

describe('Test PaymentCardDeleteForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  describe('Test Expired Card Scenario', () => {
    it('should render correct copy for an expired payment card regardless of any other status', () => {
      usePaymentCardDeleteForm.mockImplementation(() => ({
        ...defaultValues,
        isCardExpired: true,
        isCardPending: true,
        isLastPaymentCard: true,
      }))
      const { getByText, queryByTestId } = render(paymentCardDeleteFormComponent)
      expect(getByText('Card Expired')).toBeInTheDocument()
      expect(getByText('This payment card has expired and can no longer be used to auto-collect points and rewards.')).toBeInTheDocument()
      expect(queryByTestId('expired-card-submit-button')).toBeInTheDocument()
    })
    it('should disable the expired card submit button when loading', () => {
      usePaymentCardDeleteForm.mockImplementation(() => ({
        ...defaultValues,
        isCardExpired: true,
        loading: true,
      }))
      const { queryByTestId } = render(paymentCardDeleteFormComponent)
      expect(queryByTestId('expired-card-submit-button')).toHaveAttribute('disabled')
    })
  })

  describe('Test Non-Expired Card Scenarios', () => {
    describe('Test Non-expired card common elements', () => {
      it('should render correct copy for non-expired cards', () => {
        usePaymentCardDeleteForm.mockImplementation(() => ({
          ...defaultValues,
        }))
        const { getByText, queryByTestId } = render(paymentCardDeleteFormComponent)
        expect(getByText('Delete this card')).toBeInTheDocument()
        expect(getByText(`Are you sure you want to delete the card ending in ${mockLast4Digits}? This cannot be undone.`)).toBeInTheDocument()
        expect(getByText('Enter the last four digits of the card to confirm.')).toBeInTheDocument()
        expect(queryByTestId('submit-button')).toBeInTheDocument()
      })
    })
    describe('Test Pending Card', () => {
      it('should render correct copy for an pending payment card even if its the last payment card', () => {
        usePaymentCardDeleteForm.mockImplementation(() => ({
          ...defaultValues,
          isCardPending: true,
          isLastPaymentCard: true,
        }))
        const { getByText, queryByText } = render(paymentCardDeleteFormComponent)
        expect(getByText(`We are currently processing your payment card to automatically collect ${mockMembershipCardCurrency}.`)).toBeInTheDocument()
        expect(queryByText(`Any ${mockMembershipCardCurrency} that have not yet been awarded will be lost. If you have recently transacted, make sure any ${mockMembershipCardCurrency} have been received before deleting this card.`)).not.toBeInTheDocument()
      })
    })
    describe('Test Multiple Active Cards', () => {
      it('should render correct copy for multiple active payment cards', () => {
        usePaymentCardDeleteForm.mockImplementation(() => ({
          ...defaultValues,
          isLastPaymentCard: false,
        }))
        const { getByText, queryByText } = render(paymentCardDeleteFormComponent)
        expect(getByText(`Any ${mockMembershipCardCurrency} that have not yet been awarded will be lost. If you have recently transacted, make sure any ${mockMembershipCardCurrency} have been received before deleting this card.`)).toBeInTheDocument()
        expect(queryByText(`You are about to delete your only active payment card. This will mean you will not collect ${mockMembershipPlanName} ${mockMembershipCardCurrency}.`)).not.toBeInTheDocument()
      })
    })
    describe('Test Last Active Card', () => {
      it('should render correct copy for last active payment card', () => {
        usePaymentCardDeleteForm.mockImplementation(() => ({
          ...defaultValues,
          isLastPaymentCard: true,
        }))
        const { getByText } = render(paymentCardDeleteFormComponent)
        expect(getByText(`You are about to delete your only active payment card. This will mean you will not collect ${mockMembershipPlanName} ${mockMembershipCardCurrency}.`)).toBeInTheDocument()
      })
    })
    describe('Test Submit Button', () => {
      it('should be disabled when loading', () => {
        usePaymentCardDeleteForm.mockImplementation(() => ({
          ...defaultValues,
          loading: true,
        }))
        const { queryByTestId } = render(paymentCardDeleteFormComponent)
        expect(queryByTestId('submit-button')).toHaveAttribute('disabled')
      })
      it('should be disabled when last four digits do not match', () => {
        usePaymentCardDeleteForm.mockImplementation(() => ({
          ...defaultValues,
          userEnteredLast4Digits: '',
        }))
        const { queryByTestId } = render(paymentCardDeleteFormComponent)
        expect(queryByTestId('submit-button')).toHaveAttribute('disabled')
      })
      it('should be enabled when last four digits match', () => {
        usePaymentCardDeleteForm.mockImplementation(() => ({
          ...defaultValues,
          userEnteredLast4Digits: mockLast4Digits,
          loading: false,
        }))
        const { queryByTestId } = render(paymentCardDeleteFormComponent)
        expect(queryByTestId('submit-button')).not.toHaveAttribute('disabled')
      })
    })
  })
})
