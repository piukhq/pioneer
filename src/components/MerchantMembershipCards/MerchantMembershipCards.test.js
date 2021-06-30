import React from 'react'
import { render } from '@testing-library/react'
import { useMerchantMembershipCardsLogic } from './hooks/useMerchantMembershipCardsLogic'
import MerchantMembershipCards from './MerchantMembershipCards'

jest.mock('hooks/useLogout', () => ({
  __esModule: true,
  default: () => jest.fn(),
}))
jest.mock('hooks/useContactSupport', () => ({
  __esModule: true,
  default: () => jest.fn(),
}))
jest.mock('./hooks/useMerchantMembershipCardsLogic', () => ({
  useMerchantMembershipCardsLogic: jest.fn(),
}))

jest.mock('components/Loading2', () => () => null)
jest.mock('components/WeFoundYou', () => () => null)
jest.mock('components/MembershipCardRefresher', () => () => null)
jest.mock('components/PreparingYourCard', () => () => null)
jest.mock('components/MultichannelMembershipCards', () => () => null)

describe('Test MerchantMembershipCards', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Test too many cards error scenario', () => {
    it('should render too many cards error', () => {
      useMerchantMembershipCardsLogic.mockImplementation(() => ({
        tooManyCardsError: true,
      }))

      const { queryByTestId, getByText } = render(<MerchantMembershipCards />)

      expect(queryByTestId('too-many-cards-error')).toBeInTheDocument()
      expect(getByText('There is a problem')).toBeInTheDocument()
      expect(getByText('It looks like there is a problem with your account.')).toBeInTheDocument()
      expect(getByText('Please contact us so we can help resolve this as quickly as possible.')).toBeInTheDocument()
      expect(getByText('Get in Touch')).toBeInTheDocument()
      expect(getByText('Logout')).toBeInTheDocument()
    })

    it('should not render too many cards error', () => {
      useMerchantMembershipCardsLogic.mockImplementation(() => ({
        tooManyCardsError: false,
      }))

      const { queryByTestId } = render(<MerchantMembershipCards />)

      expect(queryByTestId('too-many-cards-error')).not.toBeInTheDocument()
    })
  })

  describe('Test We Found You scenario', () => {
    it('should render We Found You', () => {
      useMerchantMembershipCardsLogic.mockImplementation(() => ({
        shouldDisplayWeFoundYou: true,
      }))

      const { queryByTestId } = render(<MerchantMembershipCards />)
      expect(queryByTestId('we-found-you')).toBeInTheDocument()
    })

    it('should not render We Found You', () => {
      useMerchantMembershipCardsLogic.mockImplementation(() => ({
        shouldDisplayWeFoundYou: false,
      }))

      const { queryByTestId } = render(<MerchantMembershipCards />)
      expect(queryByTestId('we-found-you')).not.toBeInTheDocument()
    })
  })

  describe('Test Preparing Your Card scenario', () => {
    it('should render Preparing Your Card', () => {
      useMerchantMembershipCardsLogic.mockImplementation(() => ({
        isMembershipCardPending: true,
        membershipCard: {
          id: 'mock-id',
        },
      }))

      const { queryByTestId } = render(<MerchantMembershipCards />)
      expect(queryByTestId('preparing-your-card')).toBeInTheDocument()
    })

    it('should not render Preparing Your Card', () => {
      useMerchantMembershipCardsLogic.mockImplementation(() => ({
        isMembershipCardPending: false,
      }))

      const { queryByTestId } = render(<MerchantMembershipCards />)
      expect(queryByTestId('preparing-your-card')).not.toBeInTheDocument()
    })
  })

  describe('Test Hang Tight scenario', () => {
    it('should render Hang Tight', () => {
      useMerchantMembershipCardsLogic.mockImplementation(() => ({
        tooManyCardsError: false,
        shouldDisplayWeFoundYou: false,
        isMembershipCardPending: false,
      }))

      const { queryByTestId } = render(<MerchantMembershipCards />)
      expect(queryByTestId('hang-tight')).toBeInTheDocument()
    })

    it('should not render Hang Tight', () => {
      useMerchantMembershipCardsLogic.mockImplementation(() => ({
        tooManyCardsError: true,
        shouldDisplayWeFoundYou: true,
        isMembershipCardPending: true,
      }))

      const { queryByTestId } = render(<MerchantMembershipCards />)
      expect(queryByTestId('hang-tight')).not.toBeInTheDocument()
    })
  })
})
