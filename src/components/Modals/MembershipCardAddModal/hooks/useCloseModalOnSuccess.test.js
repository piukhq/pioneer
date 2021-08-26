import { renderHook } from '@testing-library/react-hooks'
import { useMembershipCardsDispatch, useMembershipCardsState } from 'hooks/membershipCards'
import useCloseModalOnSuccess from './useCloseModalOnSuccess'

jest.mock('hooks/membershipCards', () => ({
  useMembershipCardsState: jest.fn(),
  useMembershipCardsDispatch: jest.fn(),
}))

const mockHistoryReplace = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    replace: mockHistoryReplace,
  }),
}))

describe('useCloseModalOnSuccess', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const mockOnClose = jest.fn()

  describe('card added successfully', () => {
    it('should redirect and call relevant functions', () => {
      const mockAddMembershipCardResetSuccessStatus = jest.fn()
      useMembershipCardsDispatch.mockImplementation(() => ({
        addMembershipCardResetSuccessStatus: mockAddMembershipCardResetSuccessStatus,
      }))

      const mockCard = { id: 'mock_id' }
      useMembershipCardsState.mockImplementation(() => ({
        add: {
          card: mockCard,
          success: true,
        },
      }))

      renderHook(() => useCloseModalOnSuccess(mockOnClose))
      expect(mockHistoryReplace).toBeCalledWith(`/membership-card/${mockCard.id}`)
      expect(mockAddMembershipCardResetSuccessStatus).toBeCalled()
      expect(mockOnClose).toBeCalled()
    })
  })

  describe('card not successfully added yet', () => {
    it('should not redirect or call functions', () => {
      useMembershipCardsState.mockImplementation(() => ({
        add: {
          success: false,
        },
      }))

      renderHook(() => useCloseModalOnSuccess(mockOnClose))
      expect(mockHistoryReplace).not.toBeCalled()
    })
  })
})
