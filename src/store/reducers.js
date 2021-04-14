import { combineReducers } from 'redux'
import users from 'ducks/users'
import paymentCards from 'ducks/paymentCards'
import membershipCards from 'ducks/membershipCards'
import membershipPlans from 'ducks/membershipPlans'
import service from 'ducks/service'

const appReducer = combineReducers({
  users,
  paymentCards,
  membershipCards,
  membershipPlans,
  service,
})

const rootReducer = (state, action) => {
  if (action.type === 'RESET_ALL') {
    localStorage.removeItem('token')
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer
