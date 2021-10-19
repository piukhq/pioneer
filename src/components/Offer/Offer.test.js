import React from 'react'
import { render } from '@testing-library/react'

import Offer from './Offer'

const mockOffer = {
  cta_url: 'mock_cta_url',
  description: 'mock_description',
  encoding: 'mock_encoding',
  id: 'mock_id',
  type: 'mock_type',
  url: 'mock_url',
}

const mockIndex = 0

const offerComponent = (
  <Offer
    offer={mockOffer}
    index={mockIndex}
  />

)

describe('Test Offer', () => {
  it('should render image with correct alt text', () => {
    const { getByRole, getByAltText } = render(offerComponent)
    expect(getByRole('img')).toBeInTheDocument()
    expect(getByAltText('Offer 1')).toBeInTheDocument()
  })

  it('should render a link tag wih correct address', () => {
    const { getByRole } = render(offerComponent)
    expect(getByRole('link')).toBeInTheDocument()
    expect(getByRole('link')).toHaveAttribute('href', 'mock_cta_url')
  })
})
