import axios from 'axios'
import Config from 'Config'

export const login = (email, password) => (
  axios.post(
    'https://api.dev.gb.bink.com/users/login',
    {
      email,
      password,
      client_id: Config.clientId,
      bundle_id: Config.bundleId,
    },
  )
)
