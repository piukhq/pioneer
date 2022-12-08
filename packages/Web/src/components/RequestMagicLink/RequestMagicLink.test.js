import { render, screen } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { useRequestMagicLink } from './hooks/useRequestMagicLink'
import { useMagicLinkAuthenticationStatus } from './hooks/useMagicLinkAuthenticationStatus'
import RequestMagicLink from './RequestMagicLink'

const mockStore = configureMockStore([])
const store = mockStore()

window.scrollTo = jest.fn() // window.scrollTo is used in the component but not supported by Jest

jest.mock('./hooks/useRequestMagicLink', () => ({
  useRequestMagicLink: jest.fn(),
}))

jest.mock('./hooks/useMagicLinkAuthenticationStatus', () => ({
  useMagicLinkAuthenticationStatus: jest.fn(),
}))

jest.mock('components/LoadingIndicator', () => () => <div data-testid="loading-indicator" />)
jest.mock('components/Button', () => () => <div data-testid="button" />)
jest.mock('components/Form/TextInputGroup', () => () => <div data-testid="text-input-group" />)
jest.mock('components/AppLinks', () => () => <div data-testid="app-links" />)

const mockHandleSubmit = jest.fn()

const defaultRequestMagicLinkHookValues = {
  email: 'mockEmail',
  setEmail: jest.fn(),
  success: false,
  error: false,
  loading: false,
  handleSubmit: mockHandleSubmit,
}

const defaultMagicLinkAuthenticationStatusHookValues = {
  error: false,
  isExpiredToken: false,
}

const requestMagicLinkComponent = (
  <Provider store={store}>
    <RequestMagicLink />
  </Provider>
)

describe('Test RequestMagicLink', () => {
  global.Config = {
    magicLinkRequestFormDescription: ['mockDescription 1', 'mockDescription 2'],
    planTitlePrefix: 'mockPlanTitlePrefix',
    planTitle: 'mockPlanTitle',
    planTitleSuffix: 'mockPlanTitleSuffix',
    isMerchantChannel: false,
    magicLinkRequestFormFooterNote: 'mockFooterNote',
    urls: { termsAndConditions: 'mockTermsAndConditionsUrl' }
  }

  beforeAll(() => {
    jest.clearAllMocks()
  })

  it('should render the loading indicator when loading', () => {
    useRequestMagicLink.mockImplementation(() => ({ ...defaultRequestMagicLinkHookValues, loading: true }))
    useMagicLinkAuthenticationStatus.mockImplementation(() => ({ ...defaultMagicLinkAuthenticationStatusHookValues }))
    render(requestMagicLinkComponent)

    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument()
  })

  describe('Test Request Magic Link Form', () => {
    beforeEach(() => {
      useRequestMagicLink.mockImplementation(() => ({ ...defaultRequestMagicLinkHookValues }))
      useMagicLinkAuthenticationStatus.mockImplementation(() => ({ ...defaultMagicLinkAuthenticationStatusHookValues }))
    })

    it('should render the correct heading', () => {
      render(requestMagicLinkComponent)

      expect(screen.getByRole('heading', { name: 'mockPlanTitlePrefix mockPlanTitlemockPlanTitleSuffix' })).toBeInTheDocument()
    })

    it('should render the correct form copy', () => {
      render(requestMagicLinkComponent)
      expect(screen.getByText('mockDescription 1')).toBeInTheDocument()
      expect(screen.getByText('mockDescription 2')).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'Magic Link' })).toBeInTheDocument()
      expect(screen.getByTestId('app-links')).toBeInTheDocument()
      expect(screen.getByText('mockFooterNote')).toBeInTheDocument()
    })

    it('should render the email form', () => {
      render(requestMagicLinkComponent)

      expect(screen.getByTestId('text-input-group')).toBeInTheDocument()
      expect(screen.getByTestId('button')).toBeInTheDocument()
    })

    it('should not render the magic link link or app links for a merchant channel', () => {
      global.Config.isMerchantChannel = true
      useRequestMagicLink.mockImplementation(() => ({ ...defaultRequestMagicLinkHookValues }))
      useMagicLinkAuthenticationStatus.mockImplementation(() => ({ ...defaultMagicLinkAuthenticationStatusHookValues }))
      render(requestMagicLinkComponent)

      expect(screen.queryByRole('link', { name: 'Magic Link' })).not.toBeInTheDocument()
      expect(screen.queryByTestId('app-links')).not.toBeInTheDocument()
    })
  })

  describe('Test Request Magic Link Success', () => {
    it('should render the success message when the email has been successfully sent', () => {
      useRequestMagicLink.mockImplementation(() => ({ ...defaultRequestMagicLinkHookValues, success: true }))
      useMagicLinkAuthenticationStatus.mockImplementation(() => ({ ...defaultMagicLinkAuthenticationStatusHookValues }))
      render(requestMagicLinkComponent)

      expect(screen.getByRole('heading', { name: 'Check your inbox!' })).toBeInTheDocument()
      expect(screen.getByTestId('email-confirmation')).toHaveTextContent('We have just emailed a link to mockEmail.')
      expect(screen.getByText('Click the link and you’ll be signed in.')).toBeInTheDocument()
      expect(screen.getByText('The device you open the link on will be the device you are signed in on.')).toBeInTheDocument()
      expect(screen.queryByTestId('text-input-group')).not.toBeInTheDocument()
      expect(screen.queryByTestId('button')).not.toBeInTheDocument()
    })
  })

  describe('Test Request Magic Link Error', () => {
    it('should render the error message with form to retry when there is an unknown error', () => {
      useRequestMagicLink.mockImplementation(() => ({ ...defaultRequestMagicLinkHookValues, error: true }))
      useMagicLinkAuthenticationStatus.mockImplementation(() => ({ ...defaultMagicLinkAuthenticationStatusHookValues }))
      render(requestMagicLinkComponent)

      expect(screen.getByRole('heading', { name: 'Something went wrong' })).toBeInTheDocument()
      expect(screen.getByText('There was a problem, please try again')).toBeInTheDocument()
      expect(screen.getByTestId('text-input-group')).toBeInTheDocument()
      expect(screen.getByTestId('button')).toBeInTheDocument()
    })
  })

  describe('Test Request Magic Link Expired', () => {
    it('should render the expired message with form to retry when the token is expired', () => {
      useMagicLinkAuthenticationStatus.mockImplementation(() => ({ ...defaultMagicLinkAuthenticationStatusHookValues, isExpiredToken: true }))
      useRequestMagicLink.mockImplementation(() => ({ ...defaultRequestMagicLinkHookValues, error: true }))
      render(requestMagicLinkComponent)

      expect(screen.getByRole('heading', { name: 'Link expired' })).toBeInTheDocument()
      expect(screen.getByText('Links are only valid for 10 minutes and this one has expired.')).toBeInTheDocument()
      expect(screen.getByText('Enter your email again and we will send you a new one.')).toBeInTheDocument()
      expect(screen.getByTestId('text-input-group')).toBeInTheDocument()
      expect(screen.getByTestId('button')).toBeInTheDocument()
    })
  })
})
