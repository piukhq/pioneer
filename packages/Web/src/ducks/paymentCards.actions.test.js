import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from 'axios'

import { actions, types } from './paymentCards'

describe('action creators', () => {
  it('getPaymentCardsRequest should create correct action', () => {
    const expectedAction = { type: types.PAYMENT_CARDS_REQUEST }
    expect(actions.getPaymentCardsRequest()).toEqual(expectedAction)
  })

  it('getPaymentCardsFailure should create correct action', () => {
    const expectedAction = { type: types.PAYMENT_CARDS_FAILURE }
    expect(actions.getPaymentCardsFailure()).toEqual(expectedAction)
  })

  it('getPaymentCardsSuccess should create correct action', () => {
    const payload = { dummyKey: 'dummy value' }
    const expectedAction = {
      type: types.PAYMENT_CARDS_SUCCESS,
      payload,
    }
    expect(actions.getPaymentCardsSuccess(payload)).toEqual(expectedAction)
  })
})

jest.mock('axios')
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  describe('getPaymentCards', () => {
    it('should fetch payment cards', async () => {
      const cards = ['dummy 1', 'dummy 2']
      const response = { data: { cards } }
      axios.get.mockResolvedValue(response)

      const expectedActions = [
        { type: types.PAYMENT_CARDS_REQUEST },
        { type: types.PAYMENT_CARDS_SUCCESS, payload: { cards } },
      ]
      const store = mockStore({ users: { authentication: { api_key: 'dummy key value' } } })

      await store.dispatch(actions.getPaymentCards())

      expect(store.getActions()).toEqual(expectedActions)
    })

    it('should handle API call failure', async () => {
      axios.get.mockImplementation(() => {
        throw new Error()
      })

      const expectedActions = [
        { type: types.PAYMENT_CARDS_REQUEST },
        { type: types.PAYMENT_CARDS_FAILURE },
      ]
      const store = mockStore({ users: { authentication: { api_key: 'dummy key value' } } })

      await store.dispatch(actions.getPaymentCards())

      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
