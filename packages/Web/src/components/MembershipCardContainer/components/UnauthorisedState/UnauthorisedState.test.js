import React from 'react'
import { render } from '@testing-library/react'
import { useModals } from 'hooks/useModals'
import { MEMBERSHIP_CARD_REASON_CODES } from 'utils/enums'

import UnauthorisedState from './UnauthorisedState'

jest.mock('components/Modals/NonActiveVouchersModal', () => () => null)
jest.mock('components/Modals/TransactionsModal', () => () => null)
jest.mock('components/Modals/TransactionsRewardsEmptyStateModal', () => () => null)

jest.mock('hooks/useModals', () => ({
  useModals: jest.fn(),
}))

const useModalsDefaultValues = {
  dispatchModal: jest.fn(),
  modalToRender: 'NO_MODAL',
}

describe('Test UnauthorisedState', () => {
  const mockClickHandler = jest.fn()
  const mockBalanceValue = 'mock_balance_value'
  const mockBalanceSuffix = 'mock_balance_suffix'

  const mockMembershipCard = {
    id: 'mock_membership_card_id',
    balances: [{ value: mockBalanceValue, suffix: mockBalanceSuffix }],
    status: { reason_codes: [] },
  }

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

    const { queryByTestId, getByText } = render(<UnauthorisedState membershipCard={pendingMembershipCard} />)
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
    const { queryByTestId, getByText } = render(<UnauthorisedState membershipCard={erroredMembershipCard} state='unauthorised' addPaymentCardClickHandler={mockClickHandler} />)
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
    const { queryByTestId, getByText } = render(<UnauthorisedState membershipCard={erroredMembershipCard} state='unauthorised' addPaymentCardClickHandler={mockClickHandler} />)
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
    const { queryByTestId, getByText } = render(<UnauthorisedState membershipCard={erroredMembershipCard} state='unauthorised' addPaymentCardClickHandler={mockClickHandler} />)
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
    const { queryByTestId, getByText } = render(<UnauthorisedState membershipCard={erroredMembershipCard} state='unauthorised' addPaymentCardClickHandler={mockClickHandler} />)
    expect(queryByTestId('failed-state')).toBeInTheDocument()
    expect(getByText('Account already exists')).toBeInTheDocument()
    expect(getByText('Contact support')).toBeInTheDocument()
  })

  it('should render default error message', () => {
    const { queryByTestId, getByText } = render(<UnauthorisedState membershipCard={mockMembershipCard} state='unauthorised' addPaymentCardClickHandler={mockClickHandler} />)
    expect(queryByTestId('failed-state')).toBeInTheDocument()
    expect(getByText("Something's not right")).toBeInTheDocument()
    expect(getByText('There was a problem setting up your account.')).toBeInTheDocument()
    expect(getByText('We need some additional information to resolve this.')).toBeInTheDocument()
  })
})
