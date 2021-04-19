import jwtDecode from 'jwt-decode'

export const getUserIdFromApiKey = (token) => {
  console.log(jwtDecode(token))
  return token.user_id
}
