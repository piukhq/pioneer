import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import Voucher from './Voucher'
import styles from './Voucher.module.scss'

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
    jest.resetModules()
    shallowRender = createShallowRenderer()
  })

  describe('Test rendered output', () => {
    it('should render parent div container', () => {
      expect(shallowRender.type).toBe('div')
      expect(shallowRender.props.className).toBe(styles.root)
    })

    it('should render children div containers', () => {
      const [title, description, headline, progress] = shallowRender.props.children

      expect(title.type).toBe('div')
      expect(title.props.className).toBe(styles.root__title)

      expect(description.type).toBe('div')
      expect(description.props.className).toBe(styles.root__description)

      expect(headline.type).toBe('div')
      expect(headline.props.className).toBe(styles.root__headline)

      expect(progress.type).toBe('div')
      expect(progress.props.className).toBe(styles.root__progress)
    })

    it('should render the correct number of progress identifiers', () => {
      const mockTargetValue = 5
      const mockVoucher = {
        earn: {
          target_value: mockTargetValue,
        },
      }
      shallowRender = createShallowRenderer({ voucher: mockVoucher })

      const [, , , progress] = shallowRender.props.children
      expect(progress.props.children.length).toEqual(mockTargetValue)
    })
  })
})
