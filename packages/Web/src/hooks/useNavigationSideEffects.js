import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { actions as modalActions } from 'ducks/modals'
import { MODAL_ACTION_TYPES as modalEnum } from 'utils/enums'

// This must be a component rather than a hook in order to give context to 'location',
// but as it is essentialy a hook, it is defined in the /hooks folder
export const NavigationSideEffects = () => {
  const { pathname } = useLocation()
  const dispatch = useDispatch()

  // Close all modals and scroll to the top of the page on all routing changes
  useEffect(() => {
    dispatch(modalActions.requestModal(modalEnum.NO_MODAL))
    window.scrollTo(0, 0)
  }, [pathname, dispatch])

  return (null)
}
