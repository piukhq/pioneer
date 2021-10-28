import React from 'react'
import * as reactRedux from 'react-redux'
import { render } from '@testing-library/react'
import { useForm } from './hooks/useForm'

import MembershipCardForm from './MembershipCardForm'

jest.mock('./hooks/useForm', () => ({
  useForm: jest.fn(),
}))

const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')

describe('Test MembershipCardForm', () => {
  const mockFieldType = 'mock_field_type'
  const mockFieldDescriptionColumn = 'mock_field_description_column'
  const mockSubmitCaption = 'mock_submit_caption'
  const mockSubmittingCaption = 'mock_submitting_caption'
  const mockLinkingFeature = 'mock_linking_feature'

  const mockProps = {
    linkingFeature: mockLinkingFeature,
    plan: {
      account: {
        [mockFieldType]: [{
          column: mockFieldDescriptionColumn,
        }],
        plan_documents: [{
          display: [mockLinkingFeature],
          checkbox: true,
        }],
      },
    },
    planId: {},
    fieldTypes: [mockFieldType],
  }

  const mockUseForm = {
    values: {
      [mockFieldType]: [{
        column: mockFieldDescriptionColumn,
      }],
    },
    errors: {
      [mockFieldType]: [{
        column: mockFieldDescriptionColumn,
      }],
    },
    submitLoading: true,
    documentValues: jest.fn(),
  }

  beforeEach(() => {
    useSelectorMock.mockClear()
    jest.clearAllMocks()
    useSelectorMock.mockReturnValue(true)
    useForm.mockImplementation(() => mockUseForm)
  })

  it('should render the form element', () => {
    const { queryByTestId } = render(<MembershipCardForm {...mockProps} />)
    expect(queryByTestId('membership-card-form')).toBeInTheDocument()
  })

  it('should render the correct number of input fields', () => {
    const { queryByTestId } = render(<MembershipCardForm {...mockProps} />)
    expect(queryByTestId(`input-field-${mockFieldType}-${mockFieldDescriptionColumn}`)).toBeInTheDocument()
  })

  describe('Test Button', () => {
    it('should render the Button component', () => {
      const { queryByTestId } = render(<MembershipCardForm {...mockProps} />)
      expect(queryByTestId('membership-card-form-button')).toBeInTheDocument()
    })

    it('should render the submitting caption text', () => {
      const props = {
        ...mockProps,
        submittingCaption: mockSubmittingCaption,
      }
      const { getByText } = render(<MembershipCardForm {...props} />)
      expect(getByText(mockSubmittingCaption)).toBeInTheDocument()
    })

    it('should render the submit caption text', () => {
      useForm.mockImplementation(() => ({
        ...mockUseForm,
        submitLoading: false,
      }))

      const props = {
        ...mockProps,
        submitCaption: mockSubmitCaption,
      }
      const { getByText } = render(<MembershipCardForm {...props} />)
      expect(getByText(mockSubmitCaption)).toBeInTheDocument()
    })

    it('should render the default button text', () => {
      useForm.mockImplementation(() => ({
        ...mockUseForm,
        submitLoading: false,
      }))

      const { getByText } = render(<MembershipCardForm {...mockProps} />)
      expect(getByText('Add my card')).toBeInTheDocument()
    })
  })

  describe('Test enrol form', () => {
    beforeEach(() => {
      useSelectorMock.mockClear()
      jest.clearAllMocks()
      useSelectorMock.mockReturnValue(false)
      useForm.mockImplementation(() => mockUseForm)
    })

    it('should render the bink T&Cs checkbox', () => {
      global.Config = {
        isMerchantChannel: true,
      }

      const { queryByTestId } = render(<MembershipCardForm {...mockProps} />)
      expect(queryByTestId('bink-terms-and-conditions')).toBeInTheDocument()
    })

    it('should not render the bink T&Cs checkbox', () => {
      global.Config = {
        isMerchantChannel: false,
      }

      const { queryByTestId } = render(<MembershipCardForm {...mockProps} />)
      expect(queryByTestId('bink-terms-and-conditions')).not.toBeInTheDocument()
    })

    it('should render the plan document checkbox', () => {
      const { queryByTestId } = render(<MembershipCardForm {...mockProps} />)
      expect(queryByTestId('plan-document-checkbox')).toBeInTheDocument()
    })

    it('should render the plan document text', () => {
      const mockPlan = {
        account: {
          [mockFieldType]: [{
            column: mockFieldDescriptionColumn,
          }],
          plan_documents: [{
            display: [mockLinkingFeature],
            checkbox: false,
          }],
        },
      }

      const props = {
        ...mockProps,
        plan: mockPlan,
      }

      const { queryByTestId } = render(<MembershipCardForm {...props} />)
      expect(queryByTestId('plan-document-text')).toBeInTheDocument()
    })

    it('should render the bink privacy policy', () => {
      global.Config = {
        isMerchantChannel: true,
      }

      const { queryByTestId } = render(<MembershipCardForm {...mockProps} />)
      expect(queryByTestId('bink-privacy-policy')).toBeInTheDocument()
    })

    it('should not render the bink privacy policy', () => {
      global.Config = {
        isMerchantChannel: false,
      }

      const { queryByTestId } = render(<MembershipCardForm {...mockProps} />)
      expect(queryByTestId('bink-privacy-policy')).not.toBeInTheDocument()
    })
  })
})
