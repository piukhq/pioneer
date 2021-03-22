import reducer, { types } from './paymentCards'

it('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual({
    loading: false,
    error: false,
    cards: null,
  })
})

it('should handle PAYMENT_CARDS_REQUEST', () => {
  expect(
    reducer({
      loading: false,
      error: true,
      cards: ['dummy value'],
    }, {
      type: types.PAYMENT_CARDS_REQUEST,
    }),
  ).toEqual({
    loading: true,
    error: false,
    cards: ['dummy value'],
  })
})

it('should handle PAYMENT_CARDS_FAILURE', () => {
  expect(
    reducer({
      loading: true,
      error: false,
      cards: ['dummy value'],
    }, {
      type: types.PAYMENT_CARDS_FAILURE,
    }),
  ).toEqual({
    loading: false,
    error: true,
    cards: null,
  })
})

it('should handle PAYMENT_CARDS_SUCCESS', () => {
  expect(
    reducer({
      loading: true,
      error: true,
      cards: ['dummy value'],
    }, {
      type: types.PAYMENT_CARDS_SUCCESS,
      payload: ['dummy value 2', 'dummy value 3'],
    }),
  ).toEqual({
    loading: false,
    error: false,
    cards: ['dummy value 2', 'dummy value 3'],
  })
})
