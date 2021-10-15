import React from 'react'
import * as reactRedux from 'react-redux'
import { render } from '@testing-library/react'
import { useMembershipCardsState } from 'hooks/membershipCards'
import { useModals } from 'hooks/useModals'
import { MODAL_ACTION_TYPES as modalEnum } from 'utils/enums'

import MultichannelMembershipCards from './MultichannelMembershipCards'

jest.mock('components/Modals/MembershipCardDeleteModal', () => () => null)
jest.mock('components/TermsAndConditionsCheck', () => () => null)

jest.mock('hooks/membershipCards', () => ({
  useMembershipCardsState: jest.fn(),
}))

jest.mock('hooks/useModals', () => ({
  useModals: jest.fn(),
}))

describe('Test MultichannelMembershipCards', () => {
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')

  const mockCompanyName = 'mock_company_name'
  const mockPlanName = 'mock_plan_name'
  const mockImgUrl = 'mock_image_url'

  const mockMembershipPlans = [{
    id: 'mock_plan_id',
    account: {
      company_name: mockCompanyName,
      plan_name: mockPlanName,
    },
    card: {
      colour: 'mock_colour',
      secondary_colour: 'mock_secondary_colour',
    },
    images: [{
      type: 3,
      url: mockImgUrl,
    }],
  }]

  const mockCardState = 'mock_state'
  const mockReasonCode = 'mock_reason_code'
  const mockVoucherPrefix = 'mock_voucher_prefix'
  const mockVoucherValue = '1.00'
  const mockVoucherTargetValue = '2.00'
  const mockVoucherSuffix = 'mock_voucher_suffix'

  const mockVoucher = {
    state: 'inprogress',
    earn: {
      type: 'accumulator',
      prefix: mockVoucherPrefix,
      value: mockVoucherValue,
      target_value: mockVoucherTargetValue,
      suffix: mockVoucherSuffix,
    },
  }

  const mockCard = {
    id: 'mock_id',
    status: {
      state: mockCardState,
      reason_codes: [mockReasonCode],
    },
    membership_plan: 'mock_plan_id',
    vouchers: [mockVoucher],
  }

  beforeEach(() => {
    useSelectorMock.mockClear()
    jest.clearAllMocks()

    useSelectorMock.mockReturnValue(mockMembershipPlans)
  })

  it('should render the relevant containers and title text', () => {
    useMembershipCardsState.mockImplementation(() => ({
      membershipCards: [],
    }))

    useModals.mockImplementation(() => ({
      dispatchModal: jest.fn(),
      modalToRender: 'MOCK_MODAL',
    }))

    const { getByText, queryByTestId } = render(<MultichannelMembershipCards />)
    expect(queryByTestId('root-container')).toBeInTheDocument()
    expect(queryByTestId('account-menu-container')).toBeInTheDocument()
    expect(getByText('Membership Cards')).toBeInTheDocument()
    expect(queryByTestId('cards-container')).toBeInTheDocument()
  })

  describe('Test membership cards render', () => {
    it('should render empty state container', () => {
      useMembershipCardsState.mockImplementation(() => ({
        membershipCards: [],
      }))

      useModals.mockImplementation(() => ({
        dispatchModal: jest.fn(),
        modalToRender: 'MOCK_MODAL',
      }))

      const { getByText, queryByTestId } = render(<MultichannelMembershipCards />)
      expect(queryByTestId('empty-state-container')).toBeInTheDocument()
      expect(queryByTestId('empty-state-icon')).toBeInTheDocument()
      expect(getByText('You have no cards')).toBeInTheDocument()
    })

    it('should render the correct number of membership cards', () => {
      const numberOfCards = 3

      const mockMembershipCards = new Array(numberOfCards).fill({}).map((_, index) => {
        return {
          ...mockCard,
          id: index,
        }
      })

      useMembershipCardsState.mockImplementation(() => ({
        membershipCards: mockMembershipCards,
      }))

      useModals.mockImplementation(() => ({
        dispatchModal: jest.fn(),
        modalToRender: 'MOCK_MODAL',
      }))

      const { queryAllByTestId } = render(<MultichannelMembershipCards />)
      const membershipCards = queryAllByTestId('membership-card')
      expect(membershipCards.length).toBe(numberOfCards)
    })

    it('should render the delete button and card icon image', () => {
      useMembershipCardsState.mockImplementation(() => ({
        membershipCards: [mockCard],
      }))

      useModals.mockImplementation(() => ({
        dispatchModal: jest.fn(),
        modalToRender: 'MOCK_MODAL',
      }))

      const { getByText, queryByTestId } = render(<MultichannelMembershipCards />)
      expect(getByText('DELETE')).toBeInTheDocument()
      expect(queryByTestId('membership-card-image-mock_image_url')).toBeInTheDocument()
    })

    it('should render the correct card info', () => {
      useMembershipCardsState.mockImplementation(() => ({
        membershipCards: [mockCard],
      }))

      useModals.mockImplementation(() => ({
        dispatchModal: jest.fn(),
        modalToRender: 'MOCK_MODAL',
      }))

      const { getByText } = render(<MultichannelMembershipCards />)
      expect(getByText(mockCompanyName)).toBeInTheDocument()
      expect(getByText(mockPlanName)).toBeInTheDocument()
      expect(getByText(`${mockCardState} - ${mockReasonCode}`)).toBeInTheDocument()
      expect(getByText(`${mockVoucherPrefix}${mockVoucherValue}/${mockVoucherPrefix}${mockVoucherTargetValue} ${mockVoucherSuffix}`)).toBeInTheDocument()
    })

    it('should render the colour container', () => {
      useMembershipCardsState.mockImplementation(() => ({
        membershipCards: [mockCard],
      }))

      useModals.mockImplementation(() => ({
        dispatchModal: jest.fn(),
        modalToRender: 'MOCK_MODAL',
      }))

      const { queryByTestId } = render(<MultichannelMembershipCards />)
      expect(queryByTestId('colour-container')).toBeInTheDocument()
    })
  })

  describe('Test membership card delete modal render', () => {
    it('should render the delete card modal', () => {
      React.useState = jest.fn()
        .mockReturnValueOnce([{ id: 'mock_card_id' }, jest.fn()])
        .mockReturnValueOnce([false, jest.fn()])
        .mockReturnValueOnce([false, jest.fn()])

      useMembershipCardsState.mockImplementation(() => ({
        membershipCards: [mockCard],
      }))

      useModals.mockImplementation(() => ({
        dispatchModal: jest.fn(),
        modalToRender: modalEnum.MEMBERSHIP_CARD_DELETE,
      }))

      const { queryByTestId } = render(<MultichannelMembershipCards />)
      expect(queryByTestId('membership-card-delete-modal')).toBeInTheDocument()
    })
  })
})
