import axios from 'axios'

const authToken = Config.disabledLocalStorage ? `Token ${sessionStorage.getItem('token')}` : `Token ${localStorage.getItem('token')}` // TODO: Temporary measure for Web-464

export const getService = () => (
  axios.get(
    `${Config.apiUrl}/ubiquity/service`,
    {
      headers: {
        Authorization: authToken,
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
        Authorization: authToken,
        'Content-Type': 'application/json;v=1.3',
      },
    },
  )
)
