import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { actions as serviceActions } from 'ducks/service'

const useLoadService = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(serviceActions.getService())
  }, [dispatch])
}

export default useLoadService
