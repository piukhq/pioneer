import { useDispatch } from 'react-redux'
import { actions as serviceActions } from 'ducks/service'

const useAcceptTerms = () => {
  const dispatch = useDispatch()
  const acceptTerms = () => {
    dispatch(serviceActions.postService())
  }
  return {
    acceptTerms,
  }
}

export default useAcceptTerms
