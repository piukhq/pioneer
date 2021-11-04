import reducer, { types } from './paymentCards'

it('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual({
    loading: false,
    error: false,
    cards: {},
    add: {
      loading: false,
      error: false,
      success: false,
      card: null,
    },
    delete: {
      loading: false,
      error: false,
      success: false,
    },
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
    cards: {},
  })
})

it('should handle PAYMENT_CARDS_SUCCESS', () => {
  expect(
    reducer({
      loading: true,
      error: true,
      cards: { 'dummy id 1': { id: 'dummy id 1' } },
    }, {
      type: types.PAYMENT_CARDS_SUCCESS,
      payload: [{ id: 'dummy id 1' }, { id: 'dummy id 2' }],
    }),
  ).toEqual({
    loading: false,
    error: false,
    cards: { 'dummy id 1': { id: 'dummy id 1' }, 'dummy id 2': { id: 'dummy id 2' } },
  })
})
