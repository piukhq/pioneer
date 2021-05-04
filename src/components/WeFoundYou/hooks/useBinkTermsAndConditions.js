import { useDispatch, useSelector } from 'react-redux'
import { actions as serviceActions } from 'ducks/service'

const useBinkTermsAndConditions = () => {
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

export default useBinkTermsAndConditions
