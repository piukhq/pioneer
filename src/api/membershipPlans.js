import axios from 'axios'

const authToken = Config.disabledLocalStorage ? `Token ${sessionStorage.getItem('token')}` : `Token ${localStorage.getItem('token')}` // TODO: Temporary measure for Web-464

export const getMembershipPlans = () => (
  axios.get(
    `${Config.apiUrl}/ubiquity/membership_plans`,
    {
      headers: {
        Authorization: authToken,
        Accept: 'application/json;v=1.3',
      },
    },
  )
)
