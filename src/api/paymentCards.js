import axios from 'axios'

const authToken = Config.disabledLocalStorage ? `Token ${sessionStorage.getItem('token')}` : `Token ${localStorage.getItem('token')}` // TODO: Temporary measure for Web-464

export const getPaymentCards = () => (
  axios.get(
    `${Config.apiUrl}/ubiquity/payment_cards`,
    {
      headers: {
        Authorization: authToken,
        'Content-Type': 'application/json;v=1.3',
      },
    },
  )
)

export const deletePaymentCard = (id) => (
  axios.delete(
    `${Config.apiUrl}/ubiquity/payment_card/${id}`,
    {
      headers: {
        Authorization: authToken,
        'Content-Type': 'application/json;v=1.3',
      },
    },
  )
)

export const addPaymentCard = (
  token,
  last_four_digits,
  first_six_digits,
  month,
  year,
  country,
  currency_code,
  name_on_card,
  provider,
  type,
  fingerprint,
) => {
  return axios.post(
    `${Config.apiUrl}/ubiquity/payment_cards`,
    {
      card: {
        token,
        last_four_digits,
        first_six_digits,
        month,
        year,
        country: country || undefined, // Spreedly returns null and the Bink API really doesn't like null
        currency_code,
        name_on_card,
        provider,
        type,
        fingerprint,
      },
      account: {
        status: 1,
        verification_in_progress: false,
        consents: [
          {
            type: 0,
            latitude: 51.405372,
            longitude: -0.678357,
            timestamp: Math.floor((new Date()).getTime() / 1000),
          },
        ],
      },
    },
    {
      headers: {
        Authorization: authToken,
        'Content-Type': 'application/json;v=1.3',
      },
    },
  )
}
