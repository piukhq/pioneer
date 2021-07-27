import axios from 'axios'
import { getAuthTokenString } from 'utils/storage' // TODO: Temporary measure for Web-464

export const getMembershipPlans = () => (
  axios.get(
    `${Config.apiUrl}/ubiquity/membership_plans`,
    {
      headers: {
        Authorization: getAuthTokenString(),
        Accept: 'application/json;v=1.3',
      },
    },
  )
)
