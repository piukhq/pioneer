import React from 'react'
import { render, screen } from '@testing-library/react'
import { toHaveTextContent } from '@testing-library/jest-dom/extend-expect'
import { usePaymentCardAddForm } from './hooks/usePaymentCardAddForm'

import PaymentCardAddForm from './PaymentCardAddForm'
import Modal from 'components/Modal'
import cx from 'classnames'
import Button from 'components/Button'
import SelectboxGroup from 'components/Form/SelectboxGroup'
import TextInputGroup from 'components/Form/TextInputGroup'
import Loading3 from 'components/Loading3'
import PaymentCardInputGroup from 'components/Form/PaymentCardInputGroup'
import { getExpiryDates } from 'utils/dates'

const PaymentCardAddFormComponent = <PaymentCardAddForm onClose = {jest.fn()} />

// mock components

// mock usePaymentCardAddForm hook

jest.mock('./hooks/usePaymentCardAddForm', () => ({
  usePaymentCardAddForm: jest.fn(),
}))

const mockFullName = 'mock_full_name'
const mockFullNameError = false
const mockExpiry = 'mock_expiry'
const mockExpiryError = false
const mockHandleExpiryChange = jest.fn()
const mockHandleNameChange = jest.fn()
const mockHandleNameBlur = false
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

  it('placeholder Test', ()=> {
    expect(true).toBeTruthy()
  })

  describe('Test PaymentCardAddForm', () => {
    describe('Test non-form elements', () => {
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

    describe('Test card number field', () => { // placeholder
      it('placeholder Test', () => {
        expect(true).toBeTruthy()
      })
    })
    describe('Test card expiry fields', () => { // placeholder
      it('placeholder Test', () => {
        expect(true).toBeTruthy()
      })
    })
    describe('Test name on card field', () => { // placeholder
      it('placeholder Test', () => {
        expect(true).toBeTruthy()
      })
    })
    describe('Test submit button', () => { // placeholder
      it('placeholder Test', () => {
        expect(true).toBeTruthy()
      })
    })
  })
})
