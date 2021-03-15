import axios from 'axios'
import Config from 'Config'

export const getMembershipPlans = () => (
  axios.get(
    `${Config.apiUrl}/ubiquity/membership_plans`,
    {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json;v=1.3',
      },
    },
  )
)
