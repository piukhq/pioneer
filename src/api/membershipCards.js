import axios from 'axios'

export const getMembershipCards = (authToken) => (
  axios.get(
    'https://api.dev.gb.bink.com/ubiquity/membership_cards',
    {
      headers: {
        Authorization: `Token ${authToken}`,
      },
    },
  )
)
