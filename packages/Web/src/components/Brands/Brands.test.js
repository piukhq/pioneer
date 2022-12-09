import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'

import Brands from 'components/Brands'

const mockStore = configureMockStore([])
const store = mockStore()

jest.mock('./components/Brand', () => () => <div data-testid="brand" />)
jest.mock('components/AccountMenu', () => () => <div data-testid="account-menu" />)

const mockPlans = [null, null]

const getBrandsComponent = (
  <Provider store={store}>
    <Brands plans={mockPlans} />
  </Provider>
)

describe('Test Brands', () => {
  it('should render the heading', () => {
    render(getBrandsComponent)

    expect(screen.getByRole('heading')).toHaveTextContent('Add Loyalty Card')
  })

  it('should render the description', () => {
    render(getBrandsComponent)

    expect(screen.getByText('Add your current loyalty cards to store your barcode in Bink')).toBeInTheDocument()
  })

  it('should render the account menu', () => {
    render(getBrandsComponent)

    expect(screen.getByTestId('account-menu')).toBeInTheDocument()
  })

  it('should render the brand component for each plan', () => {
    render(getBrandsComponent)

    expect(screen.getAllByTestId('brand').length).toBe(2)
  })
})
