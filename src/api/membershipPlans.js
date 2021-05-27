import axios from 'axios'

export const getMembershipPlans = () => (
  axios.get(
    `${Config.apiUrl}/ubiquity/membership_plans`,
    {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        Accept: 'application/json;v=1.3',
      },
    },
  )
)
