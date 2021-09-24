import React from 'react'
import { render } from '@testing-library/react'
import { useModals } from 'hooks/useModals'
import MembershipCardHeroImage from './MembershipCardHeroImage'

const mockImgUrl = 'mock_img_url'

jest.mock('hooks/useModals', () => ({
  useModals: jest.fn(),
}))
jest.mock('utils/enums', () => ({
  MEMBERSHIP_CARD_IMAGE_TYPES: {
    HERO: 'mock_hero_enum',
  },
}))

const useModalsDefaultValues = {
  isMembershipCardHeroModalRequested: false,
  requestMembershipCardHeroModal: jest.fn(),
}

const mockMembershipId = 'mock_membership_id'
const mockMembershipCard = {
  images: [
    {
      type: 'mock_hero_enum',
      url: mockImgUrl,
    },
  ],
  card: {
    membership_id: mockMembershipId,
  },
}

describe('Test MembershipCardHeroImage', () => {
  describe('Test membership card image render', () => {
    it('should render the membership card image', () => {
      useModals.mockImplementation(() => ({ ...useModalsDefaultValues }))
      const { queryByTestId } = render(<MembershipCardHeroImage membershipCard={mockMembershipCard} />)
      expect(queryByTestId('membership-card-image')).toBeInTheDocument()
    })

    it('should not render the membership card image', () => {
      useModals.mockImplementation(() => ({ ...useModalsDefaultValues }))
      const { queryByTestId } = render(<MembershipCardHeroImage />)
      expect(queryByTestId('membership-card-image')).not.toBeInTheDocument()
    })
  })

  describe('Test membership card metadata', () => {
    it('should render the membership card metadata', () => {
      useModals.mockImplementation(() => ({ ...useModalsDefaultValues }))
      const { getByText } = render(<MembershipCardHeroImage membershipCard={mockMembershipCard} />)
      expect(getByText(`Card number: ${mockMembershipId}`)).toBeInTheDocument()
    })

    it('should not render the membership card metadata', () => {
      useModals.mockImplementation(() => ({ ...useModalsDefaultValues }))
      const { queryByText } = render(<MembershipCardHeroImage />)
      expect(queryByText(`Card number: ${mockMembershipId}`)).not.toBeInTheDocument()
    })
  })
})
