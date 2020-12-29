import axios from 'axios'

export const getMembershipCards = () => (
  axios.get(
    'https://api.dev.gb.bink.com/ubiquity/membership_cards',
    {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    },
  )
)
