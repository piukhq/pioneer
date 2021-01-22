import axios from 'axios'

export const getMembershipPlans = () => (
  axios.get(
    'https://api.dev.gb.bink.com/ubiquity/membership_plans',
    {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    },
  )
)
