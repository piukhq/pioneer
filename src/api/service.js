import axios from 'axios'
import Config from 'Config'

export const getService = () => (
  axios.get(
    `${Config.apiUrl}/ubiquity/service`,
    {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json;v=1.3',
      },
    },
  )
)
