import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { usePaymentCardAddForm } from './hooks/usePaymentCardAddForm'

import PaymentCardAddForm from './PaymentCardAddForm'
import PaymentCardInputGroup from 'components/Form/PaymentCardInputGroup'

const PaymentCardAddFormComponent = <PaymentCardAddForm onClose = {jest.fn()} />
// const PaymentCardInputGroupComponent = <PaymentCardInputGroup />

// mock components

// mock usePaymentCardAddForm hook

jest.mock('./hooks/usePaymentCardAddForm', () => ({
  usePaymentCardAddForm: jest.fn(),
}))
jest.mock('components/Form/PaymentCardInputGroup', () => () => null)

const mockFullName = 'mock_full_name'
const mockFullNameError = false
const mockExpiry = 'mock_expiry'
const mockExpiryError = false
const mockHandleExpiryChange = jest.fn()
const mockHandleNameChange = jest.fn()
const mockHandleNameBlur = jest.fn()
const mockCardNumberError = false
const mockHandlePaymentCardChange = jest.fn()
const mockHandlePaymentCardBlur = jest.fn()
const mockGenericSpreedlyError = false
const mockGenericBinkError = false
const mockIsPaymentFormValid = jest.fn()
const mockIsLoading = false
const mockSubmitForm = jest.fn()

const defaultHookValues = {
  fullName: mockFullName,
  fullNameError: mockFullNameError,
  expiry: mockExpiry,
  expiryError: mockExpiryError,
  handleExpiryChange: mockHandleExpiryChange,
  handleNameChange: mockHandleNameChange,
  handleNameBlur: mockHandleNameBlur,
  cardNumberError: mockCardNumberError,
  handlePaymentCardChange: mockHandlePaymentCardChange,
  handlePaymentCardBlur: mockHandlePaymentCardBlur,
  genericSpreedlyError: mockGenericSpreedlyError,
  genericBinkError: mockGenericBinkError,
  isPaymentFormValid: mockIsPaymentFormValid,
  isLoading: mockIsLoading,
  submitForm: mockSubmitForm,
}

// unit Tests
describe('Test PaymentCardAddForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Test PaymentCardAddForm', () => {
    describe('Test static non-form elements', () => {
      it('should display the correct modal header', () => {
        usePaymentCardAddForm.mockImplementation(() => ({ ...defaultHookValues }))
        render(PaymentCardAddFormComponent)
        expect(screen.getByRole('heading')).toHaveTextContent('Add payment card')
      })
      it('should display the correct instructions', () => {
        usePaymentCardAddForm.mockImplementation(() => ({ ...defaultHookValues }))
        render(PaymentCardAddFormComponent)
        expect(screen.getByText('Enter details below to add your payment card.')).toBeInTheDocument()
      })
      it('should display the privacy and security link with correct behaviour', () => {
        usePaymentCardAddForm.mockImplementation(() => ({ ...defaultHookValues }))
        render(PaymentCardAddFormComponent)
        const privacyLink = screen.queryByTestId('bink-privacy-and-security')
        expect(privacyLink).toBeInTheDocument()
        expect(privacyLink).toHaveTextContent('Bink Privacy and Security')
        expect(privacyLink).toHaveAttribute('href', 'https://bink.com/privacy-policy/')
        expect(privacyLink).toHaveAttribute('target', '_blank')
      })
    })
    describe('Test Form Elements', () => {
      // it('should render the Card number field with correct label and placeholder', () => {
      //   usePaymentCardAddForm.mockImplementation(() => ({ ...defaultHookValues }))
      //   render(PaymentCardAddFormComponent)
      //   screen.debug()
      //   const cardNumberField = screen.getByLabelText('Card number')
      //   expect(cardNumberField).toBeInTheDocument()
      //   expect(cardNumberField).toHaveAttribute('placeholder', 'Card number')
      // })
      it('should render the expiry date fields in the correct order', () => {
        usePaymentCardAddForm.mockImplementation(() => ({ ...defaultHookValues }))
        render(PaymentCardAddFormComponent)
        const monthField = screen.getByTitle('MM')
        const yearField = screen.getByTitle('YY')
        userEvent.click(monthField)
        expect(monthField).toHaveFocus()
        userEvent.tab()
        expect(yearField).toHaveFocus()
      })
      it('should render correct number of expiry date options', () => {
        usePaymentCardAddForm.mockImplementation(() => ({ ...defaultHookValues }))
        render(PaymentCardAddFormComponent)
        expect(screen.getAllByRole('option')).toHaveLength(35)
      })
      it('should render the name on card field with correct label and placeholder', () => {
        usePaymentCardAddForm.mockImplementation(() => ({ ...defaultHookValues }))
        render(PaymentCardAddFormComponent)
        const nameOnCardField = screen.getByLabelText('Name on card')
        expect(nameOnCardField).toBeInTheDocument()
        expect(nameOnCardField).toHaveAttribute('placeholder', 'Name on card')
        userEvent.type(nameOnCardField, mockFullName)
        expect(nameOnCardField).toHaveValue(mockFullName)
        expect(screen.queryByText('Invalid Name')).not.toBeInTheDocument()
      })
      it('should render the submit button with correct text and be disabled by default', () => {
        usePaymentCardAddForm.mockImplementation(() => ({ ...defaultHookValues }))
        render(PaymentCardAddFormComponent)
        const submitButton = screen.getByTestId('submit-button')
        expect(submitButton).toBeInTheDocument()
        expect(submitButton).toHaveTextContent('Add payment card')
        expect(submitButton).toBeDisabled()
      })
    })

    describe('Test Form States', () => {
      it('should render the correct error message for each field', () => {
        usePaymentCardAddForm.mockImplementation(() => ({
          ...defaultHookValues,
          cardNumberError: 'Invalid card number',
          expiryError: 'Invalid date',
          fullNameError: 'Invalid name',
        }))
        render(PaymentCardAddFormComponent)
        // expect(screen.getByText('Invalid card number')).toBeInTheDocument()
        expect(screen.getByText('Invalid date')).toBeInTheDocument()
        expect(screen.getByText('Invalid name')).toBeInTheDocument()
      })
      it('should enable the submit button when valid values are entered for each field', () => {
        usePaymentCardAddForm.mockImplementation(() => ({ ...defaultHookValues }))
        render(PaymentCardAddFormComponent)
      })
    })
  })
})
