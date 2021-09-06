import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { usePaymentCardAddForm } from './hooks/usePaymentCardAddForm'

import PaymentCardAddForm from './PaymentCardAddForm'

const PaymentCardAddFormComponent = <PaymentCardAddForm onClose = {jest.fn()} />

jest.mock('./hooks/usePaymentCardAddForm', () => ({
  usePaymentCardAddForm: jest.fn(),
}))

jest.mock('components/Form/PaymentCardInputGroup', () => { // PaymentCardGroup is NOT tested in this file
  return {
    __esModule: true,
    default: () => {
      return <></>
    },
  }
})

jest.mock('utils/dates', () => ({
  getExpiryDates: () => mockExpiryDates,
}))

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
const mockIsValidForm = jest.fn(() => true)
const mockIsLoading = false
const mockSubmitForm = jest.fn()

const mockExpiryDates = {
  MM: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
  YY: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41],
}

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
  isValidForm: mockIsValidForm,
  isLoading: mockIsLoading,
  submitForm: mockSubmitForm,
}

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
      it('should render the expiry date fields in the correct order', () => {
        usePaymentCardAddForm.mockImplementation(() => ({ ...defaultHookValues }))
        render(PaymentCardAddFormComponent)
        const [monthOptions, yearOptions] = screen.getAllByRole('combobox')
        userEvent.click(monthOptions)
        expect(monthOptions).toHaveFocus()
        userEvent.tab()
        expect(yearOptions).toHaveFocus()
      })
      it('should render correct number of expiry date options', () => {
        usePaymentCardAddForm.mockImplementation(() => ({ ...defaultHookValues }))
        render(PaymentCardAddFormComponent)
        const [monthOptions, yearOptions] = screen.getAllByRole('combobox')
        expect(monthOptions).toHaveLength(14)
        expect(yearOptions).toHaveLength(23)
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
      it('should render the correct error message for each field', () => {
        usePaymentCardAddForm.mockImplementation(() => ({
          ...defaultHookValues,
          cardNumberError: 'Invalid card number',
          expiryError: 'Invalid date',
          fullNameError: 'Invalid name',
        }))
        render(PaymentCardAddFormComponent)
        expect(screen.getByText('Invalid date')).toBeInTheDocument()
        expect(screen.getByText('Invalid name')).toBeInTheDocument()
      })
    })

    describe('Test Form Submit Button', () => {
      it('should render the submit button with correct text and be disabled by default', () => {
        usePaymentCardAddForm.mockImplementation(() => ({ ...defaultHookValues }))
        render(PaymentCardAddFormComponent)
        const submitButton = screen.getByTestId('submit-button')
        expect(submitButton).toHaveTextContent('Add payment card')
        expect(submitButton).toBeDisabled()
      })
      it('should enable the submit button when payment form is valid', () => {
        usePaymentCardAddForm.mockImplementation(() => ({
          ...defaultHookValues,
          isValidForm: () => true,
          isLoading: false,
        }))
        render(PaymentCardAddFormComponent)
        expect(screen.getByTestId('submit-button')).toBeEnabled()
      })
      it('should disable the submit button when payment form is loading', () => {
        usePaymentCardAddForm.mockImplementation(() => ({
          ...defaultHookValues,
          isValidForm: () => true,
          isLoading: true,
        }))
        render(PaymentCardAddFormComponent)
        expect(screen.getByTestId('submit-button')).toBeDisabled()
      })
      it('should run submitForm function when submit Button is clicked', () => {
        window._virtualConsole.emit = jest.fn() // fix to override console log html form submission error
        usePaymentCardAddForm.mockImplementation(() => ({
          ...defaultHookValues,
          isValidForm: () => true,
          isLoading: false,
        }))
        render(PaymentCardAddFormComponent)
        userEvent.click(screen.getByTestId('submit-button'))
        expect(mockSubmitForm).toHaveBeenCalled()
      })
    })
  })
})
