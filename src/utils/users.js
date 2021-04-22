import jwtDecode from 'jwt-decode'

export const getUserIdFromApiKey = token => jwtDecode(token).user_id
