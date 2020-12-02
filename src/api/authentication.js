import axios from 'axios'

export const login = (email, password) => (
  axios.post(
    'https://api.dev.gb.bink.com/users/login',
    {
      email,
      password,
      client_id: 'MKd3FfDGBi1CIUQwtahmPap64lneCa2R6GvVWKg6dNg4w9Jnpd',
      bundle_id: 'com.bink.wallet',
    },
  )
)
