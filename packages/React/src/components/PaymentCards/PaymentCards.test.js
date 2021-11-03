import React from 'react'
import * as reactRedux from 'react-redux'
import { render } from '@testing-library/react'
import { useMembershipCardDetailsByCardId } from 'hooks/useMembershipCardDetailsByCardId'
import { useLinkPaymentCard } from './hooks/useLinkPaymentCard'
import { useModals } from 'hooks/useModals'

import PaymentCards from './PaymentCards'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: 'mock_membershipcard-id',
  }),
}))

jest.mock('hooks/useMembershipCardDetailsByCardId', () => ({
  useMembershipCardDetailsByCardId: jest.fn(),
}))
jest.mock('./hooks/useLinkPaymentCard', () => ({
  useLinkPaymentCard: jest.fn(),
}))

jest.mock('components/PaymentCardRefresher', () => () => null)
jest.mock('components/PaymentCard', () => () => null)

jest.mock('hooks/useModals', () => ({
  useModals: jest.fn(),
}))
const useModalsDefaultValues = {
  dispatchModal: jest.fn(),
}

describe('Test PaymentCards', () => {
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')
  const mockSetState = jest.fn()

  const mockHandleLinkingSuccess = jest.fn()
  const mockHandleLinkingError = jest.fn()
  const mockSetPaymentCardLimitModalVisible = jest.fn()
  const mockHandleAddPaymentCard = jest.fn()
  const mockHandleDeletePaymentCard = jest.fn()

  const paymentCardsComponent = (
      <PaymentCards
        handleLinkingSuccess={mockHandleLinkingSuccess}
        handleLinkingError={mockHandleLinkingError}
        setPaymentCardLimitModalVisible={mockSetPaymentCardLimitModalVisible}
        handleAddPaymentCard={mockHandleAddPaymentCard}
        handleDeletePaymentCard={mockHandleDeletePaymentCard}
      />
  )

  const mockMembershipCard = {}
  const mockMembershipCardCurrency = 'mock_currency'
  const mockPlanName = 'mock_plan_name'
  const mockPlanNameSuffix = 'mock_plan_name_suffix'

  const mockPaymentCards = [
    {
      id: 'mock_id_1',
    },
    {
      id: 'mock_id_2',
    },
  ]

  const mockPendingPaymentCardId = 'mock_pending_payment_card_id'
  const mockPendingPaymentCard = { id: mockPendingPaymentCardId }

  beforeEach(() => {
    jest.clearAllMocks()

    useLinkPaymentCard.mockImplementation(() => ({
      linkCard: jest.fn(),
    }))
    useModals.mockImplementation(() => ({ useModalsDefaultValues }))

    useMembershipCardDetailsByCardId.mockImplementation(() => ({
      planName: mockPlanName,
      planNameSuffix: mockPlanNameSuffix,
    }))

    React.useState = jest.fn().mockReturnValue([false, mockSetState])
  })

  afterEach(() => {
    useSelectorMock.mockClear()
  })

  describe('Test linked payment cards', () => {
    beforeEach(() => {
      useSelectorMock
        // membershipCard
        .mockReturnValueOnce(mockMembershipCard)
        // linkedPaymentCards
        .mockReturnValueOnce(mockPaymentCards)
        // unlinkedPaymentCards
        .mockReturnValueOnce([])
        // membershipCardCurrency
        .mockReturnValueOnce(mockMembershipCardCurrency)
        // newlyPendingPaymentCard
        .mockReturnValueOnce(undefined)
    })

    it('should render linked payment cards section and relevant text', () => {
      const { queryByTestId, getByText } = render(paymentCardsComponent)

      expect(queryByTestId('linked-payment-cards-section')).toBeInTheDocument()
      expect(getByText('Credit/debit cards')).toBeInTheDocument()
    })

    it('should render relevant text if linked payment cards are available', () => {
      const { getByText } = render(paymentCardsComponent)
      expect(getByText(`The credit/debit cards below are linked to your ${mockPlanName} ${mockPlanNameSuffix}. Simply pay with them to automatically collect ${mockMembershipCardCurrency}.`)).toBeInTheDocument()
    })

    it('should render relevant text if no linked payment cards are available', () => {
      useSelectorMock.mockReset()

      useSelectorMock
        // membershipCard
        .mockReturnValueOnce(mockMembershipCard)
        // linkedPaymentCards
        .mockReturnValueOnce([])
        // unlinkedPaymentCards
        .mockReturnValueOnce([])
        // membershipCardCurrency
        .mockReturnValueOnce(mockMembershipCardCurrency)
        // newlyPendingPaymentCard
        .mockReturnValueOnce(undefined)

      const { getByText } = render(paymentCardsComponent)
      expect(getByText(`You have yet to add any credit/debit cards. By adding a credit/debit card to your account, you will auto-collect ${mockMembershipCardCurrency} when you shop.`)).toBeInTheDocument()
    })

    it('should render correct number of linked payment cards', () => {
      const { getAllByTestId } = render(paymentCardsComponent)
      const linkedPaymentCards = getAllByTestId('linked-payment-card')
      expect(linkedPaymentCards.length).toBe(mockPaymentCards.length)
    })

    it('should render newly pending payment card', () => {
      useSelectorMock.mockReset()

      useSelectorMock
        // membershipCard
        .mockReturnValueOnce(mockMembershipCard)
        // linkedPaymentCards
        .mockReturnValueOnce([])
        // unlinkedPaymentCards
        .mockReturnValueOnce([mockPendingPaymentCard])
        // membershipCardCurrency
        .mockReturnValueOnce(mockMembershipCardCurrency)
        // newlyPendingPaymentCard
        .mockReturnValueOnce(mockPendingPaymentCard)

      const { queryByTestId } = render(paymentCardsComponent)
      expect(queryByTestId(`newly-pending-payment-card-${mockPendingPaymentCardId}`)).toBeInTheDocument()
    })
  })

  describe('Test unlinked payment cards', () => {
    beforeEach(() => {
      useSelectorMock
        // membershipCard
        .mockReturnValueOnce(mockMembershipCard)
        // linkedPaymentCards
        .mockReturnValueOnce([])
        // unlinkedPaymentCards
        .mockReturnValueOnce(mockPaymentCards)
        // membershipCardCurrency
        .mockReturnValueOnce(mockMembershipCardCurrency)
        // newlyPendingPaymentCard
        .mockReturnValueOnce(undefined)
    })

    it('should render unlinked payment cards section', () => {
      const { queryByTestId } = render(paymentCardsComponent)
      expect(queryByTestId('unlinked-payment-cards-section')).toBeInTheDocument()
    })

    it('should render the correct number of unlinked payment cards', () => {
      const { getAllByTestId } = render(paymentCardsComponent)
      const unlinkedPaymentCards = getAllByTestId('unlinked-payment-card')
      expect(unlinkedPaymentCards.length).toBe(mockPaymentCards.length)
    })
  })
})
