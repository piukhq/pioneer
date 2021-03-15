import axios from 'axios'
import Config from 'Config'

export const login = (email, password) => (
  axios.post(
    `${Config.apiUrl}/users/login`,
    {
      email,
      password,
      client_id: Config.clientId,
      bundle_id: Config.bundleId,
    },
  )
)
