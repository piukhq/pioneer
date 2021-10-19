import React from 'react'
import { render } from '@testing-library/react'

import Offers from './Offers'

const mockPlanOffers = [
  {
    id: 'mock_id_1',
  },
  {
    id: 'mock_id_2',
  },
]
const offersComponent = (
  <Offers
    planOffers={mockPlanOffers}
  />
)

describe('Test Offers', () => {
  it('should render heading', () => {
    const { getByText } = render(offersComponent)
    expect(getByText('Offers')).toBeInTheDocument()
  })

  it('should render offers container', () => {
    const { getByTestId } = render(offersComponent)
    expect(getByTestId('offers-container')).toBeInTheDocument()
  })
})
