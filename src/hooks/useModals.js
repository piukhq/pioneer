import { useDispatch, useSelector } from 'react-redux'
import { actions as modalActions, selectors as modalSelectors } from 'ducks/modals'

export const useModals = () => {
  const dispatch = useDispatch()

  const dispatchModal = (modalType) => dispatch(modalActions.requestModal(modalType))
  const modalToRender = useSelector(state => modalSelectors.modalToRender(state))

  return {
    modalToRender,
    dispatchModal,
  }
}
