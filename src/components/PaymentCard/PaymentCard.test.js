import React from 'react'
import { render } from '@testing-library/react'

import PaymentCardView from './PaymentCard.view'

describe('PaymentCardView', () => {
  it('should render the name on card', () => {
    const { getByText } = render(
      <PaymentCardView
        nameOnCard='John Smith'
        provider='American Express'
        last4Digits='1234'
        className='dummy-class-1 dummy-class-2'
      />,
    )

    expect(getByText('John Smith')).toBeInTheDocument()
  })

  it('should render the last 4 digits', () => {
    const { getByText } = render(
      <PaymentCardView
        nameOnCard='John Smith'
        provider='American Express'
        last4Digits='1234'
        className='dummy-class-1 dummy-class-2'
      />,
    )

    expect(getByText('1234')).toBeInTheDocument()
  })

  it('should style the card based on the provider (amex, visa or mastercard)', () => {
    const { container } = render(
      <PaymentCardView
        nameOnCard='John Smith'
        provider='American Express'
        last4Digits='1234'
        className='dummy-class-1 dummy-class-2'
      />,
    )

    expect(container.firstChild).toHaveClass('payment-card--provider-american-express')
  })

  it('should accept and preserve a className prop', () => {
    const { container } = render(
      <PaymentCardView
        nameOnCard='John Smith'
        provider='American Express'
        last4Digits='1234'
        className='dummy-class-1 dummy-class-2'
      />,
    )

    expect(container.firstChild).toHaveClass('dummy-class-1')
    expect(container.firstChild).toHaveClass('dummy-class-2')
  })
})
