import { useDispatch, useSelector } from 'react-redux'
import { actions as serviceActions } from 'ducks/service'

export const useTermsAndConditionsCheck = () => {
  const dispatch = useDispatch()
  const acceptTerms = () => {
    dispatch(serviceActions.postService())
  }
  const { post: { error: postError } } = useSelector(state => state.service)

  return {
    acceptTerms,
    postError,
  }
}
