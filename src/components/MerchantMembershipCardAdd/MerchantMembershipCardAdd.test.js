import React from 'react'
import * as reactRedux from 'react-redux'
import { render, fireEvent } from '@testing-library/react'
import { useContactSupport } from 'hooks/useContactSupport'
import { useLogout } from 'hooks/useLogout'
import { useLoadMembershipPlans } from './hooks/useLoadMembershipPlans'
import MerchantMembershipCardAdd from 'components/MerchantMembershipCardAdd'

const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')

jest.mock('hooks/useLogout', () => ({
  useLogout: jest.fn(),
}))
jest.mock('hooks/useContactSupport', () => ({
  useContactSupport: jest.fn(),
}))

jest.mock('./hooks/useLoadMembershipPlans', () => ({
  useLoadMembershipPlans: jest.fn(),
}))

const useLoadMembershipPlansDefaultValues = {
  plan: {
    id: 'mock_id',
    account: {
      add_fields: ['mock_add_field'],
      fieldTypes: ['mock_field_type'],
      plan_name: 'mock_plan_name',
    },
  },
}

jest.mock('components/MembershipCardForm', () => () => null)

const mockPlanId = 'mock_plan_id'
const mockUserId = 'mock_user_id'
const mockContactSupport = jest.fn()
const mockLogout = jest.fn()

const merchantMembershipCardAddComponent = (<MerchantMembershipCardAdd planId={mockPlanId} />)

describe('Test MerchantMembershipCardAdd', () => {
  beforeEach(() => {
    useSelectorMock.mockReturnValueOnce(mockUserId)
    useLoadMembershipPlans.mockImplementation(() => ({ ...useLoadMembershipPlansDefaultValues }))
    useLogout.mockImplementation(() => ({ logout: mockLogout }))
    useContactSupport.mockImplementation(() => ({ contactSupport: mockContactSupport }))
  })

  describe('Test Heading and Description copy', () => {
    it('should render the header with correct copy', () => {
      const { getByRole, getByText } = render(merchantMembershipCardAddComponent)
      expect(getByRole('heading')).toBeInTheDocument()
      expect(getByText('We found you')).toBeInTheDocument()
    })

    it('should render the correct description paragraphs', () => {
      const { getByTestId } = render(merchantMembershipCardAddComponent)
      expect(getByTestId('paragraph-1')).toHaveTextContent('You’re already a member of the mock_plan_name! Your account is registered to mock_user_id.')
      expect(getByTestId('paragraph-2')).toHaveTextContent('Please enter your details below to view your balance and voucher information. You can find your number in your Welcome email.')
    })
  })

  describe('Test Contact Support button', () => {
    it('should render button in the correct order and with correct label', () => {
      const { getAllByRole } = render(merchantMembershipCardAddComponent)
      expect(getAllByRole('button')[0]).toHaveTextContent('Forgotten your card number? Contact us')
    })

    it('should call contactSupport function when clicked', () => {
      const { getByTestId } = render(merchantMembershipCardAddComponent)
      fireEvent.click(getByTestId('contact-support-button'))
      expect(mockContactSupport).toHaveBeenCalled()
    })
  })

  describe('Test Logout button', () => {
    it('should render button in the correct order and with correct label', () => {
      const { getAllByRole } = render(merchantMembershipCardAddComponent)
      expect(getAllByRole('button')[1]).toHaveTextContent('Logout')
    })

    it('should call logout function when clicked', () => {
      const { getByTestId } = render(merchantMembershipCardAddComponent)
      fireEvent.click(getByTestId('logout-button'))
      expect(mockLogout).toHaveBeenCalled()
    })
  })
})
