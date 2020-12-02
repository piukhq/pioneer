import axios from 'axios'

export const getPaymentCards = (authToken) => (
  axios.get(
    'https://api.dev.gb.bink.com/ubiquity/payment_cards',
    {
      headers: {
        Authorization: `Token ${authToken}`,
      },
    },
  )
)
