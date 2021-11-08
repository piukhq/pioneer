import React from 'react'
import { render } from '@testing-library/react'
import { useMembershipCardStateById } from 'hooks/membershipCards'
import { useMembershipCardDetailsByCardId } from 'hooks/useMembershipCardDetailsByCardId'
import { useModals } from 'hooks/useModals'
import { MEMBERSHIP_CARD_REASON_CODES } from 'utils/enums'
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
jest.mock('hooks/useModals', () => ({
  useModals: jest.fn(),
}))

const useModalsDefaultValues = {
  dispatchModal: jest.fn(),
  modalToRender: 'NO_MODAL',
}

describe('Test RewardsHistory', () => {
  const mockClickHandler = jest.fn()
  const mockBalanceValue = 'mock_balance_value'
  const mockBalanceSuffix = 'mock_balance_suffix'

  const mockPlanName = 'mock_plan_name'

  const mockMembershipCard = {
    id: 'mock_membership_card_id',
    balances: [{ value: mockBalanceValue, suffix: mockBalanceSuffix }],
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
    }))

    useCalculateWindowDimensions.mockImplementation(() => ({
      isDesktopViewportDimensions: true,
    }))
  })

  describe('Test authorised state', () => {
    const authorisedRewardsHistoryComponent = (
      <RewardsHistory membershipCard={mockMembershipCard} state='authorised' addPaymentCardClickHandler={mockClickHandler} />
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
        expect(getByText(mockBalanceValue + ' ' + mockBalanceSuffix)).toBeInTheDocument()
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

      it('should render the no transaction history modal', () => {
        useModals.mockImplementation(() => ({ modalToRender: 'MEMBERSHIP_CARD_NO_TRANSACTIONS' }))
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
        expect(getByText('Reward history')).toBeInTheDocument()
        expect(queryByText('History')).not.toBeInTheDocument()
        expect(getByText('See your past rewards')).toBeInTheDocument()
        expect(queryByText('Past rewards')).not.toBeInTheDocument()
      })

      it('should render mobile text', () => {
        useCalculateWindowDimensions.mockImplementation(() => ({
          isDesktopViewportDimensions: false,
        }))

        const { getByText, queryByText } = render(authorisedRewardsHistoryComponent)

        expect(queryByText('Reward history')).not.toBeInTheDocument()
        expect(getByText('History')).toBeInTheDocument()
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
        expect(getByText('Reward history')).toBeInTheDocument()
        expect(queryByText('History')).not.toBeInTheDocument()
        expect(getByText('No vouchers to show')).toBeInTheDocument()
        expect(queryByText('Not available')).not.toBeInTheDocument()
      })

      it('should render mobile text', () => {
        useCalculateWindowDimensions.mockImplementation(() => ({
          isDesktopViewportDimensions: false,
        }))

        const { getByText, getAllByText, queryByText } = render(authorisedRewardsHistoryComponent)

        expect(queryByText('Reward history')).not.toBeInTheDocument()
        expect(getByText('History')).toBeInTheDocument()
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

      it('should render the no non active vouchers modal', () => {
        useMembershipCardStateById.mockImplementation(() => ({
          transactions: [{}],
          nonActiveVouchers: [],
        }))
        useModals.mockImplementation(() => ({ modalToRender: 'MEMBERSHIP_CARD_NO_REWARDS' }))
        const { queryByTestId } = render(authorisedRewardsHistoryComponent)
        expect(queryByTestId('no-non-active-vouchers-modal')).toBeInTheDocument()
      })
    })
  })

  describe('Test no payment cards state', () => {
    it('should render the no-payment-cards container and relevant text', () => {
      useModals.mockImplementation(() => ({ ...useModalsDefaultValues }))
      const { queryByTestId, getByText } = render(<RewardsHistory membershipCard={mockMembershipCard} state='no-payment-cards' addPaymentCardClickHandler={mockClickHandler}/>)
      expect(queryByTestId('no-payment-cards')).toBeInTheDocument()
      expect(getByText('Add a credit/debit card')).toBeInTheDocument()
      expect(getByText(`To collect rewards you need to add a credit/debit card to ${mockPlanName}.`)).toBeInTheDocument()
      expect(getByText('Click here to get started.')).toBeInTheDocument()
    })
  })

  describe('Test unauthorised state', () => {
    beforeEach(() => {
      jest.clearAllMocks()
      useModals.mockImplementation(() => ({ ...useModalsDefaultValues }))
    })

    it('should render the pending-state container and relevant text', () => {
      const pendingCode = MEMBERSHIP_CARD_REASON_CODES.PENDING_CODES[0]
      const pendingMembershipCard = {
        ...mockMembershipCard,
        status: {
          reason_codes: [pendingCode],
        },
      }
      const { queryByTestId, getByText } = render(<RewardsHistory membershipCard={pendingMembershipCard} state='unauthorised' addPaymentCardClickHandler={mockClickHandler} />)
      expect(queryByTestId('pending-state')).toBeInTheDocument()
      expect(getByText('Pending')).toBeInTheDocument()
      expect(getByText('Please wait')).toBeInTheDocument()
    })

    it('should render generic error message', () => {
      const errorCode = MEMBERSHIP_CARD_REASON_CODES.GENERIC_ERROR_CODES[0]
      const erroredMembershipCard = {
        ...mockMembershipCard,
        status: {
          reason_codes: [errorCode],
        },
      }
      const { queryByTestId, getByText } = render(<RewardsHistory membershipCard={erroredMembershipCard} state='unauthorised' addPaymentCardClickHandler={mockClickHandler} />)
      expect(queryByTestId('failed-state')).toBeInTheDocument()
      expect(getByText('Error')).toBeInTheDocument()
      expect(getByText('Try again later')).toBeInTheDocument()
    })

    it('should render "Account not registered" message', () => {
      const accountNotRegisteredCode = MEMBERSHIP_CARD_REASON_CODES.ACCOUNT_NOT_REGISTERED_CODE
      const erroredMembershipCard = {
        ...mockMembershipCard,
        status: {
          reason_codes: [accountNotRegisteredCode],
        },
      }
      const { queryByTestId, getByText } = render(<RewardsHistory membershipCard={erroredMembershipCard} state='unauthorised' addPaymentCardClickHandler={mockClickHandler} />)
      expect(queryByTestId('failed-state')).toBeInTheDocument()
      expect(getByText('Account not registered')).toBeInTheDocument()
      expect(getByText('Try again later')).toBeInTheDocument()
    })

    it('should render "Enrol rejected" message', () => {
      const enrolRejectedCode = MEMBERSHIP_CARD_REASON_CODES.ENROL_REJECTED_CODE
      const erroredMembershipCard = {
        ...mockMembershipCard,
        status: {
          reason_codes: [enrolRejectedCode],
        },
      }
      const { queryByTestId, getByText } = render(<RewardsHistory membershipCard={erroredMembershipCard} state='unauthorised' addPaymentCardClickHandler={mockClickHandler} />)
      expect(queryByTestId('failed-state')).toBeInTheDocument()
      expect(getByText('Enrol failed')).toBeInTheDocument()
      expect(getByText('Contact support')).toBeInTheDocument()
    })

    it('should render "Account already exists" message', () => {
      const accountAlreadyExistsCode = MEMBERSHIP_CARD_REASON_CODES.ACCOUNT_ALREADY_EXISTS_CODE
      const erroredMembershipCard = {
        ...mockMembershipCard,
        status: {
          reason_codes: [accountAlreadyExistsCode],
        },
      }
      const { queryByTestId, getByText } = render(<RewardsHistory membershipCard={erroredMembershipCard} state='unauthorised' addPaymentCardClickHandler={mockClickHandler} />)
      expect(queryByTestId('failed-state')).toBeInTheDocument()
      expect(getByText('Account already exists')).toBeInTheDocument()
      expect(getByText('Contact support')).toBeInTheDocument()
    })

    it('should render default error message', () => {
      const { queryByTestId, getByText } = render(<RewardsHistory membershipCard={mockMembershipCard} state='unauthorised' addPaymentCardClickHandler={mockClickHandler} />)
      expect(queryByTestId('failed-state')).toBeInTheDocument()
      expect(getByText("Something's not right")).toBeInTheDocument()
      expect(getByText('There was a problem setting up your account.')).toBeInTheDocument()
      expect(getByText('We need some additional information to resolve this.')).toBeInTheDocument()
    })
  })
})
