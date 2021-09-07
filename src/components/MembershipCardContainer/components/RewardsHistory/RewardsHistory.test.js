import React from 'react'
import { render } from '@testing-library/react'
import { useMembershipCardStateById } from 'hooks/membershipCards'
import { useMembershipCardDetailsByCardId } from 'hooks/useMembershipCardDetailsByCardId'
import { useCalculateWindowDimensions } from 'utils/windowDimensions'

import RewardsHistory from './RewardsHistory'

jest.mock('components/Modals/NonActiveVouchersModal', () => () => null)
jest.mock('components/Modals/TransactionsModal', () => () => null)
jest.mock('components/Modals/TransactionsRewardsEmptyStateModal', () => () => null)

jest.mock('hooks/membershipCards', () => ({
  useMembershipCardStateById: jest.fn(),
}))

jest.mock('hooks/useMembershipCardDetailsByCardId', () => ({
  useMembershipCardDetailsByCardId: jest.fn(),
}))

jest.mock('utils/windowDimensions', () => ({
  useCalculateWindowDimensions: jest.fn(),
}))

describe('Test RewardsHistory', () => {
  const mockClickHandler = jest.fn()
  const mockBalanceValue = 'mock_balance_value'
  const mockBalanceSuffix = 'mock_balance_suffix'

  const mockPlanName = 'mock_plan_name'

  const mockMembershipCard = {
    id: 'mock_membership_card_id',
    balances: [{ value: mockBalanceValue, suffix: mockBalanceSuffix }],
  }

  beforeEach(() => {
    jest.clearAllMocks()

    React.useState = jest.fn().mockReturnValue([false, jest.fn()])

    useMembershipCardStateById.mockImplementation(() => ({
      transactions: [],
      nonActiveVouchers: [],
    }))

    useMembershipCardDetailsByCardId.mockImplementation(() => ({
      planName: mockPlanName,
    }))

    useCalculateWindowDimensions.mockImplementation(() => ({
      isDesktopViewportDimensions: true,
    }))
  })

  describe('Test authorised state', () => {
    const authorisedRewardsHistoryComponent = <RewardsHistory membershipCard={mockMembershipCard} state='authorised' addPaymentCardClickHandler={mockClickHandler} />
    describe('Test transactions found', () => {
      beforeEach(() => {
        useMembershipCardStateById.mockImplementation(() => ({
          transactions: [{}],
        }))
      })

      it('should render the transaction-history container and relevant text', () => {
        const { queryByTestId, getByText } = render(authorisedRewardsHistoryComponent)
        expect(queryByTestId('transaction-history')).toBeInTheDocument()
        expect(getByText(mockBalanceValue + ' ' + mockBalanceSuffix)).toBeInTheDocument()
        expect(getByText('View history')).toBeInTheDocument()
      })

      it('should render the transactions modal', () => {
        React.useState = jest.fn()
          // isNoTransactionsModalOpen
          .mockReturnValueOnce([false, jest.fn()])
          // isNoRewardsModalOpen
          .mockReturnValueOnce([false, jest.fn()])
          // isNonActiveVouchersModalOpen
          .mockReturnValueOnce([false, jest.fn()])
          // isTransactionsModalOpen
          .mockReturnValueOnce([true, jest.fn()])

        const { queryByTestId } = render(authorisedRewardsHistoryComponent)
        expect(queryByTestId('transaction-modal')).toBeInTheDocument()
      })
    })

    describe('Test no transactions found', () => {
      it('should render the no-transaction-history container and relevant text', () => {
        const { queryByTestId } = render(authorisedRewardsHistoryComponent)
        expect(queryByTestId('no-transaction-history')).toBeInTheDocument()
      })

      it('should render desktop text', () => {
        useCalculateWindowDimensions.mockImplementation(() => ({
          isDesktopViewportDimensions: true,
        }))

        const { getByText, queryByText } = render(authorisedRewardsHistoryComponent)
        expect(getByText('No transactions to show')).toBeInTheDocument()
        expect(queryByText('Not available')).not.toBeInTheDocument()
      })

      it('should render mobile text', () => {
        useCalculateWindowDimensions.mockImplementation(() => ({
          isDesktopViewportDimensions: false,
        }))

        const { getAllByText, queryByText } = render(authorisedRewardsHistoryComponent)

        expect(queryByText('No transactions to show')).not.toBeInTheDocument()
        const notAvailableTextArray = getAllByText('Not available')
        expect(notAvailableTextArray.length).toBeGreaterThan(0)
      })

      it('should render the no transaction history modal', () => {
        React.useState = jest.fn()
          // isNoTransactionsModalOpen
          .mockReturnValueOnce([true, jest.fn()])
          // isNoRewardsModalOpen
          .mockReturnValueOnce([false, jest.fn()])
          // isNonActiveVouchersModalOpen
          .mockReturnValueOnce([false, jest.fn()])
          // isTransactionsModalOpen
          .mockReturnValueOnce([false, jest.fn()])

        const { queryByTestId } = render(authorisedRewardsHistoryComponent)
        expect(queryByTestId('no-transaction-history-modal')).toBeInTheDocument()
      })
    })

    describe('Test non active vouchers found', () => {
      beforeEach(() => {
        useMembershipCardStateById.mockImplementation(() => ({
          transactions: [{}],
          nonActiveVouchers: [{}],
        }))
      })

      it('should render the non-active-vouchers container and relevant text', () => {
        React.useState = jest.fn().mockReturnValue([false, jest.fn()])

        const { queryByTestId } = render(authorisedRewardsHistoryComponent)
        expect(queryByTestId('non-active-vouchers')).toBeInTheDocument()
      })

      it('should render desktop text', () => {
        useCalculateWindowDimensions.mockImplementation(() => ({
          isDesktopViewportDimensions: true,
        }))

        const { getByText, queryByText } = render(authorisedRewardsHistoryComponent)
        expect(getByText('Rewards history')).toBeInTheDocument()
        expect(queryByText('History')).not.toBeInTheDocument()
        expect(getByText('See your past rewards')).toBeInTheDocument()
        expect(queryByText('Past rewards')).not.toBeInTheDocument()
      })

      it('should render mobile text', () => {
        useCalculateWindowDimensions.mockImplementation(() => ({
          isDesktopViewportDimensions: false,
        }))

        const { getByText, queryByText } = render(authorisedRewardsHistoryComponent)

        expect(queryByText('Rewards history')).not.toBeInTheDocument()
        expect(getByText('History')).toBeInTheDocument()
        expect(queryByText('See your past rewards')).not.toBeInTheDocument()
        expect(getByText('Past rewards')).toBeInTheDocument()
      })

      it('should render non active vouchers modal', () => {
        React.useState = jest.fn().mockReturnValue([true, jest.fn()])

        const { queryByTestId } = render(authorisedRewardsHistoryComponent)
        expect(queryByTestId('non-active-vouchers-modal')).toBeInTheDocument()
      })
    })

    describe('Test no non active vouchers found', () => {
      it('should render the no-non-active-vouchers container', () => {
        React.useState = jest.fn().mockReturnValue([false, jest.fn()])

        useMembershipCardStateById.mockImplementation(() => ({
          transactions: [{}],
          nonActiveVouchers: [],
        }))

        const { queryByTestId } = render(authorisedRewardsHistoryComponent)
        expect(queryByTestId('no-non-active-vouchers')).toBeInTheDocument()
      })

      it('should render desktop text', () => {
        useCalculateWindowDimensions.mockImplementation(() => ({
          isDesktopViewportDimensions: true,
        }))

        const { getByText, queryByText } = render(authorisedRewardsHistoryComponent)
        expect(getByText('Rewards history')).toBeInTheDocument()
        expect(queryByText('History')).not.toBeInTheDocument()
        expect(getByText('No vouchers to show')).toBeInTheDocument()
        expect(queryByText('Not available')).not.toBeInTheDocument()
      })

      it('should render mobile text', () => {
        useCalculateWindowDimensions.mockImplementation(() => ({
          isDesktopViewportDimensions: false,
        }))

        const { getByText, getAllByText, queryByText } = render(authorisedRewardsHistoryComponent)

        expect(queryByText('Rewards history')).not.toBeInTheDocument()
        expect(getByText('History')).toBeInTheDocument()
        expect(queryByText('No vouchers to show')).not.toBeInTheDocument()
        const notAvailableTextArray = getAllByText('Not available')
        expect(notAvailableTextArray.length).toBeGreaterThan(0)
      })

      it('should render the no non active vouchers modal', () => {
        React.useState = jest.fn()
          // isNoTransactionsModalOpen
          .mockReturnValueOnce([false, jest.fn()])
          // isNoRewardsModalOpen
          .mockReturnValueOnce([true, jest.fn()])
          // isNonActiveVouchersModalOpen
          .mockReturnValueOnce([false, jest.fn()])
          // isTransactionsModalOpen
          .mockReturnValueOnce([false, jest.fn()])

        const { queryByTestId } = render(authorisedRewardsHistoryComponent)
        expect(queryByTestId('no-non-active-vouchers-modal')).toBeInTheDocument()
      })
    })
  })

  describe('Test no payment cards state', () => {
    it('should render the no-payment-cards container and relevant text', () => {
      const { queryByTestId, getByText } = render(<RewardsHistory membershipCard={mockMembershipCard} state='no-payment-cards' addPaymentCardClickHandler={mockClickHandler} />)
      expect(queryByTestId('no-payment-cards')).toBeInTheDocument()
      expect(getByText('Add a credit/debit card')).toBeInTheDocument()
      expect(getByText(`To collect rewards you need to add a credit/debit card to ${mockPlanName}.`)).toBeInTheDocument()
      expect(getByText('Click here to get started.')).toBeInTheDocument()
    })
  })

  describe('Test failed state', () => {
    it('should render the failed-state container and relevant text', () => {
      const { queryByTestId, getByText } = render(<RewardsHistory membershipCard={mockMembershipCard} state='failed' addPaymentCardClickHandler={mockClickHandler} />)
      expect(queryByTestId('failed-state')).toBeInTheDocument()
      expect(getByText("Something's not right")).toBeInTheDocument()
      expect(getByText('There was a problem setting up your account.')).toBeInTheDocument()
      expect(getByText('We need some additional information to resolve this.')).toBeInTheDocument()
      expect(getByText('Click here to resolve.')).toBeInTheDocument()
    })
  })

  describe('Test pending state', () => {
    it('should render the pending-state container and relevant text', () => {
      const { queryByTestId, getByText } = render(<RewardsHistory membershipCard={mockMembershipCard} state='pending' addPaymentCardClickHandler={mockClickHandler} />)
      expect(queryByTestId('pending-state')).toBeInTheDocument()
      expect(getByText('Pending')).toBeInTheDocument()
      expect(getByText('We are getting everything ready for you.')).toBeInTheDocument()
      expect(getByText('You will need a credit/debit card to start collecting rewards. This can be done alongside this process.')).toBeInTheDocument()
    })
  })
})
