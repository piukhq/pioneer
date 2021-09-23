import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { useModals } from 'hooks/useModals'
import configureMockStore from 'redux-mock-store'
import Voucher from './Voucher'

jest.mock('components/Modals/VoucherModal', () => () => null)
jest.mock('hooks/useModals', () => ({
  useModals: jest.fn(),
}))
const useModalsDefaultValues = {
  isVoucherModalRequested: false,
  requestVoucherModal: false,
}

const mockStore = configureMockStore([])
const store = mockStore()
const voucherComponent = (
  <Provider store={store}>
    <Voucher
      voucher={{}}
    />,
  </Provider>
)

describe('Test Voucher', () => {
  it('should render voucher container', () => {
    useModals.mockImplementation(() => ({ ...useModalsDefaultValues }))
    const { queryByTestId } = render(voucherComponent)
    expect(queryByTestId('voucher-container')).toBeInTheDocument()
  })

  describe('Test Voucher Modal render', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('should render voucher modal', () => {
      useModals.mockImplementation(() => ({
        isVoucherModalRequested: true,
        requestVoucherModal: false,
      }))
      const { queryByTestId } = render(voucherComponent)
      expect(queryByTestId('voucher-modal')).toBeInTheDocument()
    })

    it('should not render voucher modal', () => {
      useModals.mockImplementation(() => ({ ...useModalsDefaultValues }))
      const { queryByTestId } = render(voucherComponent)
      expect(queryByTestId('voucher-modal')).not.toBeInTheDocument()
    })
  })
})
