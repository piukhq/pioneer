import React from 'react'
import * as reactRedux from 'react-redux'
import { render } from '@testing-library/react'
import { useMembershipCardsState } from 'hooks/membershipCards'
import { MemoryRouter } from 'react-router-dom'

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

const multiChannelMembershipCardsComponent = (
  <MemoryRouter>
    <MultichannelMembershipCards />
  </MemoryRouter>
)

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
    useMembershipCardsState.mockImplementation(() => ({
      membershipCards: [{}],
    }))

    const { getByText, queryByTestId } = render(multiChannelMembershipCardsComponent)
    expect(queryByTestId('root-container')).toBeInTheDocument()
    expect(queryByTestId('account-menu-container')).toBeInTheDocument()
    expect(getByText('Wallet')).toBeInTheDocument()
    expect(queryByTestId('cards-container')).toBeInTheDocument()
  })

  it('should render empty state container', () => {
    useMembershipCardsState.mockImplementation(() => ({
      membershipCards: [],
    }))

    const { getByText, queryByTestId } = render(multiChannelMembershipCardsComponent)
    expect(queryByTestId('empty-state-container')).toBeInTheDocument()
    expect(queryByTestId('empty-state-icon')).toBeInTheDocument()
    expect(getByText('Your wallet is empty')).toBeInTheDocument()
    expect(getByText('Download the Bink mobile app to get access to even more rewards')).toBeInTheDocument()
  })

  it('should render empty state add loyalty card button', () => {
    useMembershipCardsState.mockImplementation(() => ({
      membershipCards: [],
    }))

    const { getByRole } = render(multiChannelMembershipCardsComponent)
    expect(getByRole('button')).toHaveTextContent('Add an existing loyalty card')
  })
})
