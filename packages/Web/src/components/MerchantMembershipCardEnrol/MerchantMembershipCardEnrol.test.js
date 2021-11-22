import React from 'react'
import * as reactRedux from 'react-redux'
import { render, fireEvent } from '@testing-library/react'
import { useContactSupport } from 'hooks/useContactSupport'
import { useLogout } from 'hooks/useLogout'
import {
  useMembershipPlansState,
  useMembershipPlansDispatch,
} from 'hooks/membershipPlans'
import { useLoadMembershipCardsReenrol } from './hooks/useLoadMembershipCardsReenrol'
import MerchantMembershipCardEnrol from 'components/MerchantMembershipCardEnrol'

const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')

jest.mock('hooks/useLogout', () => ({
  useLogout: jest.fn(),
}))

jest.mock('hooks/useContactSupport', () => ({
  useContactSupport: jest.fn(),
}))

jest.mock('hooks/membershipPlans', () => ({
  useMembershipPlansState: jest.fn(),
  useMembershipPlansDispatch: jest.fn(),
}))

jest.mock('./hooks/useLoadMembershipCardsReenrol', () => ({
  useLoadMembershipCardsReenrol: jest.fn(),
}))

jest.mock('components/MembershipCardForm', () => () => null)

const useLoadMembershipPlansDefaultValues = {
  membershipPlanById: {
    id: 'mock_id',
    account: {
      enrol_fields: ['mock_enrol_field'],
      fieldTypes: ['mock_field_type'],
      plan_name: 'mock_plan_name',
      plan_summary: 'mock_plan_summary_from_plan',
    },
  },
}

const mockPlanId = 'mock_plan_id'
const mockUserId = 'mock_user_id'
const mockContactSupport = jest.fn()
const mockLogout = jest.fn()

const merchantMembershipCardEnrolComponent = (<MerchantMembershipCardEnrol planId={mockPlanId} />)

describe('Test MerchantMembershipCardEnrol', () => {
  beforeEach(() => {
    useSelectorMock.mockReturnValueOnce(mockUserId)
    useMembershipPlansState.mockImplementation(() => ({ ...useLoadMembershipPlansDefaultValues }))
    useMembershipPlansDispatch.mockImplementation(() => ({ getMembershipPlans: jest.fn() }))
    useLogout.mockImplementation(() => ({ logout: mockLogout }))
    useContactSupport.mockImplementation(() => ({ contactSupport: mockContactSupport }))
  })

  describe('Test Initial Enrol Elements', () => {
    beforeEach(() => {
      global.Config = {
        planSummary: [],
      }
      useLoadMembershipCardsReenrol.mockImplementation(() => ({ reenrolFormVisible: false }))
    })

    it('should render the header with correct copy', () => {
      const { getByRole, getByText } = render(merchantMembershipCardEnrolComponent)
      expect(getByRole('heading')).toBeInTheDocument()
      expect(getByText('Join mock_plan_name')).toBeInTheDocument()
    })

    it('should render the plan summary from plan', () => {
      const { getByText } = render(merchantMembershipCardEnrolComponent)
      expect(getByText('mock_plan_summary_from_plan')).toBeInTheDocument()
    })

    it('should render the plan summary from config file', () => {
      global.Config = {
        planSummary: ['mock_plan_summary_from_config'],
      }
      const { getByText } = render(merchantMembershipCardEnrolComponent)
      expect(getByText('mock_plan_summary_from_config')).toBeInTheDocument()
    })

    describe('Test Cancel Button', () => {
      it('should render a button with the correct label', () => {
        const { getByRole } = render(merchantMembershipCardEnrolComponent)
        expect(getByRole('button')).toHaveTextContent('Cancel')
      })

      it('should call logout function when clicked', () => {
        const { getByRole } = render(merchantMembershipCardEnrolComponent)
        fireEvent.click(getByRole('button'))
        expect(mockLogout).toHaveBeenCalled()
      })
    })
  })

  describe('Test Reenrol Elements', () => {
    beforeEach(() => {
      useLoadMembershipCardsReenrol.mockImplementation(() => ({ reenrolFormVisible: true }))
    })

    it('should render the header with correct copy', () => {
      const { getByRole, getByText } = render(merchantMembershipCardEnrolComponent)
      expect(getByRole('heading')).toBeInTheDocument()
      expect(getByText("Let's try again")).toBeInTheDocument()
    })

    it('should render the correct description paragraph', () => {
      const { getByText } = render(merchantMembershipCardEnrolComponent)
      expect(getByText('There was a problem getting your card set up. Please try again. Remember, we are always here to help if you would rather us help resolve this.')).toBeInTheDocument()
    })

    describe('Test Contact Support Button', () => {
      it('should render a button with the correct label', () => {
        const { getByRole } = render(merchantMembershipCardEnrolComponent)
        expect(getByRole('button')).toHaveTextContent('Contact support')
      })

      it('should call contact support function when clicked', () => {
        const { getByRole } = render(merchantMembershipCardEnrolComponent)
        fireEvent.click(getByRole('button'))
        expect(mockContactSupport).toHaveBeenCalled()
      })
    })
  })
})
