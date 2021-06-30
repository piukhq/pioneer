import React from 'react'
import * as reactRedux from 'react-redux'
import { renderHook } from '@testing-library/react-hooks'
import { useMembershipCardsState } from 'hooks/membershipCards'
import { useMerchantMembershipCardsLogic } from './useMerchantMembershipCardsLogic'

jest.mock('hooks/membershipCards', () => ({
  useMembershipCardsState: jest.fn(),
}))

jest.mock('ducks/membershipCards', () => ({
  selectors: {
    isReenrolRequired: jest.fn(),
    isReaddRequired: jest.fn(),
  },
  actions: { getMembershipCards: jest.fn() },
}))

jest.mock('ducks/service', () => ({
  actions: { getService: jest.fn() },
}))

const mockHistoryReplace = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    replace: mockHistoryReplace,
  }),
}))

describe('Test useMerchantMembershipCardsLogic', () => {
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch')

  const mockSetState = jest.fn()
  const mockServiceState = {
    success: true,
    error: false,
    post: {
      success: false,
    },
  }

  beforeEach(() => {
    useSelectorMock.mockClear()
    useDispatchMock.mockClear()
    jest.clearAllMocks()

    useMembershipCardsState.mockImplementation(() => ({
      membershipCards: [{}],
    }))
    useSelectorMock.mockReturnValue(mockServiceState)

    React.useState = jest.fn().mockReturnValue([false, mockSetState])
  })

  it('should dispatch correct number of functions', () => {
    const dummyDispatch = jest.fn()
    useDispatchMock.mockReturnValue(dummyDispatch)
    renderHook(() => useMerchantMembershipCardsLogic())
    expect(dummyDispatch).toBeCalledTimes(2)
  })

  it('should call correct route if no membership cards are found', () => {
    useMembershipCardsState.mockImplementationOnce(() => ({
      membershipCards: [],
    }))

    renderHook(() => useMerchantMembershipCardsLogic())
    expect(mockHistoryReplace).toBeCalledWith(`/membership-card/add/${Config.membershipPlanId}`)
  })

  it('should set state if service error has occured', () => {
    useSelectorMock.mockReturnValue({
      success: true,
      error: true,
      post: {
        success: false,
      },
    })

    renderHook(() => useMerchantMembershipCardsLogic())
    expect(mockSetState).toBeCalled()
  })

  describe('Test re-add and re-enrol', () => {
    it('should call correct route if re-enrol is required', () => {
      useSelectorMock
        // State service slice
        .mockReturnValueOnce(mockServiceState)
        // isReenrolRequired
        .mockReturnValueOnce(true)
        // isReaddRequired
        .mockReturnValueOnce(false)
        // State membershipCards slice
        .mockReturnValueOnce({ success: true })

      renderHook(() => useMerchantMembershipCardsLogic())
      expect(mockHistoryReplace).toBeCalledWith(`/membership-card/add/${Config.membershipPlanId}`)
    })

    it('should call correct route if re-add is required', () => {
      useSelectorMock
        // State service slice
        .mockReturnValueOnce(mockServiceState)
        // isReenrolRequired
        .mockReturnValueOnce(false)
        // isReaddRequired
        .mockReturnValueOnce(true)
        // State membershipCards slice
        .mockReturnValueOnce({ success: true })

      renderHook(() => useMerchantMembershipCardsLogic())
      expect(mockHistoryReplace).toBeCalledWith(`/membership-card/add/${Config.membershipPlanId}`)
    })
  })

  describe('Test happy path', () => {
    const mockMembershipCardId = 'mock_id'

    beforeEach(() => {
      jest.clearAllMocks()

      useSelectorMock
        // State service slice
        .mockReturnValueOnce(mockServiceState)
        // isReenrolRequired
        .mockReturnValueOnce(false)
        // isReaddRequired
        .mockReturnValueOnce(false)
        // State membershipCards slice
        .mockReturnValueOnce({ success: true })
    })

    it('should call correct route if isReenrolRequired or isReaddRequired is true', () => {
      useMembershipCardsState.mockImplementationOnce(() => ({
        membershipCards: [{
          status: {
            state: 'not_pending',
          },
          id: mockMembershipCardId,
        }],
      }))

      renderHook(() => useMerchantMembershipCardsLogic())
      expect(mockHistoryReplace).toBeCalledWith(`/membership-card/${mockMembershipCardId}`)
    })

    it('should not call correct route if membership card is pending', () => {
      useMembershipCardsState.mockImplementationOnce(() => ({
        membershipCards: [{
          status: {
            state: 'pending',
          },
          id: mockMembershipCardId,
        }],
      }))

      renderHook(() => useMerchantMembershipCardsLogic())
      expect(mockHistoryReplace).not.toBeCalledWith(`/membership-card/${mockMembershipCardId}`)
    })
  })
})
