import React from 'react'
import { render } from '@testing-library/react'
import Button from './Button'

const buttonComponent = (
  <Button />
)

describe('Test Button component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should render button element', () => {
    const { queryByTestId } = render(buttonComponent)
    expect(queryByTestId('button')).toBeInTheDocument()
  })

  describe('Test button error', () => {
    it('should render button error', () => {
      const buttonComponent = (
        <Button error />
      )
      const { queryByTestId } = render(buttonComponent)
      expect(queryByTestId('error')).toBeInTheDocument()
    })

    it('should not render button error', () => {
      const { queryByTestId } = render(buttonComponent)
      expect(queryByTestId('error')).not.toBeInTheDocument()
    })
  })
})
