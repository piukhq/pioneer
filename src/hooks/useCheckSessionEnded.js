
import { useHistory } from 'react-router-dom'
import { getAuthToken } from 'utils/storage'

const useCheckSessionEnded = () => {
  const history = useHistory()
  if (!getAuthToken()) {
    history.replace('/')
  }
}

export default useCheckSessionEnded
