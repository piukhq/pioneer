import React from 'react'
import { render } from '@testing-library/react'
import { useMembershipCardStateById } from 'hooks/membershipCards'
import { useMembershipCardDetailsByCardId } from 'hooks/useMembershipCardDetailsByCardId'
import { useModals } from 'hooks/useModals'
import { useCalculateWindowDimensions } from 'utils/windowDimensions'

import AuthorisedState from './AuthorisedState'

jest.mock('components/Modals/NonActiveVouchersModal', () => () => <div data-testid='non-active-vouchers-modal' />)
jest.mock('components/Modals/TransactionsModal', () => () => <div data-testid='transaction-modal' />)
jest.mock('components/Modals/TransactionsRewardsEmptyStateModal', () => () => <div data-testid='transaction-rewards-empty-state' />)

jest.mock('hooks/membershipCards', () => ({
  useMembershipCardStateById: jest.fn(),
}))

jest.mock('hooks/useMembershipCardDetailsByCardId', () => ({
  useMembershipCardDetailsByCardId: jest.fn(),
}))

jest.mock('utils/windowDimensions', () => ({
  useCalculateWindowDimensions: jest.fn(),
}))
jest.mock('hooks/useModals', () => ({
  useModals: jest.fn(),
}))

const useModalsDefaultValues = {
  dispatchModal: jest.fn(),
  modalToRender: 'NO_MODAL',
}

describe('Test AuthorisedState', () => {
  const mockClickHandler = jest.fn()
  const mockBalanceValue = 'mock_balance_value'
  const mockBalanceSuffix = 'mock_balance_suffix'
  const mockBalancePrefix = 'mock_balance_prefix'

  const mockPlanName = 'mock_plan_name'

  const mockMembershipCard = {
    id: 'mock_membership_card_id',
    balances: [{ value: mockBalanceValue, suffix: mockBalanceSuffix, prefix: mockBalancePrefix }],
    status: { reason_codes: [] },
  }
  const mockZeroBalanceMembershipCard = {
    id: 'mock_membership_card_id',
    balances: [{ value: 0 }],
    status: { reason_codes: [] },
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
      planHasVouchers: true,
      planTransactionsAvailable: true,
    }))

    useCalculateWindowDimensions.mockImplementation(() => ({
      isDesktopViewportDimensions: true,
    }))
  })
  const authorisedRewardsHistoryComponent = (
    <AuthorisedState membershipCard={mockMembershipCard} state='authorised' addPaymentCardClickHandler={mockClickHandler} />
  )
  describe('Test transactions found', () => {
    beforeEach(() => {
      useMembershipCardStateById.mockImplementation(() => ({
        transactions: [{}],
      }))
    })

    it('should render the transaction-history container and relevant text', () => {
      useModals.mockImplementation(() => ({ ...useModalsDefaultValues }))
      const { queryByTestId, getByText } = render(authorisedRewardsHistoryComponent)
      expect(queryByTestId('transaction-history')).toBeInTheDocument()
      expect(getByText(mockBalancePrefix + mockBalanceValue + ' ' + mockBalanceSuffix)).toBeInTheDocument()
      expect(getByText('View history')).toBeInTheDocument()
    })

    it('should render the transactions modal', () => {
      useModals.mockImplementation(() => ({ modalToRender: 'MEMBERSHIP_CARD_TRANSACTIONS' }))
      const { queryByTestId } = render(authorisedRewardsHistoryComponent)
      expect(queryByTestId('transaction-modal')).toBeInTheDocument()
    })
  })

  describe('Test no transactions found', () => {
    it('should render the no-transaction-history container and relevant text', () => {
      useModals.mockImplementation(() => ({ ...useModalsDefaultValues }))
      const { queryByTestId } = render(authorisedRewardsHistoryComponent)
      expect(queryByTestId('no-transaction-history')).toBeInTheDocument()
    })

    it('should render desktop text', () => {
      useModals.mockImplementation(() => ({ ...useModalsDefaultValues }))
      useCalculateWindowDimensions.mockImplementation(() => ({
        isDesktopViewportDimensions: true,
      }))

      const { getByText, queryByText } = render(authorisedRewardsHistoryComponent)
      expect(getByText('No transactions to show')).toBeInTheDocument()
      expect(queryByText('Not available')).not.toBeInTheDocument()
    })

    it('should render mobile text', () => {
      useModals.mockImplementation(() => ({ ...useModalsDefaultValues }))
      useCalculateWindowDimensions.mockImplementation(() => ({
        isDesktopViewportDimensions: false,
      }))

      const { getAllByText, queryByText } = render(authorisedRewardsHistoryComponent)

      expect(queryByText('No transactions to show')).not.toBeInTheDocument()
      const notAvailableTextArray = getAllByText('Not available')
      expect(notAvailableTextArray.length).toBeGreaterThan(0)
    })

    it('should render the no transaction history (transaction rewards empty state) modal', () => {
      useModals.mockImplementation(() => ({ modalToRender: 'MEMBERSHIP_CARD_NO_TRANSACTIONS' }))
      const { queryByTestId } = render(authorisedRewardsHistoryComponent)
      expect(queryByTestId('transaction-rewards-empty-state')).toBeInTheDocument()
    })

    it('should not render Transaction history when no transactions available and zero balance', () => {
      useModals.mockImplementation(() => ({ ...useModalsDefaultValues }))
      useMembershipCardDetailsByCardId.mockImplementation(() => ({
        planTransactionsAvailable: false,
      }))
      const { queryByTestId } = render(<AuthorisedState membershipCard={mockZeroBalanceMembershipCard} state='authorised' />)
      expect(queryByTestId('no-transaction-history')).not.toBeInTheDocument()
    })
  })

  describe('Test non active vouchers found', () => {
    beforeEach(() => {
      useMembershipCardStateById.mockImplementation(() => ({
        transactions: [{}],
        nonActiveVouchers: [{}],
      }))
      useModals.mockImplementation(() => ({ ...useModalsDefaultValues }))
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
      expect(getByText('Reward History')).toBeInTheDocument()
      expect(queryByText('Rewards')).not.toBeInTheDocument()
      expect(getByText('See your past rewards')).toBeInTheDocument()
      expect(queryByText('Past rewards')).not.toBeInTheDocument()
    })

    it('should render mobile text', () => {
      useCalculateWindowDimensions.mockImplementation(() => ({
        isDesktopViewportDimensions: false,
      }))

      const { getByText, queryByText } = render(authorisedRewardsHistoryComponent)

      expect(queryByText('Reward history')).not.toBeInTheDocument()
      expect(getByText('Rewards')).toBeInTheDocument()
      expect(queryByText('See your past rewards')).not.toBeInTheDocument()
      expect(getByText('Past rewards')).toBeInTheDocument()
    })

    it('should render non active vouchers modal', () => {
      useModals.mockImplementation(() => ({ modalToRender: 'MEMBERSHIP_CARD_NON_ACTIVE_VOUCHERS' }))

      const { queryByTestId } = render(authorisedRewardsHistoryComponent)
      expect(queryByTestId('non-active-vouchers-modal')).toBeInTheDocument()
    })
  })

  describe('Test no non active vouchers found', () => {
    beforeEach(() => {
      useModals.mockImplementation(() => ({ ...useModalsDefaultValues }))
    })
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
      expect(getByText('Reward History')).toBeInTheDocument()
      expect(queryByText('History')).not.toBeInTheDocument()
      expect(getByText('No vouchers to show')).toBeInTheDocument()
      expect(queryByText('Not available')).not.toBeInTheDocument()
    })

    it('should render mobile text', () => {
      useCalculateWindowDimensions.mockImplementation(() => ({
        isDesktopViewportDimensions: false,
      }))

      const { getByText, getAllByText, queryByText } = render(authorisedRewardsHistoryComponent)

      expect(queryByText('Reward History')).not.toBeInTheDocument()
      expect(getByText('Rewards')).toBeInTheDocument()
      expect(queryByText('No vouchers to show')).not.toBeInTheDocument()
      const notAvailableTextArray = getAllByText('Not available')
      expect(notAvailableTextArray.length).toBeGreaterThan(0)
    })

    it('should not render reward history tile for non-voucher plans', () => {
      useMembershipCardDetailsByCardId.mockImplementation(() => ({
        planName: mockPlanName,
        planHasVouchers: false,
      }))
      const { queryByTestId } = render(authorisedRewardsHistoryComponent)
      expect(queryByTestId('no-non-active-vouchers')).not.toBeInTheDocument()
      expect(queryByTestId('non-active-vouchers')).not.toBeInTheDocument()
    })

    it('should render the no non active vouchers (transaction rewards empty state) modal', () => {
      useMembershipCardStateById.mockImplementation(() => ({
        transactions: [{}],
        nonActiveVouchers: [],
      }))
      useModals.mockImplementation(() => ({ modalToRender: 'MEMBERSHIP_CARD_NO_REWARDS' }))
      const { queryByTestId } = render(authorisedRewardsHistoryComponent)
      expect(queryByTestId('transaction-rewards-empty-state')).toBeInTheDocument()
    })
  })
})
