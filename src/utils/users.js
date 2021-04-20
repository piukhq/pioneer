import jwtDecode from 'jwt-decode'

export const getUserIdFromApiKey = (token) => {
  return jwtDecode(token).user_id
}
