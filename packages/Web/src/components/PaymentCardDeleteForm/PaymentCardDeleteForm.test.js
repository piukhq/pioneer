import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { usePaymentCardDeleteForm } from './hooks/usePaymentCardDeleteForm'
import { useMembershipCardDetailsByCardId } from 'hooks/useMembershipCardDetailsByCardId'
import PaymentCardDeleteForm from 'components/PaymentCardDeleteForm'

jest.mock('./hooks/usePaymentCardDeleteForm', () => ({
  usePaymentCardDeleteForm: jest.fn(),
}))
jest.mock('hooks/useMembershipCardDetailsByCardId', () => ({
  useMembershipCardDetailsByCardId: jest.fn(),
}))

const mockPaymentCardId = 'mock_payment_card_id'
const mockMembershipCardId = 'mock_membership_card_id'
const mockOnClose = jest.fn()
const mockCurrency = 'mock_currency'
const mockPlanName = 'mock_plan_name'
const mockPlanNameSuffix = 'mock_plan_name_suffix'
const mockLast4Digits = 'mock_last_4_digits'

const usePaymentCardDeleteFormDefaultValues = {
  isCardExpired: false,
  isCardPending: false,
  isLastPaymentCard: false,
  loading: false,
  last4Digits: mockLast4Digits,
  currency: mockCurrency,
}
const useMembershipCardDetailsByCardIdDefaultValues = {
  planName: mockPlanName,
  planNameSuffix: mockPlanNameSuffix,
}

const mockStore = configureMockStore([])
const store = mockStore()

const paymentCardDeleteFormComponent = (
  <Provider store={store}>
    <PaymentCardDeleteForm
      paymentCardId={mockPaymentCardId}
      membershipCardId={mockMembershipCardId}
      onClose={mockOnClose}
    />
  </Provider>
)

describe('Test PaymentCardDeleteForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  describe('Test Expired Card Scenario', () => {
    it('should render correct copy for an expired payment card regardless of any other status', () => {
      useMembershipCardDetailsByCardId.mockImplementation(() => ({ ...useMembershipCardDetailsByCardIdDefaultValues }))
      usePaymentCardDeleteForm.mockImplementation(() => ({
        ...usePaymentCardDeleteFormDefaultValues,
        isCardExpired: true,
        isCardPending: true,
        isLastPaymentCard: true,
      }))
      const { getByText, queryByTestId } = render(paymentCardDeleteFormComponent)
      expect(getByText('Card Expired')).toBeInTheDocument()
      expect(getByText('This credit/debit card has expired and can no longer be used to auto-collect points and rewards.')).toBeInTheDocument()
      expect(queryByTestId('expired-card-submit-button')).toBeInTheDocument()
    })
    it('should disable the expired card submit button when loading', () => {
      useMembershipCardDetailsByCardId.mockImplementation(() => ({ ...useMembershipCardDetailsByCardIdDefaultValues }))
      usePaymentCardDeleteForm.mockImplementation(() => ({
        ...usePaymentCardDeleteFormDefaultValues,
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
        useMembershipCardDetailsByCardId.mockImplementation(() => ({ ...useMembershipCardDetailsByCardIdDefaultValues }))
        usePaymentCardDeleteForm.mockImplementation(() => ({
          ...usePaymentCardDeleteFormDefaultValues,
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
        useMembershipCardDetailsByCardId.mockImplementation(() => ({ ...useMembershipCardDetailsByCardIdDefaultValues }))
        usePaymentCardDeleteForm.mockImplementation(() => ({
          ...usePaymentCardDeleteFormDefaultValues,
          isCardPending: true,
          isLastPaymentCard: true,
        }))
        const { getByText, queryByText } = render(paymentCardDeleteFormComponent)
        expect(getByText(`We are currently processing your credit/debit card to automatically collect ${mockCurrency}.`)).toBeInTheDocument()
        expect(queryByText(`Any ${mockCurrency} that have not yet been awarded will be lost. If you have recently made a purchase using this card, make sure any ${mockCurrency} have been added to your ${mockPlanName} ${mockPlanNameSuffix} before deleting.`)).not.toBeInTheDocument()
      })
    })
    describe('Test Multiple Active Cards', () => {
      it('should render correct copy for multiple active payment cards', () => {
        useMembershipCardDetailsByCardId.mockImplementation(() => ({ ...useMembershipCardDetailsByCardIdDefaultValues }))
        usePaymentCardDeleteForm.mockImplementation(() => ({
          ...usePaymentCardDeleteFormDefaultValues,
          isLastPaymentCard: false,
        }))
        const { getByText, queryByText } = render(paymentCardDeleteFormComponent)
        expect(getByText(`Any ${mockCurrency} that have not yet been awarded will be lost. If you have recently made a purchase using this card, make sure any ${mockCurrency} have been added to your ${mockPlanName} ${mockPlanNameSuffix} before deleting.`)).toBeInTheDocument()
        expect(queryByText(`You are about to delete your only active credit/debit card. This will mean you will not collect ${mockPlanName} ${mockCurrency}.`)).not.toBeInTheDocument()
      })
    })
    describe('Test Last Active Card', () => {
      it('should render correct copy for last active payment card', () => {
        useMembershipCardDetailsByCardId.mockImplementation(() => ({ ...useMembershipCardDetailsByCardIdDefaultValues }))
        usePaymentCardDeleteForm.mockImplementation(() => ({
          ...usePaymentCardDeleteFormDefaultValues,
          isLastPaymentCard: true,
        }))
        const { getByText } = render(paymentCardDeleteFormComponent)
        expect(getByText(`You are about to delete your only active credit/debit card. This will mean you will not collect ${mockPlanName} ${mockCurrency}.`)).toBeInTheDocument()
      })
    })
    describe('Test Submit Button', () => {
      it('should be disabled when loading', () => {
        useMembershipCardDetailsByCardId.mockImplementation(() => ({ ...useMembershipCardDetailsByCardIdDefaultValues }))
        usePaymentCardDeleteForm.mockImplementation(() => ({
          ...usePaymentCardDeleteFormDefaultValues,
          loading: true,
        }))
        const { queryByTestId } = render(paymentCardDeleteFormComponent)
        expect(queryByTestId('submit-button')).toHaveAttribute('disabled')
      })
      it('should be disabled when last four digits do not match', () => {
        useMembershipCardDetailsByCardId.mockImplementation(() => ({ ...useMembershipCardDetailsByCardIdDefaultValues }))
        usePaymentCardDeleteForm.mockImplementation(() => ({
          ...usePaymentCardDeleteFormDefaultValues,
          userEnteredLast4Digits: '',
        }))
        const { queryByTestId } = render(paymentCardDeleteFormComponent)
        expect(queryByTestId('submit-button')).toHaveAttribute('disabled')
      })
      it('should be enabled when last four digits match', () => {
        useMembershipCardDetailsByCardId.mockImplementation(() => ({ ...useMembershipCardDetailsByCardIdDefaultValues }))
        usePaymentCardDeleteForm.mockImplementation(() => ({
          ...usePaymentCardDeleteFormDefaultValues,
          userEnteredLast4Digits: mockLast4Digits,
          loading: false,
        }))
        const { queryByTestId } = render(paymentCardDeleteFormComponent)
        expect(queryByTestId('submit-button')).not.toHaveAttribute('disabled')
      })
    })
  })
})
