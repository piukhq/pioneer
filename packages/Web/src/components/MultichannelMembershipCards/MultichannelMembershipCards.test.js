import React from 'react'
import * as reactRedux from 'react-redux'
import { render } from '@testing-library/react'
import { useMembershipCardsState } from 'hooks/membershipCards'

import MultichannelMembershipCards from './MultichannelMembershipCards'

jest.mock('components/Modals/MembershipCardDeleteModal', () => () => null)
jest.mock('components/TermsAndConditionsCheck', () => () => null)
jest.mock('components/AccountMenu', () => () => null)
jest.mock('components/AppLinks', () => () => null)
jest.mock('./components/MembershipCard', () => () => null)

jest.mock('hooks/membershipCards', () => ({
  useMembershipCardsState: jest.fn(),
}))

jest.mock('hooks/useModals', () => ({
  useModals: jest.fn(),
}))

describe('Test MultichannelMembershipCards', () => {
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')

  const mockMembershipPlans = [{
    id: 'mock_plan_id',
  }]

  beforeEach(() => {
    useSelectorMock.mockClear()
    jest.clearAllMocks()

    useSelectorMock.mockReturnValue(mockMembershipPlans)
  })

  it('should render the relevant containers and title text', () => {
    global.Config = {
      displayAddDeleteMembershipCardFeatures: true,
    }

    useMembershipCardsState.mockImplementation(() => ({
      membershipCards: [{}],
    }))

    const { getByText, queryByTestId } = render(<MultichannelMembershipCards />)
    expect(queryByTestId('root-container')).toBeInTheDocument()
    expect(queryByTestId('account-menu-container')).toBeInTheDocument()
    expect(getByText('Wallet')).toBeInTheDocument()
    expect(queryByTestId('cards-container')).toBeInTheDocument()
    expect(queryByTestId('additional-membership-add')).toBeInTheDocument()
  })

  it('should not render the add membership card button', () => {
    global.Config = {
      displayAddDeleteMembershipCardFeatures: false,
    }

    useMembershipCardsState.mockImplementation(() => ({
      membershipCards: [{}],
    }))

    const { queryByTestId } = render(<MultichannelMembershipCards />)
    expect(queryByTestId('additional-membership-add')).not.toBeInTheDocument()
  })

  it('should render empty state container', () => {
    useMembershipCardsState.mockImplementation(() => ({
      membershipCards: [],
    }))

    const { getByText, queryByTestId } = render(<MultichannelMembershipCards />)
    expect(queryByTestId('empty-state-container')).toBeInTheDocument()
    expect(queryByTestId('empty-state-icon')).toBeInTheDocument()
    expect(getByText('Your wallet is empty')).toBeInTheDocument()
    expect(getByText('Download the Bink mobile app to get access to even more rewards')).toBeInTheDocument()
  })

  it('should render empty state add loyalty card button', () => {
    global.Config = {
      displayAddDeleteMembershipCardFeatures: true,
    }

    useMembershipCardsState.mockImplementation(() => ({
      membershipCards: [],
    }))

    const { getByRole } = render(<MultichannelMembershipCards />)
    expect(getByRole('button')).toHaveTextContent('Add an existing loyalty card')
  })

  it('should not render empty state add loyalty card button', () => {
    global.Config = {
      displayAddDeleteMembershipCardFeatures: false,
    }

    useMembershipCardsState.mockImplementation(() => ({
      membershipCards: [],
    }))

    const { queryByText } = render(<MultichannelMembershipCards />)
    expect(queryByText('Add an existing loyalty card')).not.toBeInTheDocument()
  })
})
