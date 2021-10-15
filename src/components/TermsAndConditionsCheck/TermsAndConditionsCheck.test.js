import React from 'react'
import { render } from '@testing-library/react'
import TermsAndConditionsCheck from './TermsAndConditionsCheck'
import { useLogout } from 'hooks/useLogout'
import { useTermsAndConditionsCheck } from './hooks/useTermsAndConditionsCheck'

jest.mock('hooks/useLogout', () => ({
  useLogout: jest.fn(),
}))
jest.mock('hooks/useCheckSessionEnded', () => ({
  useCheckSessionEnded: jest.fn(),
}))
jest.mock('./hooks/useTermsAndConditionsCheck', () => ({
  useTermsAndConditionsCheck: jest.fn(),
}))

const mockParagraphHeading = 'mockParagraphHeading'
const mockParagraphOne = 'mockParagraphOne'
const mockParagraphTwoPrefix = 'mockParagraphTwoPrefix'
const termsAndConditionsCheckComponent = (<TermsAndConditionsCheck heading={mockParagraphHeading} paragraphOne={mockParagraphOne} paragraphTwoPrefix={mockParagraphTwoPrefix} />)

describe('Test TermsAndConditionsCheck', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    useTermsAndConditionsCheck.mockImplementation(() => ({ acceptTerms: jest.fn(), postError: false }))
    useLogout.mockImplementation(() => ({ logout: jest.fn() }))
  })

  it('should render Heading', () => {
    const { queryByText } = render(termsAndConditionsCheckComponent)
    expect(queryByText(mockParagraphHeading)).toBeInTheDocument()
  })

  it('should render first paragraph', () => {
    const { queryByText } = render(termsAndConditionsCheckComponent)
    expect(queryByText(mockParagraphOne)).toBeInTheDocument()
  })

  it('should not render first paragraph', () => {
    const { queryByText } = render(<TermsAndConditionsCheck />)
    expect(queryByText(mockParagraphOne)).not.toBeInTheDocument()
  })

  it('should render second paragraph with both dynamic and static elements', () => {
    const { getByTestId } = render(termsAndConditionsCheckComponent)
    expect(getByTestId('paragraphTwo')).toContainHTML(`${mockParagraphTwoPrefix} you need to accept the`)
  })

  it('should render continue button', () => {
    const { getByRole } = render(termsAndConditionsCheckComponent)
    expect(getByRole('button', { name: /continue/i })).toBeInTheDocument()
  })

  it('should render cancel button', () => {
    const { getByRole } = render(termsAndConditionsCheckComponent)
    expect(getByRole('button', { name: /cancel/i })).toBeInTheDocument()
  })
})
