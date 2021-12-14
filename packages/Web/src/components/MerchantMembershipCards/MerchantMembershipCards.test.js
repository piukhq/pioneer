import React from 'react'
import { render } from '@testing-library/react'
import * as reactRedux from 'react-redux'
import { useMembershipCardDetailsByCardId } from 'hooks/useMembershipCardDetailsByCardId'
import { useLogout } from 'hooks/useLogout'
import { useContactSupport } from 'hooks/useContactSupport'
import { useMerchantMembershipCards } from './hooks/useMerchantMembershipCards'
import MerchantMembershipCards from './MerchantMembershipCards'

jest.mock('hooks/useLogout', () => ({
  useLogout: jest.fn(),
}))
jest.mock('hooks/useContactSupport', () => ({
  useContactSupport: jest.fn(),
}))
jest.mock('./hooks/useMerchantMembershipCards', () => ({
  useMerchantMembershipCards: jest.fn(),
}))

jest.mock('components/TermsAndConditionsCheck', () => () => null)
jest.mock('components/PreparingYourCard', () => () => null)
jest.mock('components/MultichannelMembershipCards', () => () => null)
const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')
jest.mock('hooks/useMembershipCardDetailsByCardId', () => ({
  useMembershipCardDetailsByCardId: jest.fn(),
}))

const mockMembershipCards = [{
  id: 'mock_membership_card_id',
}]

describe('Test MerchantMembershipCards', () => {
  beforeEach(() => {
    useSelectorMock.mockClear()
    jest.clearAllMocks()
    useSelectorMock.mockReturnValue(mockMembershipCards)
    useMembershipCardDetailsByCardId.mockImplementation(() => ({
      planName: 'mockPlanName',
      planNameSuffix: 'mockPlanNameSuffix',
    }))
    useLogout.mockImplementation(() => ({
      logout: jest.fn(),
    }))
    useContactSupport.mockImplementation(() => ({
      contactSupport: jest.fn(),
    }))
  })

  describe('Test too many cards error scenario', () => {
    it('should render too many cards error', () => {
      useMerchantMembershipCards.mockImplementation(() => ({
        tooManyCardsError: true,
        membershipCard: { id: 'mockId' },
      }))

      const { queryByTestId, getByText } = render(<MerchantMembershipCards />)

      expect(queryByTestId('too-many-cards-error')).toBeInTheDocument()
      expect(getByText('There is a problem')).toBeInTheDocument()
      expect(getByText('It looks like there is a problem with your account.')).toBeInTheDocument()
      expect(getByText('Please contact us so we can help resolve this as quickly as possible.')).toBeInTheDocument()
      expect(getByText('Get in touch')).toBeInTheDocument()
      expect(getByText('Logout')).toBeInTheDocument()
    })

    it('should not render too many cards error', () => {
      useMerchantMembershipCards.mockImplementation(() => ({
        tooManyCardsError: false,
        membershipCard: { id: 'mockId' },
      }))

      const { queryByTestId } = render(<MerchantMembershipCards />)

      expect(queryByTestId('too-many-cards-error')).not.toBeInTheDocument()
    })
  })

  describe('Test We Found You scenario', () => {
    it('should render We Found You', () => {
      useMerchantMembershipCards.mockImplementation(() => ({
        shouldDisplayTermsAndConditionsCheck: true,
        membershipCard: { id: 'mockId' },
      }))

      const { queryByTestId } = render(<MerchantMembershipCards />)
      expect(queryByTestId('we-found-you')).toBeInTheDocument()
    })

    it('should not render We Found You', () => {
      useMerchantMembershipCards.mockImplementation(() => ({
        shouldDisplayTermsAndConditionsCheck: false,
        membershipCard: { id: 'mockId' },
      }))

      const { queryByTestId } = render(<MerchantMembershipCards />)
      expect(queryByTestId('we-found-you')).not.toBeInTheDocument()
    })
  })

  describe('Test Preparing Your Card scenario', () => {
    it('should render Preparing Your Card', () => {
      useMerchantMembershipCards.mockImplementation(() => ({
        isMembershipCardPending: true,
        membershipCard: { id: 'mockId' },
      }))

      const { queryByTestId } = render(<MerchantMembershipCards />)
      expect(queryByTestId('preparing-your-card')).toBeInTheDocument()
    })

    it('should not render Preparing Your Card', () => {
      useMerchantMembershipCards.mockImplementation(() => ({
        isMembershipCardPending: false,
        membershipCard: { id: 'mockId' },
      }))

      const { queryByTestId } = render(<MerchantMembershipCards />)
      expect(queryByTestId('preparing-your-card')).not.toBeInTheDocument()
    })
  })

  describe('Test Hang Tight scenario', () => {
    it('should render Hang Tight', () => {
      useMerchantMembershipCards.mockImplementation(() => ({
        tooManyCardsError: false,
        shouldDisplayTermsAndConditionsCheck: false,
        isMembershipCardPending: false,
        membershipCard: { id: 'mockId' },
      }))

      const { queryByTestId } = render(<MerchantMembershipCards />)
      expect(queryByTestId('hang-tight')).toBeInTheDocument()
    })

    it('should not render Hang Tight', () => {
      useMerchantMembershipCards.mockImplementation(() => ({
        tooManyCardsError: true,
        shouldDisplayTermsAndConditionsCheck: true,
        isMembershipCardPending: true,
        membershipCard: { id: 'mockId' },
      }))

      const { queryByTestId } = render(<MerchantMembershipCards />)
      expect(queryByTestId('hang-tight')).not.toBeInTheDocument()
    })
  })
})
