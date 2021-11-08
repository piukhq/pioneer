
import { useHistory } from 'react-router-dom'
import { getAuthToken } from 'utils/storage'

export const useCheckSessionEnded = () => {
  const history = useHistory()
  if (!getAuthToken()) {
    history.replace('/')
  }
}
