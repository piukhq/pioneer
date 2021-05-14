import axios from 'axios'

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

export const requestMagicLink = email => {
  if (!Config.magicLinkSlug) {
    console.error('Not implemented for current bundle. Slug not defined in config')
    throw new Error('Not implemented for current bundle. Slug not defined in config')
  }

  return axios.post(
    `${Config.apiUrl}/users/magic_links`,
    {
      email: email,
      slug: Config.magicLinkSlug,
      locale: 'en_GB',
      bundle_id: Config.bundleId,
    },
  )
}

export const authenticateViaMagicLinkToken = token => (
  axios.post(
    `${Config.apiUrl}/users/magic_links/access_tokens`,
    {
      token,
    },
  )
)
