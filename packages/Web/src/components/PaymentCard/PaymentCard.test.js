import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { usePaymentCardById } from 'hooks/paymentCards'
import PaymentCard from './PaymentCard'

// mock Payment Card Props
const mockId = 'mock_id'
const mockClassName = 'mock_className'
const mockOnDelete = jest.fn()
const mockOnClick = jest.fn()
const mockExpired = false
const mockActivating = false

const PaymentCardComponent = (
  <PaymentCard
    id = {mockId}
    className = {mockClassName}
    onClick = {mockOnClick}
    onDelete = {mockOnDelete}
    expired = {mockExpired}
    activating = {mockActivating}
  />
)
// mock usePaymentCardById Hook
jest.mock('hooks/paymentCards', () => ({
  usePaymentCardById: jest.fn(),
}))
const mockNameOnCard = 'mock_name_on_card'
const mockProvider = 'mock_provider'
const mockLast4Digits = 'mock_last_4_digits'

const defaultValues = {
  card: {
    card: {
      id: mockId,
      provider: mockProvider,
      name_on_card: mockNameOnCard,
      last_four_digits: mockLast4Digits,
    },
  },
}

describe('Test PaymentCard', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render a credit/debit card with correct information', () => {
    usePaymentCardById.mockImplementation(() => ({
      ...defaultValues,
    }))
    const { getByText, queryByTestId } = render(PaymentCardComponent)
    expect(queryByTestId('payment-card')).toBeInTheDocument()
    expect(getByText(mockNameOnCard)).toBeInTheDocument()
    expect(queryByTestId('card-number')).toHaveTextContent(`•••• ${mockLast4Digits}`)
  })

  describe('Test Payment Card Provider', () => {
    const classPrefix = `${mockClassName} root root--provider-`
    it('should apply American Express styling', () => {
      usePaymentCardById.mockImplementation(() => ({
        card: {
          card: {
            provider: 'American Express',
          },
        },
      }))
      const { queryByTestId } = render(PaymentCardComponent)
      expect(queryByTestId('payment-card')).toHaveClass(`${classPrefix}american-express`)
    })
    it('should apply Visa styling', () => {
      usePaymentCardById.mockImplementation(() => ({
        card: {
          card: {
            provider: 'Visa',
          },
        },
      }))
      const { queryByTestId } = render(PaymentCardComponent)
      expect(queryByTestId('payment-card')).toHaveClass(`${classPrefix}visa`)
    })
    it('should apply Mastercard styling', () => {
      usePaymentCardById.mockImplementation(() => ({
        card: {
          card: {
            provider: 'Mastercard',
          },
        },
      }))
      const { queryByTestId } = render(PaymentCardComponent)
      expect(queryByTestId('payment-card')).toHaveClass(`${classPrefix}mastercard`)
    })
  })
  describe('Test Payment Card Actions', () => {
    it('should indicate when credit/debit card is expired', () => {
      usePaymentCardById.mockImplementation(() => ({
        ...defaultValues,
      }))
      const { getByText, queryByTestId } = render(<PaymentCard expired/>)
      expect(getByText('Expired')).toBeInTheDocument()
      expect(queryByTestId('delete-icon')).not.toBeInTheDocument()
    })
    it('should indicate when credit/debit card is activating', () => {
      usePaymentCardById.mockImplementation(() => ({
        ...defaultValues,
      }))
      const { getByText, queryByTestId } = render(<PaymentCard activating/>)
      expect(getByText('Activating')).toBeInTheDocument()
      expect(queryByTestId('delete-icon')).not.toBeInTheDocument()
    })
    it('should render delete icon when active', () => {
      usePaymentCardById.mockImplementation(() => ({
        ...defaultValues,
      }))
      const { queryByText, queryByTestId } = render(PaymentCardComponent)
      expect(queryByTestId('delete-icon')).toBeInTheDocument()
      expect(queryByText('Activating')).not.toBeInTheDocument()
      expect(queryByText('Expired')).not.toBeInTheDocument()
    })
    it('should run delete function when delete icon is clicked', () => {
      usePaymentCardById.mockImplementation(() => ({
        ...defaultValues,
      }))
      const { getByTestId } = render(PaymentCardComponent)
      fireEvent.click(getByTestId('delete-icon'))
      expect(mockOnDelete).toHaveBeenCalled()
    })
  })
})
