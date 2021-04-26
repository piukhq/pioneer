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

  describe('Test rendered text', () => {
    const prefix = 'mock_prefix'
    const value = 1
    const suffix = 'mock_suffix'
    const target_value = 3
    const mockVoucher = {
      burn: {
        prefix,
        value,
        suffix,
      },
      earn: {
        prefix,
        value,
        suffix,
        target_value,
      },
    }
    beforeEach(() => {
      shallowRender = createShallowRenderer({ voucher: mockVoucher })
    })
    it('should render correct title values', () => {
      const mockTitle = [prefix, value, ' ', suffix]
      const [title] = shallowRender.props.children
      expect(title.props.children).toEqual(mockTitle)
    })

    it('should render correct description values', () => {
      const mockDescription = ['for collecting ', prefix, target_value, ' ', suffix]
      const [, description] = shallowRender.props.children
      expect(description.props.children).toEqual(mockDescription)
    })

    describe('Test headline render outcomes', () => {
      let mockVoucherState

      it("should render correct headline when state equals 'issued'", () => {
        mockVoucherState = 'issued'
        shallowRender = createShallowRenderer({ voucher: { ...mockVoucher, state: mockVoucherState } })
        const [, , headline] = shallowRender.props.children

        expect(headline.props.children).toEqual('Earned')
      })

      it("should render correct headline when state equals 'inprogress'", () => {
        mockVoucherState = 'inprogress'
        const mockStampsToGo = target_value - value
        shallowRender = createShallowRenderer({ voucher: { ...mockVoucher, state: mockVoucherState } })
        const [, , headline] = shallowRender.props.children
        const expectResult = `${mockStampsToGo} stamps to go`
        expect(headline.props.children).toEqual(expectResult)
      })

      it("should render correct headline when state does not equal 'inprogress' or 'issued'", () => {
        mockVoucherState = 'mock_state'
        shallowRender = createShallowRenderer({ voucher: { ...mockVoucher, state: mockVoucherState } })
        const [, , headline] = shallowRender.props.children

        expect(headline.props.children).toEqual(mockVoucherState)
      })
    })

    describe('Test footer', () => {
      let mockVoucherState

      it("should render correct footer if state equals 'inprogress' or 'earned'", () => {
        mockVoucherState = 'inprogress'
        shallowRender = createShallowRenderer({ voucher: { ...mockVoucher, state: mockVoucherState } })
        const [, , , , inProgressFooter] = shallowRender.props.children
        expect(inProgressFooter.type).toBe('div')
        expect(inProgressFooter.props.className).toBe(styles.root__footer)
        const [, footerSpan1] = inProgressFooter.props.children
        expect(footerSpan1.type).toBe('span')
        expect(footerSpan1.props.className).toBe(styles['root__progress-value'])

        mockVoucherState = 'earned'
        shallowRender = createShallowRenderer({ voucher: { ...mockVoucher, state: mockVoucherState } })
        const [, , , , earnedFooter] = shallowRender.props.children
        const [, footerSpan2] = earnedFooter.props.children
        expect(footerSpan2.type).toBe('span')
        expect(footerSpan2.props.className).toBe(styles['root__progress-value'])
      })

      it("should not render footer if state does not equal 'inprogress' or 'earned'", () => {
        mockVoucherState = 'mock_state'
        shallowRender = createShallowRenderer({ voucher: { ...mockVoucher, state: mockVoucherState } })
        const [, , , , inProgressFooter] = shallowRender.props.children
        expect(inProgressFooter).toBeFalsy()
      })

      it("should render redeemed footer if state equals 'redeemed'", () => {
        mockVoucherState = 'redeemed'

        shallowRender = createShallowRenderer({ voucher: { ...mockVoucher, state: mockVoucherState, date_redeemed: true } })
        const [, , , , , reedeemedFooter] = shallowRender.props.children
        expect(reedeemedFooter.type).toBe('div')
        expect(reedeemedFooter.props.className).toBe(styles.root__footer)
      })

      it("should not render redeemed footer if state does not equal 'redeemed' or 'date_redeemed' is false", () => {
        mockVoucherState = 'mock_state'
        let mockDateRedeemed = true
        shallowRender = createShallowRenderer({ voucher: { ...mockVoucher, state: mockVoucherState, date_redeemed: mockDateRedeemed } })
        const [, , , , , reedeemedFooter1] = shallowRender.props.children
        expect(reedeemedFooter1).toBeFalsy()

        mockVoucherState = 'redeemed'
        mockDateRedeemed = false
        shallowRender = createShallowRenderer({ voucher: { ...mockVoucher, state: mockVoucherState, date_redeemed: mockDateRedeemed } })
        const [, , , , , reedeemedFooter2] = shallowRender.props.children
        expect(reedeemedFooter2).toBeFalsy()
      })

      it("should render correct footer if state equals 'expired' or 'cancelled' and 'expiry_date' exists", () => {
        mockVoucherState = 'expired'
        const mockExpiryDate = 'mock_expiry_date'
        shallowRender = createShallowRenderer({ voucher: { ...mockVoucher, state: mockVoucherState, expiry_date: mockExpiryDate } })
        const [, , , , , , expiredFooter] = shallowRender.props.children
        expect(expiredFooter.type).toBe('div')
        expect(expiredFooter.props.className).toBe(styles.root__footer)

        mockVoucherState = 'cancelled'
        shallowRender = createShallowRenderer({ voucher: { ...mockVoucher, state: mockVoucherState, expiry_date: mockExpiryDate } })
        const [, , , , , , cancelledFooter] = shallowRender.props.children
        expect(cancelledFooter.type).toBe('div')
        expect(cancelledFooter.props.className).toBe(styles.root__footer)
      })

      it("should not render redeemed footer if state does not equal 'expired' or 'cancelled' or 'expiry_date' does not exist", () => {
        mockVoucherState = 'mock_state'
        const mockExpiryDate = 'mock_expiry_date'
        shallowRender = createShallowRenderer({ voucher: { ...mockVoucher, state: mockVoucherState, expiry_date: mockExpiryDate } })
        const [, , , , , , mockFooter1] = shallowRender.props.children
        expect(mockFooter1).toBeFalsy()

        mockVoucherState = 'expired'
        shallowRender = createShallowRenderer({ voucher: { ...mockVoucher, state: mockVoucherState } })
        const [, , , , , , mockFooter2] = shallowRender.props.children
        expect(mockFooter2).toBeFalsy()
      })
    })
  })
})
