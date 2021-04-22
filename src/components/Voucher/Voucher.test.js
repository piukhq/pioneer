import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import Voucher from './Voucher'

describe("Test 'Voucher' component", () => {
  const defaultProps = {
    voucher: {},
  }
  const createShallowRenderer = (overrideProps = {}) => {
    const props = { ...defaultProps, ...overrideProps }
    const shallowRenderer = new ShallowRenderer()
    shallowRenderer.render(<Voucher {...props} />)

    return shallowRenderer.getRenderOutput()
  }

  let shallowRender
  beforeEach(() => {
    shallowRender = createShallowRenderer()
  })

  describe('Test output', () => {
    it('should render a div', () => {
      expect(shallowRender.type).toBe('div')
    })
  })
})
