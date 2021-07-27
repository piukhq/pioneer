import axios from 'axios'
import { getAuthTokenString } from '../utils/storage' // TODO: Temporary measure for Web-464

export const getService = () => (
  axios.get(
    `${Config.apiUrl}/ubiquity/service`,
    {
      headers: {
        Authorization: getAuthTokenString(),
        'Content-Type': 'application/json;v=1.3',
      },
    },
  )
)

// Used to submit the user's consent to the Bink T&Cs
export const postService = (email) => (
  axios.post(
    `${Config.apiUrl}/ubiquity/service`,
    {
      consent: {
        email,
        latitude: 0,
        longitude: 0,
        timestamp: Math.floor(new Date().getTime() / 1000),
      },
    },
    {
      headers: {
        Authorization: getAuthTokenString(),
        'Content-Type': 'application/json;v=1.3',
      },
    },
  )
)
